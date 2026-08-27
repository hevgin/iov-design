## Iov Design 图标

提供了一套 IOV 定制图标，支持单色和多色两种模式。

### 使用方法

直接通过设置类名为 `iov-icon-iconName` 来使用即可。例如：

:::demo
```html
<i class="iov-icon-arrow-prev"/>
<i class="iov-icon-plus"/>
<el-button type="primary" icon="iov-icon-search">搜索</el-button>
```
:::

### 多色图标

通过 `el-svg-icon` 组件使用，支持 SVG 原始多色渲染：

<ul class="icon-list">
  <li v-for="name in $iovDesignMultiColor" :key="name">
    <span>
      <el-svg-icon :icon-class="name" />
    </span>
  </li>
</ul>

```html
<el-svg-icon icon-class="excel" />
<el-svg-icon icon-class="word" />
<el-svg-icon icon-class="pdf" />
<el-svg-icon icon-class="ppt" />
<el-svg-icon icon-class="img" />
<el-svg-icon icon-class="zip" />
<el-svg-icon icon-class="markdown" />
<el-svg-icon icon-class="video" />
<el-svg-icon icon-class="other" />
<el-svg-icon icon-class="img-fail" />
<el-svg-icon icon-class="img-placeholder" />
<el-svg-icon icon-class="clear" />
<el-svg-icon icon-class="clear-hover" />
<el-svg-icon icon-class="unfold" />
<el-svg-icon icon-class="fold" />
<el-svg-icon icon-class="flash" />
<el-svg-icon icon-class="text-color" />
<el-svg-icon icon-class="highlight-bg-color" />
```
### 线性风格

##### 方向指向类

<ul class="icon-list">
  <li v-for="name in $iovDesignLine" :key="name">
    <span>
      <i :class="'iov-icon-' + name"></i>
      <span class="icon-name">{{'iov-icon-' + name}}</span>
    </span>
  </li>
</ul>

##### 提示建议类

<ul class="icon-list">
  <li v-for="name in $iovDesignTips" :key="name">
    <span>
      <i :class="'iov-icon-' + name"></i>
      <span class="icon-name">{{'iov-icon-' + name}}</span>
    </span>
  </li>
</ul>

##### 交换按钮类

<ul class="icon-list">
  <li v-for="name in $iovDesignChangeBtn" :key="name">
    <span>
      <i :class="'iov-icon-' + name"></i>
      <span class="icon-name">{{'iov-icon-' + name}}</span>
    </span>
  </li>
</ul>

##### 编辑类

<ul class="icon-list">
  <li v-for="name in $iovDesignEdit" :key="name">
    <span>
      <i :class="'iov-icon-' + name"></i>
      <span class="icon-name">{{'iov-icon-' + name}}</span>
    </span>
  </li>
</ul>

##### 通用类

<ul class="icon-list">
  <li v-for="name in $iovDesignCommon" :key="name">
    <span>
      <i :class="'iov-icon-' + name"></i>
      <span class="icon-name">{{'iov-icon-' + name}}</span>
    </span>
  </li>
</ul>

##### 运算符类

<ul class="icon-list">
  <li v-for="name in $iovDesignOperation" :key="name">
    <span>
      <i :class="'iov-icon-' + name"></i>
      <span class="icon-name">{{'iov-icon-' + name}}</span>
    </span>
  </li>
</ul>

### 实底风格

##### 方向指向类

<ul class="icon-list">
  <li v-for="name in $iovDesignEntityDirection" :key="name">
    <span>
      <i :class="'iov-icon-' + name"></i>
      <span class="icon-name">{{'iov-icon-' + name}}</span>
    </span>
  </li>
</ul>

##### 提示建议类

<ul class="icon-list">
  <li v-for="name in $iovDesignEntityTips" :key="name">
    <span>
      <i :class="'iov-icon-' + name"></i>
      <span class="icon-name">{{'iov-icon-' + name}}</span>
    </span>
  </li>
</ul>

##### 交互按钮类

<ul class="icon-list">
  <li v-for="name in $iovDesignEntityButton" :key="name">
    <span>
      <i :class="'iov-icon-' + name"></i>
      <span class="icon-name">{{'iov-icon-' + name}}</span>
    </span>
  </li>
</ul>

##### 通用类

<ul class="icon-list">
  <li v-for="name in $iovDesignEntityCommon" :key="name">
    <span>
      <i :class="'iov-icon-' + name"></i>
      <span class="icon-name">{{'iov-icon-' + name}}</span>
    </span>
  </li>
</ul>

##### 货币符号

<ul class="icon-list">
  <li v-for="name in $iovCurrency" :key="name">
    <span>
      <i :class="'iov-icon-' + name"></i>
      <span class="icon-name">{{'iov-icon-' + name}}</span>
    </span>
  </li>
</ul>
