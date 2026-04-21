## Breadcrumb 面包屑

用于清晰展示当前页面的层级路径，支持快速跳转至路径中的任意上级页面，提升页面导航效率。

### 基础用法

最常用的基础面包屑，通过 el-breadcrumb 包裹 el-breadcrumb-item 定义每一级导航。
- `separator`：设置文本分隔符，仅支持字符串，默认值为 /
- 导航项支持路由跳转（to 属性）和原生链接（a 标签）两种方式

:::demo 

```html
<el-breadcrumb separator="/">
  <!-- 路由跳转：配合 Vue Router 使用 -->
  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
  <!-- 原生链接：使用 a 标签实现跳转 -->
  <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
  <el-breadcrumb-item>活动列表</el-breadcrumb-item>
  <el-breadcrumb-item>活动详情</el-breadcrumb-item>
</el-breadcrumb>
```
:::

### 图标分隔符

通过设置 `separator-class` 可使用相应的 `iconfont` 作为分隔符，注意这将使 `separator` 设置失效

:::demo 

```html
<el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>活动管理</el-breadcrumb-item>
  <el-breadcrumb-item>活动列表</el-breadcrumb-item>
  <el-breadcrumb-item>活动详情</el-breadcrumb-item>
</el-breadcrumb>
```
:::

### Breadcrumb Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| separator | 分隔符 | string | — | 斜杠'/' |
| separator-class | 图标分隔符 class | string | — | - |

### Breadcrumb Item Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| to        | 路由跳转对象，同 `vue-router` 的 `to` | string/object | — | — |
| replace   | 在使用 to 进行路由跳转时，启用 replace 将不会向 history 添加新记录 | boolean | — | false |
