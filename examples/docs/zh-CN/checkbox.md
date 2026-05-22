## Checkbox 多选框
在一组备选项中进行**多选**，支持独立使用、组合使用、全选、数量限制等场景。

:::tip 提示
多选框适合选项较少、需要同时勾选多个的场景；选项过多时建议使用 `Select` 多选模式。
:::

### 基础用法

单独使用表示开关状态，`v-model` 绑定布尔值，选中为 `true`，未选中为 `false`。

:::demo

```html
<template>
  <el-row :gutter="20">
    <!-- `checked` 为 true 或 false --><el-col :span="6">
    <div class="component-content-title mgb-10">large（默认）</div>
      <el-checkbox v-model="checked" size="large">选项一</el-checkbox>
    </el-col>
    <el-col :span="6">
      <div class="component-content-title mgb-10">medium</div>
      <el-checkbox v-model="checked" size="medium">选项二</el-checkbox>
    </el-col>
    <el-col :span="6">
      <div class="component-content-title mgb-10">small</div>
      <el-checkbox v-model="checked" size="small">选项三</el-checkbox>
    </el-col>
    <el-col :span="6">
      <div class="component-content-title mgb-10">mini</div>
      <el-checkbox v-model="checked" size="mini">选项四</el-checkbox>
    </el-col>
  </el-row>
</template>
<script>
  export default {
    data() {
      return {
        checked: true
      };
    }
  };
</script>
```
:::

### 禁用状态

添加 `disabled` 属性即可禁用多选框，支持未选中禁用和选中禁用两种状态。

:::demo

```html
<el-row :gutter="20">
  <el-col :span="12">
    <el-checkbox v-model="checked1" disabled>未选中禁用</el-checkbox>
    <el-checkbox v-model="checked2" disabled>选中禁用</el-checkbox>
  </el-col>
</el-row>

<script>
export default {
  data() {
    return {
      checked1: false,
      checked2: true
    }
  }
}
</script>
```
:::

### 多选框组

使用 `el-checkbox-group` 实现多选组，`v-model` 绑定数组，自动管理选中项，支持单个选项禁用。可通过 `gap` 属性自定义选项间距。

:::demo

```html
<el-row :gutter="20">
  <el-col :span="12">
    <div class="component-content-title mgb-10">默认间距</div>
    <el-checkbox-group v-model="checkList1">
      <el-checkbox label="选项 A"></el-checkbox>
      <el-checkbox label="选项 B"></el-checkbox>
      <el-checkbox label="选项 C"></el-checkbox>
      <el-checkbox label="禁用选项" disabled></el-checkbox>
    </el-checkbox-group>
  </el-col>
  <el-col :span="12">
    <div class="component-content-title mgb-10">自定义间距（gap=16）</div>
    <el-checkbox-group v-model="checkList2" :gap="16">
      <el-checkbox label="选项 A"></el-checkbox>
      <el-checkbox label="选项 B"></el-checkbox>
      <el-checkbox label="选项 C"></el-checkbox>
      <el-checkbox label="禁用选项" disabled></el-checkbox>
    </el-checkbox-group>
  </el-col>
</el-row>

<script>
export default {
  data() {
    return {
      checkList1: ['选项 A'],
      checkList2: ['选项 A']
    }
  }
}
</script>
```
:::

### indeterminate 状态

`indeterminate` 实现半选 / 全选效果，常用于列表全选、权限选择等交互场景。

:::demo

```html
<el-row :gutter="20">
  <el-col :span="12">
    <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选城市</el-checkbox>
    <div style="margin: 10px 0;"></div>
    <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
      <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
    </el-checkbox-group>
  </el-col>
</el-row>

<script>
const cityOptions = ['上海', '北京', '广州', '深圳']
export default {
  data() {
    return {
      checkAll: false,
      checkedCities: ['上海', '北京'],
      cities: cityOptions,
      isIndeterminate: true
    }
  },
  methods: {
    handleCheckAllChange(val) {
      this.checkedCities = val ? cityOptions : []
      this.isIndeterminate = false
    },
    handleCheckedCitiesChange(value) {
      const count = value.length
      this.checkAll = count === this.cities.length
      this.isIndeterminate = count > 0 && count < this.cities.length
    }
  }
}
</script>
```
:::

### 可选项目数量的限制

通过 `min` / `max` 属性限制最少 / 最多勾选数量，提升表单交互严谨性。

:::demo

```html
<template>
  <el-checkbox-group
    v-model="checkedCities"
    :min="1"
    :max="2">
    <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
  </el-checkbox-group>
</template>
<script>
  const cityOptions = ['上海', '北京', '广州', '深圳'];
  export default {
    data() {
      return {
        checkedCities: ['上海', '北京'],
        cities: cityOptions
      };
    }
  };
</script>
```

:::

### 按钮样式

使用 `el-checkbox-button` 实现按钮形态多选组，支持 `large`/`medium`/`small`/`mini` 四种尺寸。

:::demo
```html
<el-row :gutter="20" class="mgb-10">
  <el-col :span="12">
    <div class="component-content-title mgb-10">large（默认）</div>
    <el-checkbox-group v-model="checkboxGroup1">
      <el-checkbox-button v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox-button>
    </el-checkbox-group>
  </el-col>
  <el-col :span="12">
    <div class="component-content-title mgb-10">medium</div>
    <el-checkbox-group v-model="checkboxGroup2" size="medium">
      <el-checkbox-button v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox-button>
    </el-checkbox-group>
  </el-col>
</el-row>
<el-row :gutter="20" class="mgb-10">
  <el-col :span="12">
    <div class="component-content-title mgb-10">small + 禁用项</div>
    <el-checkbox-group v-model="checkboxGroup3" size="small">
      <el-checkbox-button v-for="city in cities" :label="city" :disabled="city === '北京'" :key="city">{{city}}</el-checkbox-button>
    </el-checkbox-group>
  </el-col>
  <el-col :span="12">
    <div class="component-content-title mgb-10">mini + 整组禁用</div>
    <el-checkbox-group v-model="checkboxGroup4" size="mini" disabled>
      <el-checkbox-button v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox-button>
    </el-checkbox-group>
  </el-col>
</el-row>

<script>
const cityOptions = ['上海', '北京', '广州', '深圳']
export default {
  data() {
    return {
      checkboxGroup1: ['上海'],
      checkboxGroup2: ['上海'],
      checkboxGroup3: ['上海'],
      checkboxGroup4: ['上海'],
      cities: cityOptions
    }
  }
}
</script>
```
:::

### 带有边框

添加 `border` 属性渲染带边框多选框，支持尺寸、禁用、组合使用。添加 `border` 属性渲染带边框多选框，支持尺寸、禁用、组合使用。

:::demo
```html
<el-row :gutter="20" class="mgb-10">
  <el-col :span="12">
    <div class="component-content-title mgb-10">默认尺寸</div>
    <el-checkbox v-model="checked1" label="选项1" border></el-checkbox>
    <el-checkbox v-model="checked2" label="选项2" border></el-checkbox>
  </el-col>
  <el-col :span="12">
    <div class="component-content-title mgb-10">medium 尺寸</div>
    <el-checkbox v-model="checked3" label="选项1" border size="medium"></el-checkbox>
    <el-checkbox v-model="checked4" label="选项2" border size="medium"></el-checkbox>
  </el-col>
</el-row>
<el-row :gutter="20" class="mgb-10">
  <el-col :span="12">
    <div class="component-content-title mgb-10">small 尺寸 + 禁用</div>
    <el-checkbox-group v-model="checkboxGroup1" size="small">
      <el-checkbox label="选项1" border></el-checkbox>
      <el-checkbox label="选项2" border disabled></el-checkbox>
    </el-checkbox-group>
  </el-col>
  <el-col :span="12">
    <div class="component-content-title mgb-10">mini 尺寸 + 整组禁用</div>
    <el-checkbox-group v-model="checkboxGroup2" size="mini" disabled>
      <el-checkbox label="选项1" border></el-checkbox>
      <el-checkbox label="选项2" border></el-checkbox>
    </el-checkbox-group>
  </el-col>
</el-row>

<script>
export default {
  data() {
    return {
      checked1: true,
      checked2: false,
      checked3: false,
      checked4: true,
      checkboxGroup1: [],
      checkboxGroup2: ['选项1']
    }
  }
}
</script>
```
:::

### 卡片

添加 `card` 属性渲染卡片式多选框，支持 `desc` 描述文案，视觉醒目，适合配置选择场景。

:::demo
```html
<el-row :gutter="20" class="mgb-10">
  <el-col :span="12">
    <div class="component-content-title mgb-10">基础卡片</div>
    <el-checkbox v-model="checkbox2" label="1" card>主标题</el-checkbox>
    <el-checkbox v-model="checkbox2" label="2" card>主标题</el-checkbox>
  </el-col>
  <el-col :span="12">
    <div class="component-content-title mgb-10">卡片 + 描述文案</div>
    <el-checkbox v-model="checkbox1" label="1" card desc="辅助描述信息">主标题</el-checkbox>
    <el-checkbox v-model="checkbox1" label="2" card desc="辅助描述信息">主标题</el-checkbox>
  </el-col>
</el-row>
<el-row :gutter="20" class="mgb-10">
  <el-col :span="12">
    <div class="component-content-title mgb-10">卡片组 + 禁用项</div>
    <el-checkbox-group v-model="checkbox3">
      <el-checkbox label="1" card>选项1</el-checkbox>
      <el-checkbox label="2" card disabled>选项2（禁用）</el-checkbox>
    </el-checkbox-group>
  </el-col>
  <el-col :span="12">
    <div class="component-content-title mgb-10">整组禁用</div>
    <el-checkbox-group v-model="checkbox4" disabled>
      <el-checkbox label="1" card desc="描述信息">主标题</el-checkbox>
      <el-checkbox label="2" card desc="描述信息">主标题</el-checkbox>
    </el-checkbox-group>
  </el-col>
</el-row>

<script>
export default {
  data() {
    return {
      checkbox1: ['1'],
      checkbox2: ['1'],
      checkbox3: ['1'],
      checkbox4: ['1']
    }
  }
}
</script>
```
:::


### 带有填充

添加 `button` 属性实现填充风格多选框，简洁紧凑，适合表单内联展示。

:::demo
```html
<el-row :gutter="20" class="mgb-10">
  <el-col :span="12">
    <div class="component-content-title mgb-10">默认尺寸</div>
    <el-checkbox v-model="checked1" label="选项1" button></el-checkbox>
    <el-checkbox v-model="checked2" label="选项2" button></el-checkbox>
  </el-col>
  <el-col :span="12">
    <div class="component-content-title mgb-10">medium 尺寸</div>
    <el-checkbox v-model="checked3" label="选项1" button size="medium"></el-checkbox>
    <el-checkbox v-model="checked4" label="选项2" button size="medium"></el-checkbox>
  </el-col>
</el-row>
<el-row :gutter="20" class="mgb-10">
  <el-col :span="12">
    <div class="component-content-title mgb-10">small 尺寸 + 禁用</div>
    <el-checkbox-group v-model="checkboxGroup1" size="small">
      <el-checkbox label="选项1" button></el-checkbox>
      <el-checkbox label="选项2" button disabled></el-checkbox>
    </el-checkbox-group>
  </el-col>
  <el-col :span="12">
    <div class="component-content-title mgb-10">mini 尺寸 + 整组禁用</div>
    <el-checkbox-group v-model="checkboxGroup2" size="mini" disabled>
      <el-checkbox label="选项1" button></el-checkbox>
      <el-checkbox label="选项2" button></el-checkbox>
    </el-checkbox-group>
  </el-col>
</el-row>

<script>
export default {
  data() {
    return {
      checked1: true,
      checked2: false,
      checked3: false,
      checked4: true,
      checkboxGroup1: [],
      checkboxGroup2: ['选项1']
    }
  }
}
</script>
```
:::

### Checkbox Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| value / v-model | 绑定值 | string / number / boolean | — | — |
| label     | 选中状态的值（只有在`checkbox-group`或者绑定对象类型为`array`时有效）| string / number / boolean  |       —        |     —    |
| true-label | 选中时的值   | string / number | — |     —    |
| false-label | 没有选中时的值   | string / number    |      —         |     —    |
| disabled  | 是否禁用    | boolean   |  — | false   |
| border  | 是否显示边框按钮样式	  | boolean   | — | false   |
| button  | 是否显示填充按钮样式	    | boolean   |  — | false   |
| card  | 是否显示卡片按钮样式  | boolean   | — | false   |
| checkbox  | 卡片按钮是否显示单选按钮样式  | boolean   | — | false   |
| desc  | 卡片按钮内容描述  | string   | — | -   |
| size  | Checkbox 的尺寸，仅在 border 为真时有效  | string  | medium / small / mini | — |
| name | 原生 name 属性 | string    |      —         |     —    |
| checked  | 当前是否勾选    | boolean   |  — | false   |
| indeterminate  | 设置 indeterminate 状态，只负责样式控制    | boolean   |  — | false   |

### Checkbox Events
| 事件名称      | 说明    | 回调参数      |
|---------- |-------- |---------- |
| change  | 当绑定值变化时触发的事件 | 更新后的值 |

### Checkbox-group Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| value / v-model | 绑定值 | array | — | — |
| size     | 多选框组尺寸，仅对按钮形式的 Checkbox 或带有边框的 Checkbox 有效   | string  | medium / small / mini  |    —     |
| disabled  | 是否禁用    | boolean   | — | false   |
| min     | 可被勾选的 checkbox 的最小数量   | number    |       —        |     —    |
| max     | 可被勾选的 checkbox 的最大数量   | number    |       —        |     —    |
| text-color  | 按钮形式的 Checkbox 激活时的文本颜色    | string   | — | #2F48FF   |
| border-color  | 按钮形式的 Checkbox 激活时的边框色    | string   | — | #2F48FF   |
| fill  | 按钮形式的 Checkbox 激活时的填充色    | string   | — | #ffffff   |
| gap  | 每个 Checkbox 之间的间距（px）    | number   | — | 32   |

### Checkbox-group Events
| 事件名称      | 说明    | 回调参数      |
|---------- |-------- |---------- |
| change  | 当绑定值变化时触发的事件 | 更新后的值 |

### Checkbox-button Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| label     | 选中状态的值（只有在`checkbox-group`或者绑定对象类型为`array`时有效）| string / number / boolean  |       —        |     —    |
| true-label | 选中时的值   | string / number | — |     —    |
| false-label | 没有选中时的值   | string / number    |      —         |     —    |
| disabled  | 是否禁用    | boolean   |  — | false   |
| name | 原生 name 属性 | string    |      —         |     —    |
| checked  | 当前是否勾选    | boolean   |  — | false   |
