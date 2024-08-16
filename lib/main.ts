import App from './App.svelte'

/**
 * 打包入口
 */
export interface FeedBackOption {
  // 是否展示
  visible?: boolean
  // 定制style
  style?: string
  // 悬浮图片
  icon?: {
    url: string
    width: number
    height: number
  }
  // 初始化函数
  onMount?: () => void
  // 点击icon回调
  onClickIcon?: () => void
  // 点击关闭回调
  onClickClose?: () => void
  // 点击提交回调
  onClickSubmit?: () => void
}

// 初始化dom节点
const createDom = () => {
  document.body.querySelectorAll('[data-type=tool-feedback]').forEach((item: Element) => {
    item.parentElement?.removeChild(item)
  })
  const root = document.createElement('div')
  const id = Number(Math.random().toString().slice(3, 3) + Date.now()).toString(36)
  root.setAttribute('id', 'tool-feedback-' + id)
  root.setAttribute('data-type', 'tool-feedback')
  document.body.appendChild(root)
  return root
}
// 验证参数合法性，只做控制台提示，不做强制报错
const checkValid = (option: FeedBackOption) => {
  if (!option) {
    throw Error('缺少 [option] 配置参数')
  }
  if (option.icon?.url && (!option.icon?.width || !option.icon?.height)) {
    console.warn('FeedBack：', '如果您要自定义图片地址，建议传对应的图片宽高.')
  }
}
const feedback = {
  init(option: FeedBackOption) {
    checkValid(option)
    if (typeof option.visible === 'boolean' && option.visible === false) return
    const root = createDom()
    const app = new App({
      target: root,
      props: {
        style: 'right:15px;bottom:60px',
        icon: {
          url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAs5JREFUeF7tmtFxwjAMhu0wSykLlOtbYbLCZNC3Hl0A6Czgnk3MOcZJpBBZusY8co6t/4ukyJa1mvhPT1y/KgCKB0ycQAmBiTtASYKoEFgs3lfmcvl0XqP1itJ7tFLb4/mw6Vrjbo+1xZi91vqr75l4PjCAxXy5MUrdxGf6nc6HVvva7IGAC80HAXhYzJg9NQM9m22Px+/kOkl7Qo80Zn/6/VlDbAQBeJ0vjZ8MSxhiBGZMLF5X1dqCcuFwve6wdvYCCBeUKt6LfoBQw+kCjALQFZOYtzhkbDLmE64eQvDe8RSA15e3ncv4iLgaIrAz28cJ2OYgH/ORXViP7fUAbgBtMX+3y5KrIZCEACeANvHeW2IIYW0CzVdiPaBPfBKC/xMRriIBQMVbvbHbY3OVOAA5xbuKvi9j58wBucWLAsAhXgwALvEiAHCKZwdAKd5+Hdp2k6jtMFUSJBVfl86QYojlK0Ap3r7d+/YdUBBlB0AtXjSAHOLFAsglXiSAnOLFAcgtXhQADvGiAISnyXXVlWx2PLuljTd0Ij6D0MbF2OLFeEDjcLKq1qkzewrxYgDEbphqXDRabYCqre/s4n5M5hs5gDlJKsHG2XzQ5Hx44wPO8CAQ2HNA6mzeincn2La7PLCPBxEvIgQaCdA3UlPtdICLQkWH49g9IP78PYiooUA7uFgI/AB8Oy2IcVcHdLS8sSK7xrMDsMbZMFBV5fr7kJOZfwdgTEHYuUR4ANboMccXANyF0Jhvc8hcxQOKB9SXugCFFsleYIjbjvkMTQgopTgvSUEBtW3E2p7v9QDshFBDqcaNfknK7a6C0hbSbqIS1zVv497w7eJD711jV55DjO3ax0OeJx+T2GlCwxUEwNX20VVUclFDF7C3xhGbLjAAb4/b5LireeZjqI1Uz2GEexvQAKiM55q3AOAiL2Xd4gFS3gSXHcUDuMhLWXfyHvAHZgEYfZwmZ84AAAAASUVORK5CYII=',
          width: 35,
          height: 35
        },
        uploadOption: {
          api: '',
          fileSize: 5,
          data: {

          }
        },
        submitOption:{
          api: '',
          data:{}
        },
        onMountFn: () => {
          option.onMount?.()
        },
        onClickIcon: () => {
          option.onClickIcon?.()
        },
        onClickClose: () => {
          option.onClickClose?.()
        },
        onClickSubmit: () => {
          option.onClickSubmit?.()
        },
        ...option
      }
    })
  },
  destroyed() {
    document.body.querySelectorAll('[data-type=tool-feedback]').forEach((item: Element) => {
      item.parentElement?.removeChild(item)
    })
  }
}
export default feedback
