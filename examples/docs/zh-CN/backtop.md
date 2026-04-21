## Backtop 回到顶部

页面滚动时自动显示，一键快速返回页面顶部，提升长页面浏览体验。

### 基础用法

滚动页面后，右下角会自动显示回到顶部按钮，使用简单，开箱即用。

:::demo

```html
<template>
  Scroll down to see the bottom-right button.
  <el-backtop target=".page-component__scroll .el-scrollbar__wrap"></el-backtop>
</template>
```

:::

### 自定义显示内容

显示区域被固定为 40px \* 40px 的区域, 其中的内容可支持自定义。
- `bottom`：控制按钮距离底部的位置
- `right`：控制按钮距离右侧的位置（默认 40px）
- 可自定义背景、颜色、文字、图标
:::demo

```html
<template>
  Scroll down to see the bottom-right button.
  <el-backtop target=".page-component__scroll .el-scrollbar__wrap" :bottom="100">
    <div
      style="{
        height: 100%;
        width: 100%;
        background-color: #f2f5f6;
        box-shadow: 0 0 6px rgba(0,0,0, .12);
        text-align: center;
        line-height: 40px;
        color: #1989fa;
      }"
    >
      UP
    </div>
  </el-backtop>
</template>
```

:::

### Attributes

| 参数              | 说明                             | 类型            | 可选值 | 默认值 |
| ----------------- | -------------------------------- | --------------- | ------ | ------ |
| target            | 触发滚动的对象                   | string          |        |        |
| visibility-height | 滚动高度达到此参数值才出现       | number |        | 200    |
| right             | 控制其显示位置, 距离页面右边距   | number |        | 40     |
| bottom            | 控制其显示位置, 距离页面底部距离 | number |        | 40     |

### Events

| 事件名 | 说明               | 回调参数 |
| ------ | ------------------ | -------- |
| click  | 点击按钮触发的事件 | 点击事件 |
