## Icon 图标

提供了一套常用的图标集合。

### 使用方法

直接通过设置类名为 `el-icon-iconName` 来使用即可。例如：

:::demo
```html
<i class="el-icon-edit"></i>
<i class="el-icon-share"></i>
<i class="el-icon-delete"></i>
<el-button type="primary" icon="el-icon-search">搜索</el-button>

```
:::

### 图标集合

<ul class="icon-list">
  <li v-for="name in $icon" :key="name">
    <span>
      <i :class="'el-icon-' + name"></i>
      <span class="icon-name">{{'el-icon-' + name}}</span>
    </span>
  </li>
</ul>

### Iov Design 图标

#### 使用方法

直接通过设置类名为 `iov-icon-iconName` 来使用即可。例如：

:::demo
```html
<i class="iov-icon-arrow-prev"/>
<i class="iov-icon-plus"/>
<el-button type="primary" icon="iov-icon-search">搜索</el-button>
```
:::

#### 线性风格

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
  <li v-for="name in $iovDesignTips" :key="name">
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

#### 实底风格

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
