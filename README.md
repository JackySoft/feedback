## feedback

一款问题反馈插件，基于 Svelte + Typescript 开发，支持个性化配置，与框架无关，不管你是Vue还是React都可以使用。

## 安装

```
yarn add ifeedback -S

# or

npm i ifeedback -S
```

## 用法

1. 在 Vue 或 React 入口导入模块和样式

```js
import feedback from 'ifeedback'
import 'ifeedback/dist/style.css'
```

2. 调用 `init` 进行初始化

```js
feedback.init({
  // 定制悬浮图片样式
  style?: string;
  // 悬浮图片
  icon?: {
    url: string
    width: number;
    height: number
  }
  //上传配置
  uploadOption: {
    api: 'http://www.xxx.com/api/upload',
    fileSize: 5,
    data: {
      a: '1001'
    }
  },
  // 提交配置
  submitOption:{
    api: 'http://www.xxx.com/api/submit',
    data:{
      name: 'jack'
    }
  },
  // 初始化钩子
  onMount?: () => void
  // 点击icon事件
  onClickIcon?: () => void
  // 点击关闭按钮
  onClickClose: () => void,
  // 点击提交回调
  onClickSubmit?: () => void
})
```
> 注意：style只能为字符串格式，例如：style:"right:15px;bottom:60px"
> 主题功能，暂时不支持

## destroyed 销毁

对于部分微服务场景，可能会重复生成容器，我们提供了销毁的 API 函数，供调用。

```js
feedback.destroyed()
```

