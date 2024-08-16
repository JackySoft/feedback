import feedback from '../lib/main.ts'
/**
 * 本地运行入口
 */
const option = {
  uploadOption: {
    api: 'http://www.bau.com/api/upload',
    fileSize: 5,
    data: {
      a: '1001'
    }
  },
  submitOption:{
    api: 'http://www.bau.com/api/submit',
    data:{
      name: 'jack'
    }
  },
  onMount: () => {
    console.log('挂载成功')
  },
  onClickIcon: () => {
    console.log('点击了图标')
  },
  onClickClose: () => {
    console.log('点击了关闭')
  },
  onClickSubmit: () => {
    console.log('点击了提交')
  },
}
feedback.init(option)
