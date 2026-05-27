## Button 按钮
常用的操作按钮。

### 基础用法

基础的按钮用法。使用`type`、`plain`、`round`和`circle`属性来定义 Button 的样式。

:::demo

```html
<el-row>
  <el-button>默认按钮</el-button>
  <el-button type="primary">主要按钮</el-button>
  <el-button type="success">成功按钮</el-button>
  <el-button type="info">信息按钮</el-button>
  <el-button type="warning">警告按钮</el-button>
  <el-button type="danger">危险按钮</el-button>
</el-row>

<el-row>
  <el-button plain>实线按钮</el-button>
  <el-button type="primary" plain>主要按钮</el-button>
  <el-button type="success" plain>成功按钮</el-button>
  <el-button type="info" plain>信息按钮</el-button>
  <el-button type="warning" plain>警告按钮</el-button>
  <el-button type="danger" plain>危险按钮</el-button>
</el-row>

<el-row>
  <el-button dashed>虚线按钮</el-button>
  <el-button type="primary" dashed>主要按钮</el-button>
  <el-button type="success" dashed>成功按钮</el-button>
  <el-button type="info" dashed>信息按钮</el-button>
  <el-button type="warning" dashed>警告按钮</el-button>
  <el-button type="danger" dashed>危险按钮</el-button>
</el-row>

<el-row>
  <el-button ghost>幽灵按钮</el-button>
  <el-button type="primary" ghost>主要按钮</el-button>
  <el-button type="success" ghost>成功按钮</el-button>
  <el-button type="info" ghost>信息按钮</el-button>
  <el-button type="warning" ghost>警告按钮</el-button>
  <el-button type="danger" ghost>危险按钮</el-button>
</el-row>

<el-row>
  <el-button round>圆角按钮</el-button>
  <el-button type="primary" round>主要按钮</el-button>
  <el-button type="success" round>成功按钮</el-button>
  <el-button type="info" round>信息按钮</el-button>
  <el-button type="warning" round>警告按钮</el-button>
  <el-button type="danger" round>危险按钮</el-button>
</el-row>

<el-row>
  <el-button icon="iov-icon-search" circle></el-button>
  <el-button type="primary" icon="iov-icon-edit" circle></el-button>
  <el-button type="success" icon="iov-icon-success" circle></el-button>
  <el-button type="info" icon="iov-icon-sms" circle></el-button>
  <el-button type="warning" icon="iov-icon-authorize" circle></el-button>
  <el-button type="danger" icon="iov-icon-delete" circle></el-button>
</el-row>
```
:::

### 禁用状态

按钮不可用状态。你可以使用`disabled`属性来定义按钮是否可用，它接受一个`Boolean`值。

:::demo

```html

<el-row>
  <el-button disabled>默认按钮</el-button>
  <el-button disabled type="primary">主要按钮</el-button>
  <el-button disabled type="success">成功按钮</el-button>
  <el-button disabled type="info">信息按钮</el-button>
  <el-button disabled type="warning">警告按钮</el-button>
  <el-button disabled type="danger">危险按钮</el-button>
</el-row>

<el-row>
  <el-button disabled plain>实线按钮</el-button>
  <el-button disabled type="primary" plain>主要按钮</el-button>
  <el-button disabled type="success" plain>成功按钮</el-button>
  <el-button disabled type="info" plain>信息按钮</el-button>
  <el-button disabled type="warning" plain>警告按钮</el-button>
  <el-button disabled type="danger" plain>危险按钮</el-button>
</el-row>

<el-row>
  <el-button disabled dashed>虚线按钮</el-button>
  <el-button disabled type="primary" dashed>主要按钮</el-button>
  <el-button disabled type="success" dashed>成功按钮</el-button>
  <el-button disabled type="info" dashed>信息按钮</el-button>
  <el-button disabled type="warning" dashed>警告按钮</el-button>
  <el-button disabled type="danger" dashed>危险按钮</el-button>
</el-row>

<el-row>
  <el-button disabled ghost>幽灵按钮</el-button>
  <el-button disabled type="primary" ghost>主要按钮</el-button>
  <el-button disabled type="success" ghost>成功按钮</el-button>
  <el-button disabled type="info" ghost>信息按钮</el-button>
  <el-button disabled type="warning" ghost>警告按钮</el-button>
  <el-button disabled type="danger" ghost>危险按钮</el-button>
</el-row>

<el-row>
  <el-button disabled round>圆角按钮</el-button>
  <el-button disabled type="primary" round>主要按钮</el-button>
  <el-button disabled type="success" round>成功按钮</el-button>
  <el-button disabled type="info" round>信息按钮</el-button>
  <el-button disabled type="warning" round>警告按钮</el-button>
  <el-button disabled type="danger" round>危险按钮</el-button>
</el-row>

<el-row>
  <el-button disabled icon="iov-icon-search" circle></el-button>
  <el-button disabled type="primary" icon="iov-icon-edit" circle></el-button>
  <el-button disabled type="success" icon="iov-icon-success" circle></el-button>
  <el-button disabled type="info" icon="iov-icon-sms" circle></el-button>
  <el-button disabled type="warning" icon="iov-icon-authorize" circle></el-button>
  <el-button disabled type="danger" icon="iov-icon-delete" circle></el-button>
</el-row>
```
:::

### Block 按钮

Block 按钮在宽度上充满其所在的父容器（无 padding 和 margin 值。）

:::demo
```html
<el-row>
  <el-button block>blcok按钮</el-button>
</el-row>
<el-row>
  <el-button block type="primary">blcok按钮</el-button>
</el-row>
<el-row>
  <el-button block type="success">blcok按钮</el-button>
</el-row>
<el-row>
  <el-button block type="warning">blcok按钮</el-button>
</el-row>
<el-row>
  <el-button block type="danger">blcok按钮</el-button>
</el-row>
<el-row>
  <el-button block type="text">blcok按钮</el-button>
</el-row>
```
:::

### 文字按钮

没有边框和背景色的按钮。

:::demo
```html
<el-row v-for="size of sizes">
  <el-button type="text" v-for="color of colors" :key="color + size" :color="color" :size="size">文字按钮</el-button>
</el-row>
<el-row v-for="size of sizes">
  <el-button type="text" disabled v-for="color of colors" :key="color + size" :color="color" :size="size">文字按钮</el-button>
</el-row>
<script>
  export default {
    data() {
      return {
        sizes: ['large', 'medium', 'small', 'mini'],
        colors: ['info', 'primary', 'success', 'warning', 'danger']
      };
    }
  }
</script>
```
:::

### 图标按钮

带图标的按钮可增强辨识度（有文字）或节省空间（无文字）。设置`icon`属性即可，icon 的列表可以参考 Element 的 icon 组件，也可以设置在文字右边的 icon ，只要使用`i`标签即可，可以使用自定义图标。

:::demo

```html
<el-button type="primary" icon="iov-icon-update"></el-button>
<el-button type="primary" icon="iov-icon-plus"></el-button>
<el-button type="primary" icon="iov-icon-delete"></el-button>
<el-button type="primary" icon="iov-icon-search" plain>搜索</el-button>
<el-button type="primary" icon="iov-icon-upload" plain>上传</el-button>
<el-button type="primary" icon="iov-icon-upload" plain size="mini">上传</el-button>
<el-button type="text" color="primary" icon="iov-icon-plus">新增</el-button>
```
:::

### 按钮组

以按钮组的方式出现，常用于多项类似操作。使用`<el-button-group>`标签来嵌套你的按钮。

:::demo

```html
<el-button-group>
  <el-button type="primary" icon="iov-icon-arrow-prev">上一页</el-button>
  <el-button type="primary">下一页<i class="iov-icon-arrow-next el-icon--right"></i></el-button>
</el-button-group>
<el-button-group>
  <el-button type="primary" icon="iov-icon-edit"></el-button>
  <el-button type="primary" icon="iov-icon-update"></el-button>
  <el-button type="primary" icon="iov-icon-delete"></el-button>
</el-button-group>
```
:::

### 加载中

点击按钮后进行数据加载操作，在按钮上显示加载状态。要设置为 loading 状态，只要设置`loading`属性为`true`即可。

:::demo

```html
<el-button type="primary" :loading="true">加载中</el-button>
```
:::

### 不同尺寸

Button 组件提供除了默认值以外的三种尺寸，可以在不同场景下选择合适的按钮尺寸。额外的尺寸：`medium`、`small`、`mini`，通过设置`size`属性来配置它们。

:::demo

```html
<el-row>
  <el-button>默认按钮</el-button>
  <el-button size="medium">中等按钮</el-button>
  <el-button size="small">小型按钮</el-button>
  <el-button size="mini">超小按钮</el-button>
</el-row>
<el-row>
  <el-button round>默认按钮</el-button>
  <el-button size="medium" round>中等按钮</el-button>
  <el-button size="small" round>小型按钮</el-button>
  <el-button size="mini" round>超小按钮</el-button>
</el-row>
<el-row>
  <el-button icon="iov-icon-search" circle></el-button>
  <el-button type="primary" icon="iov-icon-edit" circle size="medium"></el-button>
  <el-button type="success" icon="iov-icon-success" circle size="small"></el-button>
  <el-button type="info" icon="iov-icon-sms" circle size="small"></el-button>
  <el-button type="warning" icon="iov-icon-authorize" circle size="mini"></el-button>
  <el-button type="danger" icon="iov-icon-delete" circle size="mini"></el-button>
</el-row>
<el-row>
  <el-button icon="iov-icon-search"></el-button>
  <el-button type="primary" icon="iov-icon-edit" size="medium"></el-button>
  <el-button type="success" icon="iov-icon-success" size="small"></el-button>
  <el-button type="info" icon="iov-icon-sms" size="small"></el-button>
  <el-button type="warning" icon="iov-icon-authorize" size="mini"></el-button>
  <el-button type="danger" icon="iov-icon-delete" size="mini"></el-button>
</el-row>
```
:::

### Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| size     | 尺寸   | string  |   medium / small / mini            |    —     |
| type     | 类型   | string    |   primary / success / warning / danger / info / text |     —    |
| plain     | 是否朴素按钮   | boolean    | — | false   |
| round     | 是否圆角按钮   | boolean    | — | false   |
| circle     | 是否圆形按钮   | boolean    | — | false   |
| ghost     | 是否幽灵按钮   | boolean    | — | false   |
| dashed     | 是否虚线按钮   | boolean    | — | false   |
| block     | 是否block按钮   | boolean    | — | false   |
| loading     | 是否加载中状态   | boolean    | — | false   |
| disabled  | 是否禁用状态    | boolean   | —   | false   |
| icon  | 图标类名 | string   |  —  |  —  |
| autofocus  | 是否默认聚焦 | boolean   |  —  |  false  |
| native-type | 原生 type 属性 | string | button / submit / reset | button |
| color | 文字按钮颜色 | string | primary/info/success/warning/danger | primary |
