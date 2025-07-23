## Divider 分割线

区隔内容的分割线。

### 基础用法

对不同章节的文本段落进行分割。

:::demo
```html
<template>
  <div>
    <el-divider></el-divider>
  </div>
</template>
```
:::

### 设置文案

可以在分割线上自定义文案内容。


:::demo
```html
<template>
  <div>
    <br><br>
    <el-divider content-position="left">少年包青天</el-divider>
    <br><br>
    <el-divider><i class="el-icon-mobile-phone"></i></el-divider>
    <br><br>
    <el-divider content-position="right">阿里云</el-divider>
  </div>
</template>
```
:::

### 垂直分割

:::demo
```html
<template>
  <div>
    <span>雨纷纷</span>
    <el-divider direction="vertical"></el-divider>
    <span>旧故里</span>
    <el-divider direction="vertical"></el-divider>
    <span>草木深</span>
  </div>
</template>
```
:::

### Divider Attributes
| 参数          | 说明            | 类型            | 可选值                 | 默认值   |
|-------------  |---------------- |---------------- |---------------------- |-------- |
| direction      | 设置分割线方向  | string  |            horizontal / vertical          |    horizontal     |
| content-position      | 设置分割线文案的位置 | string  |  left / right / center  |  center |
| type      | 分割线样式 | string  |  dashed/solid/dotted  |  dashed |
| color      | 分割线颜色 | string  |  #EDEFF3  |  #EDEFF3 |
