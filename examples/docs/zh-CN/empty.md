## Empty 空状态

用于页面、列表、模块无数据 / 无内容时的占位提示，提供友好的视觉反馈，支持自定义图片、尺寸和底部操作，提升空状态下的用户体验。

### 基础用法

最简洁的空状态展示，通过 `description` 设置提示文字，无需额外配置即可快速使用。

:::demo

```html
  <el-empty description="描述文字"></el-empty>
```
:::

### 图片类型

`type`为不同值展示不同图片。具体查下下方 type图片类型

:::demo
```html
<el-row :gutter="20">
  <el-col :span="12">
    <div class="component-content-title mgb-10 text-center">type值为0</div>
    <el-empty type="0" description="小容器暂无数据"></el-empty>
  </el-col>
  <el-col :span="12">
    <div class="component-content-title mgb-10 text-center">type值为1</div>
    <el-empty type="1" description="暂无数据"></el-empty>
  </el-col>
  <el-col :span="12">
    <div class="component-content-title mgb-10 text-center">type值为2</div>
    <el-empty type="2" description="内容未配置"></el-empty>
  </el-col>
  <el-col :span="12">
    <div class="component-content-title mgb-10 text-center">type值为3</div>
    <el-empty type="3" description="暂无权限"></el-empty>
  </el-col>
  <el-col :span="12">
    <div class="component-content-title mgb-10 text-center">type值为4</div>
    <el-empty type="4" description="页面不存在"></el-empty>
  </el-col>
  <el-col :span="12">
    <div class="component-content-title mgb-10 text-center">type值为5</div>
    <el-empty type="5" description="网络异常"></el-empty>
  </el-col>
  <el-col :span="12">
    <div class="component-content-title mgb-10 text-center">type值为6</div>
    <el-empty type="6" description="服务器出错"></el-empty>
  </el-col>
  <el-col :span="12">
    <div class="component-content-title mgb-10 text-center">type值为7</div>
    <el-empty type="7" description="正在施工"></el-empty>
  </el-col>
  <el-col :span="12">
    <div class="component-content-title mgb-10 text-center">type值为8</div>
    <el-empty type="8" description="浏览器版本过低"></el-empty>
  </el-col>
  <el-col :span="12">
    <div class="component-content-title mgb-10 text-center">type值为9</div>
    <el-empty type="9" description="暂无资源"></el-empty>
  </el-col>
</el-row>
```
:::



### 自定义图片

通过 `image` 属性传入图片 URL，替换默认空状态图标，适配业务专属视觉风格。

:::demo

```html
<el-empty image="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"></el-empty>
```
:::

### 图片尺寸

通过 `image-size` 属性设置图片宽度，高度按比例自动缩放，满足不同布局空间需求。

:::demo

```html
<el-empty :image-size="200"></el-empty>
```
:::

### 底部内容

使用默认插槽在空状态下方添加按钮、文字等操作区域，引导用户进行下一步行为（如新增、刷新、去创建等）

:::demo
```html
<el-empty>
  <el-button type="primary" round size="small" icon="iov-icon-plus">添加应用</el-button>
</el-empty>
```
:::

### Empty Attributes
| 参数          | 说明            | 类型            | 可选值                 | 默认值   |
|-------------  |---------------- |---------------- |---------------------- |-------- |
| image          | 图片地址         | string  |          —             |    —     |
| image-size    | 图片大小（宽度）  | number | — |    140  |
| description  | 文本描述    | string  |    —  |  — |
| type  | 图片类型    | number  |    -  |  1 |

### type图片类型
| 参数          | 说明            |
|-------------  |---------------- |
| 0          | 小容器暂无数据         |
| 1          | 暂无数据         |
| 2          | 内容未配置         |
| 3          | 暂无权限         |
| 4          | 页面不存在         |
| 5          | 网络异常         |
| 6          | 服务器出错         |
| 7          | 正在施工         |
| 8          | 浏览器版本过低         |
| 9          | 暂无资源         |

### Empty Slots

| Name | 说明 |
|------|--------|
| default | 自定义底部内容  |
| image | 自定义图片     |
| description | 自定义描述文字     |
