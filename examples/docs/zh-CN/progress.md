## Progress 进度条

用于展示操作的实时进度，清晰告知用户当前执行状态与完成预期，支持线形、环形、仪表盘等多种展示形态，可自定义颜色、尺寸、文案样式，适配文件上传、任务加载、流程进度等各类场景。

### 线形进度条

Progress 组件必填 `percentage` 属性，用于定义进度百分比，取值范围 0-100；通过 `status` 属性快速设置预设状态（`success`/`warning`/`exception`），通过 `format` 属性自定义进度文案

:::demo 

```html
<el-progress :percentage="50"></el-progress>
<!-- 自定义进度文案 -->
<el-progress :percentage="100" :format="format"></el-progress>
<!-- 成功状态 -->
<el-progress :percentage="100" status="success"></el-progress>
<!-- 警告状态 -->
<el-progress :percentage="100" status="warning"></el-progress>
<!-- 异常状态 -->
<el-progress :percentage="50" status="exception"></el-progress>

<script>
  export default {
    methods: {
      // 自定义进度文案格式化函数
      format(percentage) {
        return percentage === 100 ? '满' : `${percentage}%`;
      }
    }
  };
</script>
```
:::

### 百分比内显

百分比不占用额外控件，适用于文件上传等场景。通过 `stroke-width` 设置进度条高度，`text-inside` 开启内显模式。

:::demo 

```html
<el-progress :text-inside="true" :stroke-width="26" :percentage="70"></el-progress>
<el-progress :text-inside="true" :stroke-width="24" :percentage="100" status="success"></el-progress>
<el-progress :text-inside="true" :stroke-width="22" :percentage="80" status="warning"></el-progress>
<el-progress :text-inside="true" :stroke-width="20" :percentage="50" status="exception"></el-progress>
```
:::

### 自定义颜色

通过 `color` 属性自定义进度条颜色，支持**颜色字符串**、**自定义函数**、**分段颜色数组** 三种用法，满足多样化视觉需求。

:::demo

```html
<!-- 固定颜色 -->
<el-progress :percentage="percentage" :color="customColor"></el-progress>
<!-- 函数动态配色 -->
<el-progress :percentage="percentage" :color="customColorMethod"></el-progress>
<!-- 分段渐变配色 -->
<el-progress :percentage="percentage" :color="customColors"></el-progress>
<div>
  <el-button-group>
    <el-button icon="el-icon-minus" @click="decrease"></el-button>
    <el-button icon="el-icon-plus" @click="increase"></el-button>
  </el-button-group>
</div>

<script>
  export default {
    data() {
      return {
        percentage: 20,
        customColor: '#409eff',
        customColors: [
          {color: '#f56c6c', percentage: 20},
          {color: '#e6a23c', percentage: 40},
          {color: '#5cb87a', percentage: 60},
          {color: '#1989fa', percentage: 80},
          {color: '#6f7ad3', percentage: 100}
        ]
      };
    },
    methods: {
      // 根据进度动态返回颜色
      customColorMethod(percentage) {
        if (percentage < 30) {
          return '#909399';
        } else if (percentage < 70) {
          return '#e6a23c';
        } else {
          return '#67c23a';
        }
      },
      increase() {
        this.percentage += 10;
        if (this.percentage > 100) {
          this.percentage = 100;
        }
      },
      decrease() {
        this.percentage -= 10;
        if (this.percentage < 0) {
          this.percentage = 0;
        }
      }
    }
  }
</script>
```
:::

### 环形进度条

设置 `type="circle"` 切换为环形进度条，`width` 属性可自定义环形尺寸，适配数据可视化、状态展示等场景。

:::demo

```html
<el-progress type="circle" :percentage="0"></el-progress>
<el-progress type="circle" :percentage="25"></el-progress>
<el-progress type="circle" :percentage="100" status="success"></el-progress>
<el-progress type="circle" :percentage="70" status="warning"></el-progress>
<el-progress type="circle" :percentage="50" status="exception"></el-progress>
```
:::

### 仪表盘形进度条

设置 `type="dashboard"` 切换为仪表盘形态，风格更简约现代，支持分段颜色、动态调整进度。

:::demo 

```html

<el-progress type="dashboard" :percentage="percentage" :color="colors"></el-progress>
<div>
  <el-button-group>
    <el-button icon="el-icon-minus" @click="decrease"></el-button>
    <el-button icon="el-icon-plus" @click="increase"></el-button>
  </el-button-group>
</div>

<script>
  export default {
    data() {
      return {
        percentage: 10,
        colors: [
          {color: '#f56c6c', percentage: 20},
          {color: '#e6a23c', percentage: 40},
          {color: '#5cb87a', percentage: 60},
          {color: '#1989fa', percentage: 80},
          {color: '#6f7ad3', percentage: 100}
        ]
      };
    },
    methods: {
      increase() {
        this.percentage += 10;
        if (this.percentage > 100) {
          this.percentage = 100;
        }
      },
      decrease() {
        this.percentage -= 10;
        if (this.percentage < 0) {
          this.percentage = 0;
        }
      }
    }
  }
</script>
```
:::

### Attributes
| 参数          | 说明            | 类型            | 可选值                 | 默认值   |
|-------------  |---------------- |---------------- |---------------------- |-------- |
| **percentage** | **百分比（必填）**   | number         |     0-100          |     0    |
| type          | 进度条类型           | string         | line/circle/dashboard | line |
| stroke-width  | 进度条的宽度，单位 px | number          | — | 6 |
| text-inside  | 进度条显示文字内置在进度条内（只在 type=line 时可用） | boolean | — | false |
| status  | 进度条当前状态 | string | success/exception/warning | — |
| color  | 进度条背景色（会覆盖 status 状态颜色） | string/function/array | — | '' |
| width  | 环形进度条画布宽度（只在 type 为 circle 或 dashboard 时可用） | number |  | 126 |
| show-text  | 是否显示进度条文字内容 | boolean | — | true |
| stroke-linecap  | circle/dashboard 类型路径两端的形状 | string | butt/round/square | round |
| format  | 指定进度条文字内容 | function(percentage) | — | — |
| define-back-color  | 指定进度条底色（支持 hex 格式） | string | — | — |
| text-color  | 指定进度条字体颜色（支持 hex 格式） | string | — | — |
