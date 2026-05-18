## Avatar 头像

以图标、图片或字符形式展示用户、事物标识，支持圆形 / 方形、多尺寸配置，自带图片加载失败降级处理，适用于个人中心、消息列表、评论区、用户卡片等场景。

### 基本用法

通过 `shape` 设置头像形状（默认圆形 `circle` / 方形 `square`），通过 `size` 设置尺寸，支持预设值 `large`/`medium`/`small` 和自定义像素值。

:::demo
```html
<template>
  <el-row class="demo-avatar demo-basic">
    <el-col :span="12">
      <div class="sub-title">圆形（circle）</div>
      <div class="demo-basic--circle">
        <div class="block"><el-avatar :size="50" :src="circleUrl"></el-avatar></div>
        <div class="block" v-for="size in sizeList" :key="size">
          <el-avatar :size="size" :src="circleUrl"></el-avatar>
        </div>
      </div>
    </el-col>
    <el-col :span="12">
      <div class="sub-title">方形（square）</div>
      <div class="demo-basic--circle">
        <div class="block"><el-avatar shape="square" :size="50" :src="squareUrl"></el-avatar></div>
        <div class="block" v-for="size in sizeList" :key="size">
          <el-avatar shape="square" :size="size" :src="squareUrl"></el-avatar>
        </div>
      </div>
    </el-col>
  </el-row>
</template>
<script>
  export default {
    data () {
      return {
        circleUrl: "https://q6.itc.cn/q_70/images03/20250306/355fba6a5cb049f5b98c2ed9f03cc5e1.jpeg",
        squareUrl: "https://q6.itc.cn/q_70/images03/20250306/355fba6a5cb049f5b98c2ed9f03cc5e1.jpeg",
        sizeList: ["large", "medium", "small", 'mini']
      }
    }
  }
</script>

```
:::

### 展示类型

支持图标、图片、字符三种展示类型，可灵活适配无头像、默认头像、用户昵称等场景

:::demo
```html
<template>
  <div class="demo-type">
    <div>
      <div class="sub-title">图标头像</div>
      <el-avatar icon="el-icon-user-solid"></el-avatar>
    </div>
    <div>
      <div class="sub-title">图片头像</div>
      <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
    </div>
    <div>
      <div class="sub-title">字符头像</div>
      <el-avatar>多</el-avatar>
    </div>
  </div>
</template>
```
:::

### 图片加载失败的 fallback 行为

图片加载失败时会自动降级显示，可通过插槽自定义备用内容，`error` 事件返回 `true` 可触发内置降级逻辑。

:::demo
```html
<template>
  <div class="demo-type">
    <el-avatar :size="60" src="https://empty" @error="errorHandler">
      <img class="load-fail" src="examples/assets/images/image-load-fail.png" />
    </el-avatar>
  </div>
</template>
<script>
  export default {
    methods: {
      errorHandler() {
        return true
      }
    }
  }
</script>

```
:::

### 图片如何适应容器框

当展示类型为图片的时候，使用 `fit` 属性定义图片如何适应容器框，同原生 [object-fit](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit)。

:::demo
```html
<template>
  <div class="demo-fit">
    <div class="block" v-for="fit in fits" :key="fit">
        <span class="title">{{ fit }}</span>
        <el-avatar shape="square" :size="100" :fit="fit" :src="url"></el-avatar>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        fits: ['fill', 'contain', 'cover', 'none', 'scale-down'],
        url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
      }
    }
  }
</script>

```
:::

### 自定义样式

通过 `background-color` 设置背景颜色，`color` 设置字体颜色，`font-size` 设置字体大小。适用于字符头像、图标头像的自定义样式场景。

:::demo
```html
<template>
  <div class="demo-custom-style">
    <div class="demo-item">
      <div class="sub-title">自定义背景色</div>
      <div class="demo-row">
        <el-avatar background-color="#3F57FF">张</el-avatar>
        <el-avatar background-color="#67C23A">李</el-avatar>
        <el-avatar background-color="#E6A23C">王</el-avatar>
        <el-avatar background-color="#F56C6C">赵</el-avatar>
        <el-avatar background-color="#909399">陈</el-avatar>
      </div>
    </div>
    <div class="demo-item">
      <div class="sub-title">自定义字体颜色</div>
      <div class="demo-row">
        <el-avatar background-color="#F0F2F5" color="#3F57FF">张</el-avatar>
        <el-avatar background-color="#F0F2F5" color="#67C23A">李</el-avatar>
        <el-avatar background-color="#F0F2F5" color="#E6A23C">王</el-avatar>
        <el-avatar background-color="#F0F2F5" color="#F56C6C">赵</el-avatar>
      </div>
    </div>
    <div class="demo-item">
      <div class="sub-title">自定义字体大小</div>
      <div class="demo-row">
        <el-avatar :size="40" background-color="#3F57FF" :font-size="14">张</el-avatar>
        <el-avatar :size="48" background-color="#3F57FF" :font-size="18">李</el-avatar>
        <el-avatar :size="56" background-color="#3F57FF" :font-size="22">王</el-avatar>
        <el-avatar :size="64" background-color="#3F57FF" :font-size="26">赵</el-avatar>
      </div>
    </div>
    <div class="demo-item">
      <div class="sub-title">组合自定义</div>
      <div class="demo-row">
        <el-avatar :size="48" background-color="linear-gradient(135deg, #667eea 0%, #764ba2 100%)" color="#fff" :font-size="20">A</el-avatar>
        <el-avatar :size="48" background-color="linear-gradient(135deg, #f093fb 0%, #f5576c 100%)" color="#fff" :font-size="20">B</el-avatar>
        <el-avatar :size="48" background-color="linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)" color="#fff" :font-size="20">C</el-avatar>
        <el-avatar :size="48" background-color="linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)" color="#fff" :font-size="20">D</el-avatar>
      </div>
    </div>
  </div>
</template>
```
:::

### Attributes

| 参数              | 说明                             | 类型            | 可选值 | 默认值 |
| ----------------- | -------------------------------- | --------------- | ------ | ------ |
| icon              | 设置头像的图标类型，参考 Icon 组件   | string          |        |        |
| size              | 设置头像的大小                     | number/string | number / large / medium / small / mini | large  |
| shape             | 设置头像的形状  | string |    circle / square     |   circle  |
| src               | 图片头像的资源地址 | string |        |      |
| srcSet            | 以逗号分隔的一个或多个字符串列表表明一系列用户代理使用的可能的图像 | string |        |      |
| alt               | 描述图像的替换文本 | string |        |      |
| fit               | 当展示类型为图片的时候，设置图片如何适应容器框 | string |    fill / contain / cover / none / scale-down    |   cover   |
| background-color  | 设置头像的背景颜色，支持颜色值和渐变 | string |        |        |
| color             | 设置头像的字体颜色 | string |        |        |
| font-size         | 设置头像的字体大小，支持数值（px）或带单位的字符串 | number/string |        |        |


### Events

| 事件名 | 说明               | 回调参数 |
| ------ | ------------------ | -------- |
| error  | 图片类头像加载失败的回调， 返回 false 会关闭组件默认的 fallback 行为 |(e: Event)  |

### Slot

| 名称	 | 说明               |
| ------ | ------------------ |
| default  | 自定义头像展示内容 |
