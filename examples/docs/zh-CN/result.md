## Result 结果

用于页面操作完成、异常状态、系统反馈等场景，以**图标 + 标题 + 副标题 + 操作按钮**的组合形式，清晰告知用户当前结果状态，提升操作闭环体验。

### 基础用法

内置 `success` / `warning` / `error` / `info` 四种标准状态，通过 `icon` 属性快速启用；`title` 为主标题，`sub-title` 为副标题，`extra` 插槽用于放置操作按钮。

:::demo

```html
<el-row>
  <el-col :sm="12" :lg="6">
    <el-result icon="success" title="成功提示" subTitle="请根据提示进行操作">
      <template slot="extra">
        <el-button type="primary" size="medium">返回</el-button>
      </template>
    </el-result>
  </el-col>
  <el-col :sm="12" :lg="6">
    <el-result icon="warning" title="警告提示" subTitle="请根据提示进行操作">
      <template slot="extra">
        <el-button type="primary" size="medium">返回</el-button>
      </template>
    </el-result>
  </el-col>
  <el-col :sm="12" :lg="6">
    <el-result icon="error" title="错误提示" subTitle="请根据提示进行操作">
      <template slot="extra">
        <el-button type="primary" size="medium">返回</el-button>
      </template>
    </el-result>
  </el-col>
  <el-col :sm="12" :lg="6">
    <el-result icon="info" title="信息提示" subTitle="请根据提示进行操作">
      <template slot="extra">
        <el-button type="primary" size="medium">返回</el-button>
      </template>
    </el-result>
  </el-col>
</el-row>
```

:::

### 自定义内容

支持完全自定义：
- `icon` 插槽：替换自带图标，支持图片、自定义组件
- `title` / `sub-title`：自定义文案
- `extra` 插槽：自定义操作按钮组

:::demo

```html
<el-result title="404" subTitle="抱歉，请求错误">
  <template slot="icon">
    <el-image src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"></el-image>
  </template>
  <template slot="extra">
    <el-button type="primary" size="medium">返回</el-button>
  </template>
</el-result>
```

:::

### Result Attributes

| 参数          | 说明            | 类型            | 可选值                 | 默认值   |
|-------------  |---------------- |---------------- |---------------------- |-------- |
| title          | 标题         | string  |          —             |    —     |
| sub-title    | 二级标题  | string | — |    —  |
| icon  | 图标类型    | string  |    success / warning / info / error  |  info |

### Result Slots

| Name | 说明 |
|------|--------|
| icon | 自定义图标  |
| title | 自定义标题     |
| subTitle | 自定义二级标题     |
| extra | 自定义底部额外区域     |
