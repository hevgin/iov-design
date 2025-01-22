## Empty 空状态

空状态时的占位提示。

### 基础用法

:::demo

```html
<el-empty description="描述文字"></el-empty>
```
:::

### 自定义图片

通过设置 `image` 属性传入图片 URL。

:::demo

```html
<el-empty image="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"></el-empty>
```
:::

### 图片尺寸

通过设置 `image-size` 属性来控制图片大小。

:::demo

```html
<el-empty :image-size="200"></el-empty>
```
:::

### 底部内容

使用默认插槽可在底部插入内容。

:::demo
```html
<el-empty>
  <el-button type="primary">按钮</el-button>
</el-empty>
```
:::

### Empty Attributes
| 参数          | 说明            | 类型            | 可选值                 | 默认值   |
|-------------  |---------------- |---------------- |---------------------- |-------- |
| image          | 图片地址         | string  |          —             |    —     |
| image-size    | 图片大小（宽度）  | number | — |    160  |
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
