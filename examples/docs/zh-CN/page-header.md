## PageHeader 页头

适用于路径层级简单的页面，快速实现返回操作 + 页面标题展示；轻量替代面包屑组件，简化顶部导航布局。

### 基础

默认自带返回按钮，通过 `content` 属性设置页面主标题，点击返回按钮可触发 `back` 自定义事件，实现页面回退逻辑。

:::demo
```html
<el-page-header @back="goBack" content="详情页面">
</el-page-header>

<script>
  export default {
    methods: {
      goBack() {
        console.log('go back');
      }
    }
  }
</script>
```
:::

### Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |------------------------------ | ------ |
| title     | 标题           | string    |  —                            | 返回   |
| content   | 内容           | string    |  —                            | —      |


### Events
| 事件名称   | 说明           | 回调参数   |
|---------- |-------------- |---------- |
| back      | 点击左侧区域触发 | —        |

### Slots
| 事件名称    | 说明         |
|---------- |------------- |
| title     | 标题内容      |
| content   | 内容         |
