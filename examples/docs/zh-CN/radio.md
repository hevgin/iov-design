## Radio 单选框

在一组备选项中进行**单选**，选项互斥，适合选项较少的场景。

:::tip 提示
若选项过多（超过 5 个），建议使用 `Select` 选择器 以节省页面空间。
:::

### 基础用法

使用 `v-model` 绑定选中值，选中后变量值等于对应 `label`。`label` 支持 `String` / `Number` / `Boolean` 类型。

:::demo 
```html
<el-row :gutter="20">
  <el-col :span="12">
    <el-radio v-model="radio" label="1">选项一</el-radio>
    <el-radio v-model="radio" label="2">选项二</el-radio>
  </el-col>
</el-row>

<script>
export default {
  data() {
    return {
      radio: '1'
    }
  }
}
</script>
```
:::

### 禁用状态

添加 `disabled` 属性即可禁用单选框，禁用后不可点击、不可修改。

:::demo 
```html
<el-row :gutter="20">
  <el-col :span="12">
    <el-radio disabled v-model="radio" label="禁用">未选中禁用</el-radio>
    <el-radio disabled v-model="radio" label="选中且禁用">选中禁用</el-radio>
  </el-col>
</el-row>

<script>
export default {
  data() {
    return {
      radio: '选中且禁用'
    }
  }
}
</script>
```
:::

### 单选框组

使用 `el-radio-group` 包裹实现互斥单选组，统一绑定 `v-model`，支持 `change` 事件监听值变化。

:::demo 

```html
<el-row :gutter="20">
  <el-col :span="12">
    <el-radio-group v-model="radio">
      <el-radio :label="3">选项 3</el-radio>
      <el-radio :label="6">选项 6</el-radio>
      <el-radio :label="9">选项 9</el-radio>
    </el-radio-group>
  </el-col>
</el-row>

<script>
export default {
  data() {
    return {
      radio: 3
    }
  }
}
</script>
```
:::

### 按钮样式

使用 `el-radio-button` 实现按钮形态单选组，支持 `size` 尺寸控制。

:::demo 
```html
<el-row :gutter="20" class="mgb-10">
  <el-col :span="12">
    <div class="component-content-title mgb-10">large（默认）</div>
    <el-radio-group v-model="radio1">
      <el-radio-button label="上海"></el-radio-button>
      <el-radio-button label="北京"></el-radio-button>
      <el-radio-button label="广州"></el-radio-button>
      <el-radio-button label="深圳"></el-radio-button>
    </el-radio-group>
  </el-col>
  <el-col :span="12">
    <div class="component-content-title mgb-10">medium</div>
    <el-radio-group v-model="radio2" size="medium">
      <el-radio-button label="上海"></el-radio-button>
      <el-radio-button label="北京"></el-radio-button>
      <el-radio-button label="广州"></el-radio-button>
      <el-radio-button label="深圳"></el-radio-button>
    </el-radio-group>
  </el-col>
</el-row>
<el-row :gutter="20" class="mgb-10">
  <el-col :span="12">
    <div class="component-content-title mgb-10">small</div>
    <el-radio-group v-model="radio3" size="small">
      <el-radio-button label="上海"></el-radio-button>
      <el-radio-button label="北京" disabled></el-radio-button>
      <el-radio-button label="广州"></el-radio-button>
      <el-radio-button label="深圳"></el-radio-button>
    </el-radio-group>
  </el-col>
  <el-col :span="12">
    <div class="component-content-title mgb-10">mini</div>
    <el-radio-group v-model="radio4" disabled size="mini">
      <el-radio-button label="上海"></el-radio-button>
      <el-radio-button label="北京"></el-radio-button>
      <el-radio-button label="广州"></el-radio-button>
      <el-radio-button label="深圳"></el-radio-button>
    </el-radio-group>
  </el-col>
</el-row>

<script>
export default {
  data() {
    return {
      radio1: '上海',
      radio2: '上海',
      radio3: '上海',
      radio4: '上海'
    }
  }
}
</script>
```
:::

### 带有边框

添加 `border` 属性渲染带边框的单选框，支持尺寸与禁用。

:::demo 
```html
<el-row :gutter="20" class="mgb-10">
  <el-col :span="12">
    <div class="component-content-title mgb-10">默认尺寸</div>
    <el-radio v-model="radio1" label="1" border>选项一</el-radio>
    <el-radio v-model="radio1" label="2" border>选项二</el-radio>
  </el-col>
  <el-col :span="12">
    <div class="component-content-title mgb-10">medium 尺寸</div>
    <el-radio v-model="radio2" label="1" border size="medium">选项一</el-radio>
    <el-radio v-model="radio2" label="2" border size="medium">选项二</el-radio>
  </el-col>
</el-row>
<el-row :gutter="20" class="mgb-10">
  <el-col :span="12">
    <div class="component-content-title mgb-10">small 尺寸 + 禁用</div>
    <el-radio-group v-model="radio3" size="small">
      <el-radio label="1" border>选项一</el-radio>
      <el-radio label="2" border disabled>选项二</el-radio>
    </el-radio-group>
  </el-col>
  <el-col :span="12">
    <div class="component-content-title mgb-10">mini 尺寸 + 整组禁用</div>
    <el-radio-group v-model="radio4" size="mini" disabled>
      <el-radio label="1" border>选项一</el-radio>
      <el-radio label="2" border>选项二</el-radio>
    </el-radio-group>
  </el-col>
</el-row>

<script>
export default {
  data() {
    return {
      radio1: '1',
      radio2: '1',
      radio3: '1',
      radio4: '1'
    }
  }
}
</script>
```
:::


### 卡片

添加 `card` 属性渲染卡片形态单选框，支持 `desc` 描述文案，视觉更醒目

:::demo 
```html
<el-row :gutter="20" class="mgb-10">
  <el-col :span="12">
    <div class="component-content-title mgb-10">基础卡片</div>
    <el-radio v-model="radio1" label="1" card>主标题</el-radio>
    <el-radio v-model="radio1" label="2" card>主标题</el-radio>
  </el-col>
  <el-col :span="12">
    <div class="component-content-title mgb-10">卡片 + 描述文案</div>
    <el-radio v-model="radio2" label="1" card desc="这是一段辅助描述信息">主标题</el-radio>
    <el-radio v-model="radio2" label="2" card desc="这是一段辅助描述信息">主标题</el-radio>
  </el-col>
</el-row>
<el-row :gutter="20" class="mgb-10">
  <el-col :span="12">
    <div class="component-content-title mgb-10">卡片组 + 禁用项</div>
    <el-radio-group v-model="radio3">
      <el-radio label="1" card>选项一</el-radio>
      <el-radio label="2" card disabled>选项二（禁用）</el-radio>
    </el-radio-group>
  </el-col>
  <el-col :span="12">
    <div class="component-content-title mgb-10">整组禁用</div>
    <el-radio-group v-model="radio4" disabled>
      <el-radio label="1" card desc="描述信息">主标题</el-radio>
      <el-radio label="2" card desc="描述信息">主标题</el-radio>
    </el-radio-group>
  </el-col>
</el-row>

<script>
export default {
  data() {
    return {
      radio1: '1',
      radio2: '1',
      radio3: '1',
      radio4: '1'
    }
  }
}
</script>
```
:::


### 带有填充

添加 button 属性实现填充风格单选框，简洁紧凑，适合表单内联场景。

:::demo 
```html
<el-row :gutter="20" class="mgb-10">
  <el-col :span="12">
    <div class="component-content-title mgb-10">默认尺寸</div>
    <el-radio v-model="radio1" label="1" button>选项一</el-radio>
    <el-radio v-model="radio1" label="2" button>选项二</el-radio>
    <el-radio v-model="radio1" label="3" button disabled>选项三</el-radio>
  </el-col>
  <el-col :span="12">
    <div class="component-content-title mgb-10">medium 尺寸</div>
    <el-radio v-model="radio2" label="1" button size="medium">选项一</el-radio>
    <el-radio v-model="radio2" label="2" button size="medium">选项二</el-radio>
    <el-radio v-model="radio2" label="3" button size="medium" disabled>选项三</el-radio>
  </el-col>
</el-row>
<el-row :gutter="20" class="mgb-10">
  <el-col :span="12">
    <div class="component-content-title mgb-10">small 尺寸</div>
    <el-radio-group v-model="radio3" size="small">
      <el-radio label="1" button>选项一</el-radio>
      <el-radio label="2" button disabled>选项二</el-radio>
    </el-radio-group>
  </el-col>
  <el-col :span="12">
    <div class="component-content-title mgb-10">mini 尺寸 + 整组禁用</div>
    <el-radio-group v-model="radio4" size="mini" disabled>
      <el-radio label="1" button>选项一</el-radio>
      <el-radio label="2" button>选项二</el-radio>
    </el-radio-group>
  </el-col>
</el-row>

<script>
export default {
  data() {
    return {
      radio1: '1',
      radio2: '1',
      radio3: '1',
      radio4: '1'
    }
  }
}
</script>
```
:::

### Radio Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| value / v-model | 绑定值 | string / number / boolean | — | — |
| label     | Radio 的 value   | string / number / boolean    |       —        |      —   |
| disabled  | 是否禁用    | boolean   | — | false   |
| border  | 是否显示边框按钮样式  | boolean   | — | false   |
| button  | 是否显示填充按钮样式  | boolean   | — | false   |
| card  | 是否显示卡片按钮样式  | boolean   | — | false   |
| radio  | 卡片按钮是否显示单选按钮样式  | boolean   | — | false   |
| desc  | 卡片按钮内容描述  | string   | — | -   |
| size  | Radio 的尺寸，仅在 border 为真时有效  | string  | medium / small / mini | — |
| name | 原生 name 属性 | string    |      —         |     —    |

### Radio Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| input  | 绑定值变化时触发的事件 |  选中的 Radio label 值  |

### Radio-group Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| value / v-model | 绑定值 | string / number / boolean | — | — |
| size     | 单选框组尺寸，仅对按钮形式的 Radio 或带有边框的 Radio 有效   | string  | medium / small / mini |    —     |
| disabled  | 是否禁用    | boolean   | — | false   |
| text-color  | 按钮形式的 Radio 激活时的文本颜色    | string   | — | #2F48FF   |
| border-color  | 按钮形式的 Radio 激活时的边框色    | string   | — | #2F48FF   |
| fill  | 按钮形式的 Radio 激活时的填充色    | string   | — | #FFFFFF   |

### Radio-group Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| input  | 绑定值变化时触发的事件 |  选中的 Radio label 值  |

### Radio-button Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| label     | Radio 的 value  | string / number  |        —       |     —    |
| disabled  | 是否禁用    | boolean   | — | false   |
| name | 原生 name 属性 | string    |      —         |     —    |
