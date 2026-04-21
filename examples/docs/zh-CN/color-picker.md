## ColorPicker 颜色选择器

用于可视化选择颜色的组件，支持十六进制、RGB、HSV、HSL 等多种颜色格式，可开启透明度选择、配置预定义颜色、调整组件尺寸，满足各类颜色配置场景需求。

### 基础用法

使用 v-model 与 Vue 实例中的一个变量进行双向绑定，绑定的变量需要是字符串类型。

:::demo 
```html
<template>
  <el-row :gutter="20">
    <el-col :span="12">
      <div class="component-content-title mgb-10">有默认值</div>
      <el-color-picker v-model="color1"></el-color-picker>
    </el-col>
    <el-col :span="12">
      <div class="component-content-title mgb-10">无默认值</div>
      <el-color-picker v-model="color2"></el-color-picker>
    </el-col>
  </el-row>
</template>
<script>
  export default {
    data() {
      return {
        color1: '#409EFF',
        color2: null
      }
    }
  };
</script>
```
:::

### 选择透明度

开启 `show-alpha` 属性即可支持带 Alpha 通道的颜色选择，支持 RGBA / HSLA 等透明色格式。

:::demo 
```html
<el-color-picker v-model="color" show-alpha></el-color-picker>

<script>
  export default {
    data() {
      return {
        color: 'rgba(19, 206, 102, 0.8)'
      }
    }
  };
</script>
```
:::

### 预定义颜色

通过 `predefine` 属性配置预设颜色面板，支持多种颜色格式混合配置，快速选择常用颜色。

:::demo 
```html
<el-color-picker
  v-model="color"
  show-alpha
  :predefine="predefineColors">
</el-color-picker>

<script>
  export default {
    data() {
      return {
        color: 'rgba(255, 69, 0, 0.68)',
        predefineColors: [
          '#ff4500',
          '#ff8c00',
          '#ffd700',
          '#90ee90',
          '#00ced1',
          '#1e90ff',
          '#c71585',
          'rgba(255, 69, 0, 0.68)',
          'rgb(255, 120, 0)',
          'hsv(51, 100, 98)',
          'hsva(120, 40, 94, 0.5)',
          'hsl(181, 100%, 37%)',
          'hsla(209, 100%, 56%, 0.73)',
          '#c7158577'
        ]
      }
    }
  };
</script>
```
:::

### 不同尺寸

组件提供默认、`medium`、`small`、`mini` 四种尺寸，通过 size 属性灵活适配不同布局场景。

:::demo
```html
<template>
  <el-row :gutter="20">
    <el-col :span="12">
      <div class="component-content-title mgb-10">默认尺寸</div>
      <el-color-picker v-model="color"></el-color-picker>
    </el-col>
    <el-col :span="12">
      <div class="component-content-title mgb-10">medium 尺寸</div>
      <el-color-picker v-model="color" size="medium"></el-color-picker>
    </el-col>
  </el-row>
  <el-row :gutter="20">
    <el-col :span="12">
      <div class="component-content-title mgb-10">small 尺寸</div>
      <el-color-picker v-model="color" size="small"></el-color-picker>
    </el-col>
    <el-col :span="12">
      <div class="component-content-title mgb-10">mini 尺寸</div>
      <el-color-picker v-model="color" size="mini"></el-color-picker>
    </el-col>
  </el-row>
</template>
<script>
  export default {
    data() {
      return {
        color: '#409EFF'
      }
    }
  };
</script>
```
:::

### Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| value / v-model | 绑定值 | string | — | — |
| disabled | 是否禁用 | boolean | — | false |
| size | 尺寸 | string | medium / small / mini | — |
| show-alpha | 是否支持透明度选择 | boolean | — | false |
| color-format | 写入 v-model 的颜色的格式 | string | hsl / hsv / hex / rgb | hex（show-alpha 为 false）/ rgb（show-alpha 为 true） |
| popper-class | ColorPicker 下拉框的类名 | string | — | — |
| predefine | 预定义颜色 | array | — | — |

### Events
| 事件名称      | 说明    | 回调参数      |
|---------- |-------- |---------- |
| change | 当绑定值变化时触发 | 当前值 |
| active-change | 面板中当前显示的颜色发生改变时触发 | 当前显示的颜色值 |
