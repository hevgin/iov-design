## Switch 开关

用于两种对立状态的快速切换，核心适用于开启 / 关闭类交互场景，支持尺寸、样式、文字 / 图标描述、自定义值、禁用状态等配置，交互简洁直观。

### 基本用法

通过 `v-model` 绑定`Boolean`实现状态切换，支持 `size` 控制尺寸、`type` 切换开关样式，可以使用`active-color`属性与`inactive-color`属性来设置开关的背景色。

:::demo 

```html
<template>
  <el-row :gutter="20">
    <el-col :span="12">
      <div class="component-content-title">默认圆角-默认尺寸</div>
      <el-switch v-model="value"></el-switch>
    </el-col>
    <el-col :span="12">
      <div class="component-content-title">默认圆角-medium尺寸</div>
      <el-switch v-model="value" size="medium"></el-switch>
    </el-col>
  </el-row>
  <el-row :gutter="20">
    <el-col :span="12">
      <div class="component-content-title">默认圆角-small尺寸</div>
      <el-switch v-model="value" size="small"></el-switch>
    </el-col>
    <el-col :span="12">
      <div class="component-content-title">默认圆角-mini尺寸</div>
      <el-switch v-model="value" size="mini"></el-switch>
    </el-col>
  </el-row>
  <el-row :gutter="20">
    <el-col :span="12">
      <div class="component-content-title">直角矩形-默认尺寸</div>
      <el-switch v-model="value" type="rect"></el-switch>
    </el-col>
    <el-col :span="12">
      <div class="component-content-title">直角矩形-medium尺寸</div>
      <el-switch v-model="value" type="rect" size="medium"></el-switch>
    </el-col>
  </el-row>
  <el-row :gutter="20">
    <el-col :span="12">
      <div class="component-content-title">直角矩形-small尺寸</div>
      <el-switch v-model="value" type="rect" size="small"></el-switch>
    </el-col>
    <el-col :span="12">
      <div class="component-content-title">直角矩形-mini尺寸</div>
      <el-switch v-model="value" type="rect" size="mini"></el-switch>
    </el-col>
  </el-row>
</template>
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

支持 `active-text`/`inactive-text` 设置开关文字描述，也可通过图标类名自定义开关状态图标，适配不同展示需求。

:::demo 

```html
<template>
  <el-row :gutter="20">
    <el-col :span="12">
      <div class="component-content-title">图标描述-默认尺寸</div>
      <el-switch v-model="value1" inactive-icon-class="iov-icon-success" active-icon-class="iov-icon-fail"></el-switch>
    </el-col>
    <el-col :span="12">
      <div class="component-content-title">图标描述-medium尺寸</div>
      <el-switch v-model="value1" inactive-icon-class="iov-icon-success" active-icon-class="iov-icon-fail" size="medium"></el-switch>
    </el-col>
  </el-row>
  <el-row :gutter="20">
    <el-col :span="12">
      <div class="component-content-title">图标描述-small尺寸</div>
      <el-switch v-model="value1" inactive-icon-class="iov-icon-success" active-icon-class="iov-icon-fail" size="small"></el-switch>
    </el-col>
    <el-col :span="12">
      <div class="component-content-title">图标描述-mini尺寸</div>
      <el-switch v-model="value1" inactive-icon-class="iov-icon-success" active-icon-class="iov-icon-fail" size="mini"></el-switch>
    </el-col>
  </el-row>
  <el-row :gutter="20">
    <el-col :span="12">
      <div class="component-content-title">文字描述-默认尺寸</div>
      <el-switch v-model="value2" active-text="开" inactive-text="关"></el-switch>
    </el-col>
    <el-col :span="12">
      <div class="component-content-title">文字描述-medium尺寸</div>
      <el-switch v-model="value2" active-text="开" inactive-text="关" size="medium"></el-switch>
    </el-col>
  </el-row>
  <el-row :gutter="20">
    <el-col :span="12">
      <div class="component-content-title">文字描述-small尺寸</div>
      <el-switch v-model="value2" active-text="开" inactive-text="关" size="small"></el-switch>
    </el-col>
    <el-col :span="12">
      <div class="component-content-title">文字描述-mini尺寸</div>
      <el-switch v-model="value2" active-text="开" inactive-text="关" size="mini"></el-switch>
    </el-col>
  </el-row>
</template>
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

支持自定义开关状态值，通过 `active-value`/`inactive-value` 配置，可接收`Boolean`, `String`或`Number`类型，满足业务数据绑定需求

:::demo 

```html
<template>
  <el-row>
    <el-col :span="12">
      <el-tooltip :content="'Switch value: ' + value" placement="top">
        <el-switch
          v-model="value"
          active-color="#13ce66"
          inactive-color="#ff4949"
          active-value="100"
          inactive-value="0">
        </el-switch>
      </el-tooltip>
    </el-col>
  </el-row>
</template>
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

通过 `disabled` 属性开启禁用模式，设置为 `true` 后无法操作开关，支持开启 / 关闭两种禁用状态展示。

:::demo 


```html
<template>
  <el-row :gutter="20">
    <el-col :span="12">
      <div class="component-content-title">禁用-开启状态</div>
      <el-switch v-model="value1" disabled></el-switch>
    </el-col>
    <el-col :span="12">
      <div class="component-content-title">禁用-关闭状态</div>
      <el-switch v-model="value2" disabled></el-switch>
    </el-col>
  </el-row>
</template>
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
