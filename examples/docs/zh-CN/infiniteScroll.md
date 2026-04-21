## InfiniteScroll 无限滚动

滚动至容器底部时，自动加载并渲染更多数据，适用于长列表、信息流等场景，提升页面加载性能与用户浏览体验。

### 基础用法
在要实现滚动加载的列表上上添加`v-infinite-scroll`，并赋值相应的加载方法（`overflow: auto/scroll`），可实现滚动到底部时自动执行加载方法。
:::demo
```html
<template>
  <ul class="infinite-list" v-infinite-scroll="load" style="overflow:auto">
    <li v-for="i in count" class="infinite-list-item">{{ i }}</li>
  </ul>
</template>

<script>
  export default {
    data () {
      return {
        count: 0
      }
    },
    methods: {
      load () {
        this.count += 2
      }
    }
  }
</script>
```
:::

### 禁用加载

通过 `infinite-scroll-disabled` 属性控制加载功能禁用，结合加载状态、数据是否耗尽，实现加载中禁止重复请求、无更多数据时停止加载的交互效果。

:::demo
```html
<template>
  <div class="infinite-list-wrapper" style="overflow:auto">
    <ul
      class="list"
      v-infinite-scroll="load"
      infinite-scroll-disabled="disabled">
      <li v-for="i in count" class="list-item">{{ i }}</li>
    </ul>
    <p v-if="loading">加载中...</p>
    <p v-if="noMore">没有更多了</p>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        count: 10,
        loading: false
      }
    },
    computed: {
      noMore () {
        return this.count >= 20
      },
      disabled () {
        return this.loading || this.noMore
      }
    },
    methods: {
      load () {
        this.loading = true
        setTimeout(() => {
          this.count += 2
          this.loading = false
        }, 2000)
      }
    }
  }
</script>
```
:::


### Attributes

| 参数           | 说明                           | 类型      | 可选值                               | 默认值  |
| -------------- | ------------------------------ | --------- | ------------------------------------ | ------- |
| infinite-scroll-disabled | 是否禁用           | boolean      | - |false |
| infinite-scroll-delay   | 节流时延，单位为ms   | number       |   - |200   |
| infinite-scroll-distance| 触发加载的距离阈值，单位为px | number   |- |0 |
| infinite-scroll-immediate | 是否立即执行加载方法，以防初始状态下内容无法撑满容器。| boolean | - |true |
