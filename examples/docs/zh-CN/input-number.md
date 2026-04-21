## InputNumber 计数器

用于输入标准数字值的计数器组件，支持数值范围限定、步长控制、精度设置、尺寸调整、按钮位置自定义等功能，可满足各类数字输入场景的交互需求，操作便捷且输入规范。

### 基础用法

通过 `v-model` 绑定变量即可快速使用，变量初始值为组件默认值，支持配置数值上下限，数值变化时可通过 `change` 事件监听。

:::demo 
```html
<template>
  <el-row>
    <el-col :span="12">
      <el-input-number v-model="num" @change="handleChange" :min="1" :max="10" label="描述文字"></el-input-number>
    </el-col>
  </el-row>
</template>
<script>
  export default {
    data() {
      return {
        num: 1
      };
    },
    methods: {
      handleChange(value) {
        console.log(value);
      }
    }
  };
</script>
```
:::

### 禁用状态

通过 `disabled` 属性控制组件禁用状态，接收布尔值；未配置 `min`/`max` 时，组件默认最小值为 0。

:::demo 

```html
<template>
  <el-row>
    <el-col :span="12">
      <el-input-number v-model="num" :disabled="true"></el-input-number>
    </el-col>
  </el-row>
</template>
<script>
  export default {
    data() {
      return {
        num: 1
      }
    }
  };
</script>
```
:::

### 步数

通过 `step` 属性定义数值递增 / 递减的步长，接收`Number`，可自定义每次增减的数值幅度

:::demo 

```html
<template>
  <el-row>
    <el-col :span="12">
      <el-input-number v-model="num" :step="2"></el-input-number>
    </el-col>
  </el-row>
</template>
<script>
  export default {
    data() {
      return {
        num: 5
      }
    }
  };
</script>
```
:::

### 严格步数

`step-strictly`属性接受一个`Boolean`。如果这个属性被设置为`true`，开启后仅允许输入步长的倍数，强制规范输入格式。

:::demo 

```html
<template>
  <el-row>
    <el-col :span="12">
      <el-input-number v-model="num" :step="2" step-strictly></el-input-number>
    </el-col>
  </el-row>
</template>
<script>
  export default {
    data() {
      return {
        num: 2
      }
    }
  };
</script>
```
:::

### 精度

通过 `precision` 属性控制数值精度，接收非负整数，精度值不能小于 `step` 的小数位数，适配小数输入场景

:::demo 

```html
<template>
  <el-row>
    <el-col :span="12">
      <el-input-number v-model="num" :precision="2" :step="0.1" :max="10"></el-input-number>
    </el-col>
  </el-row>
</template>
<script>
  export default {
    data() {
      return {
        num: 1
      }
    }
  };
</script>
```

:::

:::tip
`precision` 的值必须是一个非负整数，并且不能小于 `step` 的小数位数。
:::

### 尺寸

组件提供默认、`medium`、`small`、`mini` 四种尺寸，通过 size 属性灵活适配不同页面布局需求。

:::demo

```html
<template>
  <el-row :gutter="20">
    <el-col :span="12">
      <div class="component-content-title mgb-10">默认尺寸</div>
      <el-input-number v-model="num1"></el-input-number>
    </el-col>
    <el-col :span="12">
      <div class="component-content-title mgb-10">medium 尺寸</div>
      <el-input-number size="medium" v-model="num2"></el-input-number>
    </el-col>
  </el-row>
  <el-row :gutter="20">
    <el-col :span="12">
      <div class="component-content-title mgb-10">small 尺寸</div>
      <el-input-number size="small" v-model="num3"></el-input-number>
    </el-col>
    <el-col :span="12">
      <div class="component-content-title mgb-10">mini 尺寸</div>
      <el-input-number size="mini" v-model="num4"></el-input-number>
    </el-col>
  </el-row>
</template>
<script>
  export default {
    data() {
      return {
        num1: 1,
        num2: 1,
        num3: 1,
        num4: 1
      }
    }
  };
</script>
```
:::

### 按钮位置

通过 `controls-position` 属性自定义增减按钮位置，支持将按钮设置在输入框右侧，兼容不同尺寸和状态。

:::demo 
```html
<template>
  <el-row :gutter="20">
    <el-col :span="12">
      <div class="component-content-title mgb-10">默认尺寸+右侧按钮</div>
      <el-input-number v-model="num" controls-position="right" @change="handleChange" :min="1" :max="10"></el-input-number>
    </el-col>
    <el-col :span="12">
      <div class="component-content-title mgb-10">medium尺寸+右侧按钮+禁用</div>
      <el-input-number v-model="num" disabled controls-position="right" @change="handleChange" :min="1" :max="10" size="medium"></el-input-number>
    </el-col>
  </el-row>
  <el-row :gutter="20">
    <el-col :span="12">
      <div class="component-content-title mgb-10">small尺寸+右侧按钮</div>
      <el-input-number v-model="num" controls-position="right" @change="handleChange" :min="1" :max="10" size="small"></el-input-number>
    </el-col>
    <el-col :span="12">
      <div class="component-content-title mgb-10">mini尺寸+右侧按钮</div>
      <el-input-number v-model="num" controls-position="right" @change="handleChange" :min="1" :max="10" size="mini"></el-input-number>
    </el-col>
  </el-row>
</template>
<script>
  export default {
    data() {
      return {
        num: 1
      };
    },
    methods: {
      handleChange(value) {
        console.log(value);
      }
    }
  };
</script>
```
:::

### Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|----------|-------------- |----------|--------------------------------  |-------- |
| value / v-model    | 绑定值         | number | — | 0 |
| min      | 设置计数器允许的最小值 | number | — | -Infinity |
| max      | 设置计数器允许的最大值 | number | — | Infinity |
| step     | 计数器步长           | number   | — | 1 |
| step-strictly | 是否只能输入 step 的倍数 | boolean   | — | false |
| precision| 数值精度             | number   | — | — |
| size     | 计数器尺寸           | string   | large, small | — |
| disabled | 是否禁用计数器        | boolean | — | false |
| controls | 是否使用控制按钮        | boolean | — | true |
| controls-position | 控制按钮位置 | string | right | - |
| name | 原生属性 | string | — | — |
| label | 输入框关联的label文字 | string | — | — |
| placeholder | 输入框默认 placeholder | string | - | - |

### Events
| 事件名称 | 说明 | 回调参数 |
|---------|--------|---------|
| change | 绑定值被改变时触发 | currentValue, oldValue |
| blur | 在组件 Input 失去焦点时触发 | (event: Event) |
| focus | 在组件 Input 获得焦点时触发 | (event: Event) |

### Methods
| 方法名 | 说明 | 参数 |
| ---- | ---- | ---- |
| focus | 使 input 获取焦点 | - |
| select | 选中 input 中的文字 | — |
