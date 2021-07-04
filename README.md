TIME：2021/02/07

Author：DZQ

DESC：Slide Picture | TypeScript小练习

Use: TypeScript Webpack SaSS


![slide](./assets/slide.gif)


Usage:

在HTML中添加一个DIV，id为slides

```html
<div id="slides"></div>
```

在JS代码中引入Slide，并创建其实例

```js
import slide from "./slide.ts"
let params = {
    imgs: [
        "./assets/1.jpg",
        "./assets/2.jpg",
        "./assets/3.jpg",
        "./assets/4.jpg",
        "./assets/5.jpg",
    ],
    width: 512,
    height: 320,
    ifAutoPlay: true,
    autoPlayIntervalTime: 2000
}
let s = new slide(params);
```

---

Support: 

1. 支持上下轮播图切换
2. 支持任意点轮播图切换
3. 支持自动轮播效果


Feature:
1. HTML零配置,TS语法自动根据传入图片列表生成HTML结构
2. 鼠标悬浮于轮播图，自动轮播关闭；鼠标离开轮播图，自动轮播打开
3. 鼠标点击轮播下标，跳转到对应图片
4. 鼠标点击左右箭头，跳转到上一页或者下一页
5. 采用class封装slide组件，可以直接new使用

Todo:
1. 给每一个图片增加超链接，支持跳转，当前图片采用数组，需要改成列表


Build 

```bash
npm i -D 
npm run build
```

Start

```bash
npm start
```


FixBUGS: 

- [x] 解决Flex布局下，图片压缩的问题：添加flex-shrink属性
