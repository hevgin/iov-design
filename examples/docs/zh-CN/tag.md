## Tag 标签

用于标记和选择。

### 基础用法

:::demo 由`type`属性来选择tag的类型，也可以通过`color`属性来自定义背景色。

```html
<div class="tag-group">
  <el-tag>default</el-tag>
  <el-tag type="info">info</el-tag>
  <el-tag type="grey">grey</el-tag>
  <el-tag type="primary">primary</el-tag>
  <el-tag type="success">success</el-tag>
  <el-tag type="warning">warning</el-tag>
  <el-tag type="danger">danger</el-tag>
  <el-tag type="gold">gold</el-tag>
  <el-tag type="blue">blue</el-tag>
  <el-tag type="purple">purple</el-tag>
  <el-tag type="pink">pink</el-tag>
  <el-tag type="mauve">mauve</el-tag>
  <el-tag type="salmon">salmon</el-tag>
  <el-tag type="darkblue">darkblue</el-tag>
</div>
```
:::

### 状态

:::demo

```html
<div class="tag-group">
  <el-tag dot>default</el-tag>
  <el-tag dot type="info">info</el-tag>
  <el-tag dot type="grey">grey</el-tag>
  <el-tag dot type="primary">primary</el-tag>
  <el-tag dot type="success">success</el-tag>
  <el-tag dot type="warning">warning</el-tag>
  <el-tag dot type="danger">danger</el-tag>
  <el-tag dot type="gold">gold</el-tag>
  <el-tag dot type="blue">blue</el-tag>
  <el-tag dot type="purple">purple</el-tag>
  <el-tag dot type="pink">pink</el-tag>
  <el-tag dot type="mauve">mauve</el-tag>
  <el-tag dot type="salmon">salmon</el-tag>
  <el-tag dot type="darkblue">darkblue</el-tag>
</div>
```
:::
### 是否有边框描边

:::demo

```html
<div class="tag-group">
  <el-tag hit>default</el-tag>
  <el-tag hit type="info">info</el-tag>
  <el-tag hit type="grey">grey</el-tag>
  <el-tag hit type="primary">primary</el-tag>
  <el-tag hit type="success">success</el-tag>
  <el-tag hit type="warning">warning</el-tag>
  <el-tag hit type="danger">danger</el-tag>
  <el-tag hit type="gold">gold</el-tag>
  <el-tag hit type="blue">blue</el-tag>
  <el-tag hit type="purple">purple</el-tag>
  <el-tag hit type="pink">pink</el-tag>
  <el-tag hit type="mauve">mauve</el-tag>
  <el-tag hit type="salmon">salmon</el-tag>
  <el-tag hit type="darkblue">darkblue</el-tag>
</div>
```
:::

### 带图标标签

:::demo

```html
<div class="tag-group">
  <el-tag icon="el-icon-success">default</el-tag>
  <el-tag icon="el-icon-success" type="info">info</el-tag>
  <el-tag icon="el-icon-success" type="grey">grey</el-tag>
  <el-tag icon="el-icon-success" type="primary">primary</el-tag>
  <el-tag icon="el-icon-success" type="success">success</el-tag>
  <el-tag icon="el-icon-success" type="warning">warning</el-tag>
  <el-tag icon="el-icon-success" type="danger">danger</el-tag>
  <el-tag icon="el-icon-success" type="gold">gold</el-tag>
  <el-tag icon="el-icon-success" type="blue">blue</el-tag>
  <el-tag icon="el-icon-success" type="purple">purple</el-tag>
  <el-tag icon="el-icon-success" type="pink">pink</el-tag>
  <el-tag icon="el-icon-success" type="mauve">mauve</el-tag>
  <el-tag icon="el-icon-success" type="salmon">salmon</el-tag>
  <el-tag icon="el-icon-success" type="darkblue">darkblue</el-tag>
</div>
```
:::

### 可移除标签

:::demo 设置`closable`属性可以定义一个标签是否可移除。默认的标签移除时会附带渐变动画，如果不想使用，可以设置`disable-transitions`属性，它接受一个`Boolean`，true 为关闭。

```html
<div class="tag-group">
  <el-tag
    v-for="tag in tags"
    :key="tag"
    closable
    :type="tag">
    {{tag}}
  </el-tag>
</div>

<script>
  export default {
    data() {
      return {
        tags: ['default', 'info', 'grey', 'primary', 'success', 'warning', 'danger', 'gold', 'blue', 'purple', 'pink', 'mauve', 'salmon', 'darkblue']
      };
    }
  }
</script>
```
:::

### 动态编辑标签

动态编辑标签可以通过点击标签关闭按钮后触发的 `close` 事件来实现

:::demo
```html
<el-tag
  :key="tag"
  v-for="tag in dynamicTags"
  closable
  :disable-transitions="false"
  @close="handleClose(tag)">
  {{tag}}
</el-tag>
<el-input
  class="input-new-tag"
  v-if="inputVisible"
  v-model="inputValue"
  ref="saveTagInput"
  size="small"
  @keyup.enter.native="handleInputConfirm"
  @blur="handleInputConfirm"
>
</el-input>
<el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>

<style>
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>

<script>
  export default {
    data() {
      return {
        dynamicTags: ['标签一', '标签二', '标签三'],
        inputVisible: false,
        inputValue: ''
      };
    },
    methods: {
      handleClose(tag) {
        this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
      },

      showInput() {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },

      handleInputConfirm() {
        let inputValue = this.inputValue;
        if (inputValue) {
          this.dynamicTags.push(inputValue);
        }
        this.inputVisible = false;
        this.inputValue = '';
      }
    }
  }
</script>
```
:::

### 不同尺寸

Tag 组件提供除了默认值以外的三种尺寸，可以在不同场景下选择合适的按钮尺寸。

:::demo 额外的尺寸：`medium`、`small`、`mini`，通过设置`size`属性来配置它们。

```html
<el-tag closable>默认标签</el-tag>
<el-tag size="medium" closable>中等标签</el-tag>
<el-tag size="small" closable>小型标签</el-tag>
<el-tag size="mini" closable>超小标签</el-tag>
```
:::

### 不同主题

Tag 组件提供了三个不同的主题：`dark`、`light` 和 `plain`

:::demo 通过设置`effect`属性来改变主题，默认为 `light`
```html
<div class="tag-group">
  <span class="tag-group__title">Dark</span>
  <el-tag
    v-for="item in items"
    :key="item"
    :type="item"
    effect="dark">
    {{ item }}
  </el-tag>
</div>
<div class="tag-group">
  <span class="tag-group__title">Light</span>
  <el-tag
    v-for="item in items"
    :key="item"
    :type="item"
    effect="light">
    {{ item }}
  </el-tag>
</div>
<div class="tag-group">
  <span class="tag-group__title">Plain</span>
  <el-tag
    v-for="item in items"
    :key="item"
    :type="item"
    size="small"
    effect="plain">
    {{ item }}
  </el-tag>
</div>

<script>
  export default {
    data() {
      return {
        items: ['default', 'info', 'grey', 'primary', 'success', 'warning', 'danger', 'gold', 'blue', 'purple', 'pink', 'mauve', 'salmon', 'darkblue']
      }
    }
  }
</script>
```
:::

### Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| type | 类型 | string | default, info, grey, primary, success, warning, danger, gold, blue, purple, pink, mauve, salmon, darkblue | — |
| closable | 是否可关闭 | boolean | — | false |
| hit | 是否有边框描边 | boolean | — | false |
| dot | 是否展示状态标签 | boolean | — | false |
| color | 背景色 | string | — | — |
| size | 尺寸 | string | medium / small / mini | — |
| icon | 图标 | string | - | — |
| effect | 主题 | string | dark / light / plain | light |
| max-width | 文字内容最大宽度 | string | none/px | none |


### Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| click | 点击 Tag 时触发的事件 | — |
| close | 关闭 Tag 时触发的事件 | — |
