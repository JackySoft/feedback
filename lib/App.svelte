<script lang="ts">
  import { onMount } from 'svelte'
  import { get,post, upload } from './utils/fetch'
  export let style: string
  export let icon: {
    url: string
    width: number
    height: number
  }
  export let uploadOption:{
    api: string;
    fileSize: number;
    data: any;
  };
  export let submitOption:{
    api: string;
    method: 'get'|'post';
    data?: {[key:string]:string|number|boolean};
  };
  export let onMountFn;
  export let onClickIcon;
  export let onClickClose;
  export let onClickSubmit;
  let visible = false
  let showSuccess = false
  let content = ''
  let inputErrorMsg = ''
  let file: File
  let uploadErrorMsg = ''
  let fileList: any[] = []
  const show = () => {
    visible = true
    showSuccess = false
    onClickIcon()
  }
  const close = () => {
    visible = false
    inputErrorMsg = ''
    uploadErrorMsg = ''
    fileList = []
    onClickClose();
  }
  onMount(() => {
    onMountFn()
  })

  // 上传前判断
  const beforeUpload = async (event: any) => {
    console.log(event.target)
    const file = event.target?.files[0]
    const isLt5M = file.size / 1024 / 1024 < uploadOption.fileSize
    if (!isLt5M) {
      uploadErrorMsg = '图片大小超过限制'
      return false
    }
    try {
      handleUpload(file)
    } catch (error) {
      uploadErrorMsg = '服务异常，请稍候重试'
    }
    return false
  }

  // 手动上传图片
  const handleUpload = async (file: File) => {
    const formData = new FormData()
    formData.append('file', file)
    for(let key in (uploadOption.data || {})){
      formData.append(key, uploadOption.data[key])
    }
    try {
      const res = await upload(uploadOption.api, formData)
      if (res.ret === 0) {
        fileList = [...fileList, { uid: '', name: file.name, status: 'done', url: res.data.fileLink }]
      } else {
        uploadErrorMsg = res.msg
      }
    } catch (error: any) {
      uploadErrorMsg = '服务异常，请稍候重试'
    }
  }
  // 反馈提交
  const submit = async () => {
    const data = {
      content,
      files: fileList.map((item) => item.url).join(','),
      ...(submitOption.data || {})
    }
    onClickSubmit();

    try {
      const promise = submitOption.method == 'get' ? get(submitOption.api, data): post(submitOption.api, data);
      const { ret, msg } = await promise;
      if (ret === 0) {
        showSuccess = true
        inputErrorMsg = ''
        setTimeout(() => {
          close()
        }, 3000)
      } else {
        inputErrorMsg = msg
      }
    } catch (error: any) {
      inputErrorMsg = '服务异常，请稍候重试'
    }
  }
</script>

<main>
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div class="feedback-icon" on:click={show} {style}>
    <!-- svelte-ignore a11y-missing-attribute -->
    <img src={icon.url} style="width:{icon.width}px;height:{icon.height}px" />
  </div>
  <div class="feedback-modal" class:fadeIn={visible}>
    <div class="header">
      <div class="title">提交反馈</div>
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <img
        class="icon-close"
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAaxJREFUeF7tmWtuwzAMg9WTrTvZ1pNtu9mgoQGMrE0Vm1QCiwH6q7ItfqYfgi9W/LsU128CIAcUJ6AlUNwA2gS1BLQEihPQEihuAJ0CWgJaAhgCX2b2Y2afmO42e1nG+DYz/w19iCXgCX3cs7iRIbRjufj3IfVmkE2wTcrzYUGgjINwgIumJNfMLq1/FAAmBJp4TxoJgAGBKp4BAAmBLp4FAAEhRTwTwAiENPFsAD0QUsVnANgDIV18FoAIhEPEZwLYgnCY+GwAjyD4ff7a3PhY1+inJQP6IhSpTdYzvrRJF3+EAxaxXj63Mw+p7CL01zFyQA+1gTZr+5faA57t9iVOgVciX/0/YLrtphl7QFRcNA4Kgw1gr6i98cMwmAB6xfS264LBAjAqYrR9GAYDACp5VD+bMNAA0Emj+/sHAwmAlSyr3z8YKADUJJnvDggAbPGLbSnjIAC0lR27pG0hQCpIBAAva/1xNPN1+O3+BnmK1+HwmXvGQIQDzqgrnJMAhFFNGigHTDqxYVlyQBjVpIFywKQTG5YlB4RRTRooB0w6sWFZckAY1aSB5R3wC0zjdEHRE4J5AAAAAElFTkSuQmCC"
        on:click={close}
        alt="关闭"
      />
    </div>
    {#if showSuccess}
      <div style="text-align: center;">
        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABAAQMAAACQp+OdAAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAZQTFRFAAAAHoD/pV5AcwAAAAJ0Uk5TAP9bkSK1AAABF0lEQVR4nGXSsUrEQBAG4H+iYDq1sxBPSeFLyF1A4V7qMFGvFCzueQ43h68hJthYJl0Crus/u2EjXqqvmPk3O7MCoCgSQICDbzSXilmNIVUUJVxCyA/LHkrRErBIcNwS3YloLVgtWBjCHoo2gW0CB/1EfDf7xXcD1YSj3qMRn8fECT6Y0RP8CTxjRL6VcNTVe4DNPv5hWL6K/4vupQxoZgjYzUesVyPSPsCdtoR9Km1WK27NsDSKrGYMwQLGaHHaM0axXjFGsZszRtFcMAb8je5508IRw91n7WHPrw2xMC7RAet19GB/r8d7Ba/8djPe/etMsT+fOLr9qcaBxxVMS4lriouLq/SJVf5n3fEBTE+CRVWuCM/mF6g+nHEWKW8lAAAAAElFTkSuQmCC" alt="成功" />
        <p>提交成功、我们会认真思考和处理您反馈的内容。</p>
      </div>
    {:else}
      <div class="content">
        <div class="form-item">
          <textarea
            class="input"
            rows="5"
            bind:value={content}
            placeholder="请描述业务、制度、流程、产品等问题或建议，我们不断改进~"
          />
          <div class="error-tip">{inputErrorMsg}</div>
        </div>
        <div class="form-item">
          <div class="upload-wraper">
            {#each fileList as item}
              <div class="upload">
                <div class="upload-wrap">
                  <a href={item.url} target="_blank"><img src={item.url} alt="反馈图片" /></a>
                </div>
              </div>
            {/each}
            <div class="upload">
              <div class="upload-wrap">
                <span style="font-size:18px">+</span>
                <span>上传</span>
              </div>
              <input
                type="file"
                class="file"
                accept=".jpg,.jpeg,.png,.gif,.webp,.bmp"
                bind:value={file}
                on:change={beforeUpload}
              />
            </div>
          </div>
          <div class="error-tip">{uploadErrorMsg}</div>
          <div class="tips">非必填，支持格式：.jpg .png .gif .jpeg</div>
        </div>
      </div>
      <div class="footer">
        <button class="feedback-btn cancel" on:click={close}>关闭</button>
        <button class="feedback-btn submit" on:click={submit}>提交</button>
      </div>
    {/if}
  </div>
</main>

<style lang="scss">
  .feedback-icon {
    position: fixed;
    right: 15px;
    bottom: 50px;
    cursor: pointer;
    z-index: 9998;
  }
  .feedback-modal {
    position: fixed;
    right: 15px;
    bottom: 15px;
    width: 350px;
    font-size: 14px;
    transform: translateY(110%);
    box-sizing: border-box;
    transition: all 0.5s;
    z-index: 9999;
    background-color: #fff;
    border: 1px solid #d9d9d9;
    border-radius: 8px;
    box-shadow: 0px 0px 20px 5px #00000024;
    &.fadeIn {
      transform: translateY(0);
      padding: 20px;
    }
    .header {
      line-height: 24px;
      margin-bottom: 8px;
      .title {
        text-align: left;
        font-size: 16px;
        font-weight: 600;
        color:  var(--feed-theme-color,#1e80ff);
      }
      .icon-close {
        position: absolute;
        right: 15px;
        top: 15px;
        width: 20px;
        height: 20px;
        cursor: pointer;
      }
    }
    .content {
      text-align: left;
      margin-top: 20px;
      .form-item {
        margin-bottom: 10px;
        .input {
          width: 100%;
          background-color: #ffffff;
          background-image: none;
          border-width: 1px;
          border-style: solid;
          border-color: #d9d9d9;
          border-radius: 6px;
          min-height: 32px;
          padding: 5px;
          &:focus {
            border-color: var(--feed-theme-color,#1e80ff);
            box-shadow: 0 0 0 2px rgba(255, 122, 5, 0.06);
            border-inline-end-width: 1px;
            outline: 0;
          }
        }
        .upload-wraper {
          display: flex;
          gap: 10px;
          .upload {
            width: 60px;
            height: 60px;
            text-align: center;
            background-color: rgba(0, 0, 0, 0.02);
            border: 1px dashed #d9d9d9;
            border-radius: 8px;
            cursor: pointer;
            overflow: hidden;
            &:hover {
              border-color: var(--feed-theme-hover-color,#1171ee);
            }
          }
          .upload-wrap {
            display: flex;
            flex-direction: column;
            justify-content: center;
            height: 40px;
            font-size: 12px;
            margin-top: 8px;
            img {
              width: 100%;
              height: 100%;
            }
          }
          .file {
            width: 100%;
            height: 100px;
            transform: translate(0px, -73px);
            padding-left: 200px;
            cursor: pointer;
          }
        }
      }
      .tips {
        margin-top: 5px;
      }
    }

    .footer {
      text-align: center;
      margin-top: 30px;
    }
    .feedback-btn {
      border-color: #d9d9d9;
      box-shadow: 0 2px 0 rgba(255, 122, 5, 0.06);
      font-size: 14px;
      height: 32px;
      padding: 4px 15px;
      border-radius: 6px;
      margin-left: 30px;
      color: rgba(0, 0, 0, 0.88);
      border: 1px solid transparent;
      box-shadow: 0 2px 0 rgba(0, 0, 0, 0.02);
      cursor: pointer;
      &.cancel {
        border-color: #d9d9d9;
        &:hover {
          color: var( --feed-theme-hover-color,#1e80ff);
          border-color: var( --feed-theme-hover-color,#1171ee);
        }
      }
      &.submit {
        background-color: var(--feed-theme-color,#1e80ff);
        color: #fff;
        &:hover {
          color: #fff;
          background-color: var( --feed-theme-hover-color,#1171ee);
        }
      }
    }
    .error-tip {
      color: red;
    }
  }
</style>
