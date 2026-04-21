## Divider 分割线

用于区隔页面内容、划分功能模块，提升页面布局层次感和可读性，支持水平 / 垂直两种方向，可自定义文案与样式。

### 基础用法

最简洁的水平分割线，用于分割不同章节的文本、模块，默认占满父容器宽度。

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

支持在分割线上添加自定义文案、图标，通过 content-position 控制文案位置，适配不同布局需求。
- `content-position`：文案位置，可选 `left`（左对齐）、`right`（右对齐），默认居中
- 可直接插入文本、图标等内容，丰富视觉效果


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

设置 `direction="vertical"` 启用垂直分割线，用于水平方向的内容区隔（如导航栏、标签组）。

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
