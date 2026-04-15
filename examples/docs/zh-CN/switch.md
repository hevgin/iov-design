## Switch 开关

表示两种相互对立的状态间的切换，多用于触发「开/关」。

### 基本用法

绑定`v-model`到一个`Boolean`类型的变量。可以使用`active-color`属性与`inactive-color`属性来设置开关的背景色。

:::demo 

```html
<el-switch v-model="value"></el-switch>
<el-switch v-model="value" size="medium"></el-switch>
<el-switch v-model="value" size="small"></el-switch>
<el-switch v-model="value" size="mini"></el-switch>

<el-switch v-model="value" type="rect"></el-switch>
<el-switch v-model="value" type="rect" size="medium"></el-switch>
<el-switch v-model="value" type="rect" size="small"></el-switch>
<el-switch v-model="value" type="rect" size="mini"></el-switch>

<script>
  export default {
    data() {
      return {
        value: true
      }
    }
  };
</script>
```
:::

### 文字描述

使用`active-text`属性与`inactive-text`属性来设置开关的文字描述。

:::demo 

```html
<el-switch v-model="value1" inactive-icon-class="iov-icon-success" active-icon-class="iov-icon-fail"></el-switch>
<el-switch v-model="value1" inactive-icon-class="iov-icon-success" active-icon-class="iov-icon-fail" size="medium"></el-switch>
<el-switch v-model="value1" inactive-icon-class="iov-icon-success" active-icon-class="iov-icon-fail" size="small"></el-switch>
<el-switch v-model="value1" inactive-icon-class="iov-icon-success" active-icon-class="iov-icon-fail" size="mini"></el-switch>
<el-switch v-model="value2" active-text="开" inactive-text="关"></el-switch>
<el-switch v-model="value2" active-text="开" inactive-text="关" size="medium"></el-switch>
<el-switch v-model="value2" active-text="开" inactive-text="关" size="small"></el-switch>
<el-switch v-model="value2" active-text="开" inactive-text="关" size="mini"></el-switch>

<script>
  export default {
    data() {
      return {
        value1: true,
        value2: true
      }
    }
  };
</script>
```
:::

### 扩展的 value 类型

设置`active-value`和`inactive-value`属性，接受`Boolean`, `String`或`Number`类型的值。

:::demo 

```html
<el-tooltip :content="'Switch value: ' + value" placement="top">
  <el-switch
    v-model="value"
    active-color="#13ce66"
    inactive-color="#ff4949"
    active-value="100"
    inactive-value="0">
  </el-switch>
</el-tooltip>

<script>
  export default {
    data() {
      return {
        value: '100'
      }
    }
  };
</script>
```

:::

### 禁用状态

设置`disabled`属性，接受一个`Boolean`，设置`true`即可禁用。

:::demo 


```html
<el-switch
  v-model="value1"
  disabled>
</el-switch>
<el-switch
  v-model="value2"
  disabled>
</el-switch>
<script>
  export default {
    data() {
      return {
        value1: true,
        value2: false
      }
    }
  };
</script>
```
:::


### Attributes

| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| value / v-model | 绑定值 | boolean / string / number | — | — |
| disabled  | 是否禁用    | boolean   | — | false   |
| width  | switch 的宽度（像素）    | number   | — | 32 |
| active-icon-class  | switch 打开时所显示图标的类名，设置此项会忽略 `active-text`    | string   | — | — |
| inactive-icon-class  | switch 关闭时所显示图标的类名，设置此项会忽略 `inactive-text`    | string   | — | — |
| active-text  | switch 打开时的文字描述    | string   | — | — |
| inactive-text  | switch 关闭时的文字描述    | string   | — | — |
| active-value  | switch 打开时的值    | boolean / string / number | — | true |
| inactive-value  | switch 关闭时的值    | boolean / string / number | — | false |
| active-color  | switch 打开时的背景色    | string   | — | #3F57FF |
| inactive-color  | switch 关闭时的背景色    | string   | — | #ABAFB5 |
| name            | switch 对应的 name 属性    | string   | — | — |
| size            | switch 大小    | string   | large/medium/small/mini | large |
| type            | switch 类型    | string   | circle/rect | circle |
| validate-event  | 改变 switch 状态时是否触发表单的校验     | boolean   | - | true |

### Events
| 事件名称      | 说明    | 回调参数      |
|---------- |-------- |---------- |
| change  | switch 状态发生变化时的回调函数    | 新状态的值 |

### Methods
| 方法名 | 说明 | 参数 |
| ---- | ---- | ---- |
| focus | 使 Switch 获取焦点 | - |
