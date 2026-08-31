## Link 文字链接

文字超链接

### 基础用法
基础的文字链接用法。
:::demo
```html
<div>
  <el-link href="https://element.eleme.io" target="_blank">默认链接</el-link>
  <el-link type="primary">主要链接</el-link>
  <el-link type="success">成功链接</el-link>
  <el-link type="warning">警告链接</el-link>
  <el-link type="danger">危险链接</el-link>
  <el-link type="gold">信息链接</el-link>
  <el-link type="blue">信息链接</el-link>
  <el-link type="purple">信息链接</el-link>
  <el-link type="pink">信息链接</el-link>
  <el-link type="mauve">信息链接</el-link>
  <el-link type="salmon">信息链接</el-link>
  <el-link type="grey">信息链接</el-link>
  <el-link type="darkblue">信息链接</el-link>
</div>
```
:::

### 文本样式
:::demo
```html
<div>
  <el-link text>默认链接</el-link>
  <el-link text type="primary">主要链接</el-link>
  <el-link text type="success">成功链接</el-link>
  <el-link text type="warning">警告链接</el-link>
  <el-link text type="danger">危险链接</el-link>
  <el-link text type="gold">信息链接</el-link>
  <el-link text type="blue">信息链接</el-link>
  <el-link text type="purple">信息链接</el-link>
  <el-link text type="pink">信息链接</el-link>
  <el-link text type="mauve">信息链接</el-link>
  <el-link text type="salmon">信息链接</el-link>
  <el-link text type="grey">信息链接</el-link>
  <el-link text type="darkblue">信息链接</el-link>
</div>
```
:::

### 禁用状态
配置`disabled`表示文字链接不可用状态。
:::demo
```html
<div>
  <el-link disabled>默认链接</el-link>
  <el-link type="primary" disabled>主要链接</el-link>
  <el-link type="success" disabled>成功链接</el-link>
  <el-link type="warning" disabled>警告链接</el-link>
  <el-link type="danger" disabled>危险链接</el-link>
  <el-link type="gold" disabled>信息链接</el-link>
  <el-link type="blue" disabled>信息链接</el-link>
  <el-link type="purple" disabled>信息链接</el-link>
  <el-link type="pink" disabled>信息链接</el-link>
  <el-link type="mauve" disabled>信息链接</el-link>
  <el-link type="salmon" disabled>信息链接</el-link>
  <el-link type="grey" disabled>信息链接</el-link>
  <el-link type="darkblue" disabled>信息链接</el-link>
</div>
```
:::

### 下划线
配置`:underline=true`展示文字链接下划线。
:::demo
```html
<div>
  <el-link :underline="true">有下划线</el-link>
  <el-link>无下划线</el-link>
</div>
```
:::

### 图标

配置`icon`展示带图标的文字链接，可增强辨识度。

:::demo
```html
<div>
  <el-link icon="el-icon-edit">编辑</el-link>
  <el-link>查看<i class="el-icon-view el-icon--right"></i> </el-link>
</div>
```
:::

### Attributes

| 参数           | 说明                           | 类型      | 可选值                               | 默认值  |
| -------------- | ------------------------------ | --------- | ------------------------------------ | ------- |
| type           | 类型                   | string  | primary / success / warning / danger / info | default |
| underline      | 是否下划线                         | boolean | —                                    | false    |
| disabled       | 是否禁用状态                       | boolean | —                                    | false   |
| href           | 原生 href 属性                     | string  | —                                    | -       |
| icon           | 图标类名                       | string  | —                                    | -       |
| size           | 字体大小                       | large(16px)/medium(14px)/small(13px)/mini(12px)  | —                   | small    |
| text           | 是否文本样式                   | boolean  | - | false |
