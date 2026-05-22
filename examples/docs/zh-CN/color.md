<script>
  import bus from '../../bus';
  import { tintColor } from '../../color.js';
  import { ACTION_USER_CONFIG_UPDATE } from '../../components/theme/constant.js';
  const varMap = {
    'primary': '$--color-primary',
    'success': '$--color-success',
    'warning': '$--color-warning',
    'danger': '$--color-danger',
    'info': '$--color-info',
    'white': '$--color-white',
    'black': '$--color-black',
    'textPrimary': '$--color-text-primary',
    'textRegular': '$--color-text-regular',
    'textSecondary': '$--color-text-secondary',
    'textPlaceholder': '$--color-text-placeholder',
    'borderBase': '$--border-color-base',
    'borderLight': '$--border-color-light',
    'borderLighter': '$--border-color-lighter',
    'borderExtraLight': '$--border-color-extra-light'
  };
  const original = {
    primary: '#409EFF',
    success: '#67C23A',
    warning: '#E6A23C',
    danger: '#F56C6C',
    info: '#909399',
    white: '#FFFFFF',
    black: '#000000',
    textPrimary: '#303133',
    textRegular: '#606266',
    textSecondary: '#909399',
    textPlaceholder: '#C0C4CC',
    borderBase: '#DCDFE6',
    borderLight: '#E4E7ED',
    borderLighter: '#EBEEF5',
    borderExtraLight: '#F2F6FC'
  }
  export default {
    created() {
      bus.$on(ACTION_USER_CONFIG_UPDATE, this.setGlobal);
    },
    mounted() {
      this.setGlobal();
    },
    methods: {
      tintColor(color, tint) {
        return tintColor(color, tint);
      },
      setGlobal() {
        if (window.userThemeConfig) {
          this.global = window.userThemeConfig.global;
        }
      },
      copyText(text) {
        navigator.clipboard.writeText(`$--color-${text}`).then(() => {
          this.$message({
            message: '复制成功',
            type: 'success'
          });
        }).catch(() => {
          this.$message({
            message: '复制失败',
            type: 'error'
          });
        });
      }
    },
    data() {
      return {
        global: {},
        primary: '',
        success: '',
        warning: '',
        danger: '',
        info: '',
        white: '',
        black: '',
        textPrimary: '',
        textRegular: '',
        textSecondary: '',
        textPlaceholder: '',
        borderBase: '',
        borderLight: '',
        borderLighter: '',
        borderExtraLight: '',
        // iovDesignPrimary: '#3F57FF',
        iovDesingPrimarys: [
          { color: '#F0F4FD', label: 'primary-1', desc: '警告提示背景/下拉菜单选中' },
          { color: '#E6ECFE', label: 'primary-2', desc: '边框禁用/TAB选中/日期范围背景' },
          { color: '#C0CDFF', label: 'primary-3', desc: '按钮的图标文字禁用/次要描边' },
          { color: '#8399FF', label: 'primary-4', desc: '特殊场景' },
          { color: '#6179FF', label: 'primary-5', desc: '悬停色' },
          { color: '#3F57FF', label: 'primary-6', desc: '基色/常规' },
          { color: '#2735D2', label: 'primary-7', desc: '点击色' },
        ],
        iovDesignLine: [
          { color: '#EDEFF3', label: 'line-1', desc: '分割线/表格、列表分割线' },
          { color: '#DCDFE6', label: 'line-2', desc: '输入控件描边、文字按钮分割、按钮描边' },
          { color: '#D2D5DF', label: 'line-3', desc: '单选、复选框/树结构符号' },
          { color: '#C3C7D1', label: 'line-4', desc: '灰背景下的分割线/流程引导线' },
          { color: '#E9EBF0', label: 'line-5', desc: '大型数据展示模块描边' },
        ],
        iovDesignFill: [
          { color: '#FFFFFF', label: 'fill-white', desc: '白色填充' },
          { color: '#F6F7F8', label: 'fill-1', desc: '按钮背景/表头/下拉菜单、表格悬停色/输入控件禁用背景' },
          { color: '#F2F3F5', label: 'fill-2', desc: '标签背景/输入框、选择器背景/图标按钮背景' },
          { color: '#E5E6EB', label: 'fill-3', desc: '灰背景下的标签背景、按钮悬停色' },
          { color: '#ABAFB5', label: 'fill-4', desc: '表头图标、解释说明、按钮图标禁用' },
          { color: '#777D87', label: 'fill-5', desc: '输入控件图标色' },
          { color: '#494B53', label: 'fill-6', desc: '灰背景下图标色' },
          { color: '#212026', label: 'fill-7', desc: '深色图标色' },
          { color: '#0D1722', label: 'fill-8', desc: '深色按钮背景色' },
        ],
        iovDesignText: [
          { color: '#C6C7CA', label: 'text-1', desc: '默认文案' },
          { color: '#A2A3AA', label: 'text-2', desc: '文字禁用/提示文案' },
          { color: '#6B707A', label: 'text-3', desc: 'TABS未选中/已输入禁用' },
          { color: '#65677A', label: 'text-4', desc: 'lebal字色/图表标题' },
          { color: '#3D4158', label: 'text-5', desc: '表头文字/TABS选中/面包屑选中' },
          { color: '#212026', label: 'text-6', desc: '按钮文字/正文' },
          { color: '#0D1722', label: 'text-7', desc: '楼层标题/导航菜单选中/TABS' },
        ],
        iovDesignWarning: [
          { color: '#FFF7E8', label: 'warning-1', desc: '浅色/白底悬停' },
          { color: '#FFE4BA', label: 'warning-2', desc: '文字禁用' },
          { color: '#FFCF8B', label: 'warning-3', desc: '一般禁用' },
          { color: '#FFB65D', label: 'warning-4', desc: '特殊场景' },
          { color: '#FF9A2E', label: 'warning-5', desc: '悬停色' },
          { color: '#FF7D00', label: 'warning-6', desc: '常规' },
          { color: '#D25F00', label: 'warning-7', desc: '点击色' },
        ],
        iovDesignSuccess: [
          { color: '#EFF9F3', label: 'success-1', desc: '浅色/白底悬停' },
          { color: '#B8F0C7', label: 'success-2', desc: '文字禁用' },
          { color: '#8CE0A5', label: 'success-3', desc: '一般禁用' },
          { color: '#65D189', label: 'success-4', desc: '特殊场景' },
          { color: '#42C170', label: 'success-5', desc: '悬停色' },
          { color: '#23B25D', label: 'success-6', desc: '常规' },
          { color: '#17994F', label: 'success-7', desc: '点击色' },
        ],
        iovDesignError: [
          { color: '#FFF1F1', label: 'danger-1', desc: '浅色/白底悬停' },
          { color: '#FDCDC5', label: 'danger-2', desc: '文字禁用' },
          { color: '#FBACA3', label: 'danger-3', desc: '一般禁用' },
          { color: '#F98981', label: 'danger-4', desc: '特殊场景' },
          { color: '#F76560', label: 'danger-5', desc: '悬停色' },
          { color: '#F53F3F', label: 'danger-6', desc: '常规' },
          { color: '#CB272D', label: 'danger-7', desc: '点击色' },
        ],
        iovDesignFailed: [
          { color: '#EFF3F7', label: 'grey-1', desc: '浅色/白底悬停' },
          { color: '#CED9E4', label: 'grey-2', desc: '文字禁用' },
          { color: '#B5BECA', label: 'grey-3', desc: '一般禁用' },
          { color: '#9CA4AF', label: 'grey-4', desc: '特殊场景' },
          { color: '#838A95', label: 'grey-5', desc: '悬停色' },
          { color: '#6B707A', label: 'grey-6', desc: '常规' },
          { color: '#49546F', label: 'grey-7', desc: '点击色' },
        ],
        iovDesignOther: [
          [
            { color: '#E8EFFF', label: 'Darkblue-1', desc: '' },
            { color: '#CAD9FF', label: 'Darkblue-2', desc: '' },
            { color: '#ADC1FF', label: 'Darkblue-3', desc: '' },
            { color: '#8FA7FF', label: 'Darkblue-4', desc: '' },
            { color: '#728CFF', label: 'Darkblue-5', desc: '' },
            { color: '#546EFF', label: 'Darkblue-6', desc: '' },
            { color: '#3446D2', label: 'Darkblue-7', desc: '' },
          ],
          [
            { color: '#E8F7FF', label: 'Blue-1', desc: '' },
            { color: '#BEE7FF', label: 'Blue-2', desc: '' },
            { color: '#94D4FF', label: 'Blue-3', desc: '' },
            { color: '#6ABEFF', label: 'Blue-4', desc: '' },
            { color: '#40A6FF', label: 'Blue-5', desc: '' },
            { color: '#168CFF', label: 'Blue-6', desc: '' },
            { color: '#0E69D2', label: 'Blue-7', desc: '' },
          ],
          [
            { color: '#FFFCE8', label: 'Gold-1', desc: '' },
            { color: '#FDF4BF', label: 'Gold-2', desc: '' },
            { color: '#FCE996', label: 'Gold-3', desc: '' },
            { color: '#FADC6D', label: 'Gold-4', desc: '' },
            { color: '#F9CC45', label: 'Gold-5', desc: '' },
            { color: '#F7BA1E', label: 'Gold-6', desc: '' },
            { color: '#CC9213', label: 'Gold-7', desc: '' },
          ],
          [
            { color: '#F5E8FF', label: 'Purple-1', desc: '' },
            { color: '#DDBEF6', label: 'Purple-2', desc: '' },
            { color: '#C396ED', label: 'Purple-3', desc: '' },
            { color: '#A871E3', label: 'Purple-4', desc: '' },
            { color: '#8D4EDA', label: 'Purple-5', desc: '' },
            { color: '#722ED1', label: 'Purple-6', desc: '' },
            { color: '#551DB0', label: 'Purple-7', desc: '' },
          ],
          [
            { color: '#F0E8FF', label: 'Mauve-1', desc: '' },
            { color: '#DDCEFF', label: 'Mauve-2', desc: '' },
            { color: '#C8B4FF', label: 'Mauve-3', desc: '' },
            { color: '#B29AFF', label: 'Mauve-4', desc: '' },
            { color: '#9980FF', label: 'Mauve-5', desc: '' },
            { color: '#8066FF', label: 'Mauve-6', desc: '' },
            { color: '#533FD2', label: 'Mauve-7', desc: '' },
          ],
          [
            { color: '#FFE8FB', label: 'Pink-1', desc: '' },
            { color: '#F7BAEF', label: 'Pink-2', desc: '' },
            { color: '#F08EE6', label: 'Pink-3', desc: '' },
            { color: '#E865DF', label: 'Pink-4', desc: '' },
            { color: '#E13EDB', label: 'Pink-5', desc: '' },
            { color: '#D91AD9', label: 'Pink-6', desc: '' },
            { color: '#B010B6', label: 'Pink-7', desc: '' },
          ],
          [
            { color: '#FFF1E8', label: 'Salmon-1', desc: '' },
            { color: '#FFDAC4', label: 'Salmon-2', desc: '' },
            { color: '#FFC0A1', label: 'Salmon-3', desc: '' },
            { color: '#FEA47D', label: 'Salmon-4', desc: '' },
            { color: '#FE8559', label: 'Salmon-5', desc: '' },
            { color: '#FE6536', label: 'Salmon-6', desc: '' },
            { color: '#D24521', label: 'Salmon-7', desc: '' },
          ]
        ],
      }
    },
    watch: {
      global: {
        immediate: true,
        handler(value) {
          Object.keys(original).forEach((o) => {
            if (value[varMap[o]]) {
              this[o] = value[varMap[o]]
            } else {
              this[o] = original[o]
            }
          });
        }
      }
    },
  }
</script>

## Color 色彩

Element 为了避免视觉传达差异，使用一套特定的调色板来规定颜色，为你所搭建的产品提供一致的外观视觉感受。

### 主色

Element 主要品牌颜色是鲜艳、友好的蓝色。

<el-row :gutter="12">
  <el-col :span="10" :xs="{span: 12}">
    <div class="demo-color-box" :style="{ background: primary }">Brand Color
      <div class="value">#409EFF</div>
      <div class="bg-color-sub" :style="{ background: tintColor(primary, 0.9) }">
        <div
          class="bg-blue-sub-item"
          v-for="(item, key) in Array(8)"
          :key="key"
          :style="{ background: tintColor(primary, (key + 1) / 10) }"
        ></div>
      </div>
    </div>
  </el-col>
</el-row>

### 辅助色

除了主色外的场景色，需要在不同的场景中使用（例如危险色表示危险的操作）。

<el-row :gutter="12">
  <el-col :span="6" :xs="{span: 12}">
    <div class="demo-color-box"
    :style="{ background: success }"
    >Success<div class="value">#67C23A</div>
      <div
        class="bg-color-sub"
      >
        <div
          class="bg-success-sub-item"
          v-for="(item, key) in Array(2)"
          :key="key"
          :style="{ background: tintColor(success, (key + 8) / 10) }"
            >
        </div>
      </div>
    </div>
  </el-col>
  <el-col :span="6" :xs="{span: 12}">
    <div class="demo-color-box"
    :style="{ background: warning }"
    >Warning<div class="value">#E6A23C</div>
      <div
          class="bg-color-sub"
        >
        <div
          class="bg-success-sub-item"
          v-for="(item, key) in Array(2)"
          :key="key"
          :style="{ background: tintColor(warning, (key + 8) / 10) }"
            >
        </div>
      </div>
    </div>
  </el-col>
  <el-col :span="6" :xs="{span: 12}">
    <div class="demo-color-box"
    :style="{ background: danger }"
    >Danger<div class="value">#F56C6C</div>
      <div
          class="bg-color-sub"
        >
        <div
          class="bg-success-sub-item"
          v-for="(item, key) in Array(2)"
          :key="key"
          :style="{ background: tintColor(danger, (key + 8) / 10) }"
            >
        </div>
      </div>
    </div>
  </el-col>
  <el-col :span="6" :xs="{span: 12}">
    <div class="demo-color-box"
    :style="{ background: info }"
    >Info<div class="value">#909399</div>
      <div
          class="bg-color-sub"
        >
        <div
          class="bg-success-sub-item"
          v-for="(item, key) in Array(2)"
          :key="key"
          :style="{ background: tintColor(info, (key + 8) / 10) }"
            >
        </div>
      </div>
    </div>
  </el-col>
</el-row>

### 中性色

中性色用于文本、背景和边框颜色。通过运用不同的中性色，来表现层次结构。

<el-row :gutter="12">
  <el-col :span="6" :xs="{span: 12}">
    <div class="demo-color-box-group">
      <div class="demo-color-box demo-color-box-other"
      :style="{ background: textPrimary }"
      >主要文字<div class="value">{{textPrimary}}</div></div>
      <div class="demo-color-box demo-color-box-other"
      :style="{ background: textRegular }"
      >
      常规文字<div class="value">{{textRegular}}</div></div>
      <div class="demo-color-box demo-color-box-other"
      :style="{ background: textSecondary }"
      >次要文字<div class="value">{{textSecondary}}</div></div>
      <div class="demo-color-box demo-color-box-other"
      :style="{ background: textPlaceholder }"
      >占位文字<div class="value">{{textPlaceholder}}</div></div>
    </div>
  </el-col>
  <el-col :span="6" :xs="{span: 12}">
    <div class="demo-color-box-group">
      <div class="demo-color-box demo-color-box-other demo-color-box-lite"
      :style="{ background: borderBase }"
      >一级边框<div class="value">{{borderBase}}</div></div>
      <div class="demo-color-box demo-color-box-other demo-color-box-lite"
      :style="{ background: borderLight }"
      >二级边框<div class="value">{{borderLight}}</div></div>
      <div class="demo-color-box demo-color-box-other demo-color-box-lite"
      :style="{ background: borderLighter }"
      >三级边框<div class="value">{{borderLighter}}</div></div>
      <div class="demo-color-box demo-color-box-other demo-color-box-lite"
      :style="{ background: borderExtraLight }"
      >四级边框<div class="value">{{borderExtraLight}}</div></div>
    </div>
  </el-col>
  <el-col :span="6" :xs="{span: 12}">
    <div class="demo-color-box-group">
      <div
      class="demo-color-box demo-color-box-other"
      :style="{ background: black }"
      >基础黑色<div class="value">{{black}}</div></div>
      <div
      class="demo-color-box demo-color-box-other"
      :style="{ background: white, color: '#303133', border: '1px solid #eee' }"
      >基础白色<div class="value">{{white}}</div></div>
      <div class="demo-color-box demo-color-box-other bg-transparent">透明<div class="value">Transparent</div>
      </div>
    </div>
  </el-col>
</el-row>


### IOV DESIGN 色彩

#### 主题色

主题色是产品中最核心、最高频使用的颜色，它常用于主要按钮和文字、重点操作状态、高亮提醒、空状态等，并在很大程度上决定了产品整体的基调和风格。IOV Design 以 [#2F48FF数智蓝] 作为默认主题色，蕴含了数智运营、科技创新的品牌特性，色彩倾向在稳重中透露出些许品牌活力和年轻化，在中后台设计中也具有广泛的普适性。
另外我们也支持根据算法，基于配置的产品主色，通过动态梯度色彩算法自动生成适合的色板。

<el-row class="iov-design-color" type="flex" :gutter="12">
  <el-col
    v-for="(item, index) in iovDesingPrimarys"
    :key="index"
    :span="6"
    :xs="{span: 12}"
  >
    <div
      class="demo-color-box"
      :style="{'background-color': item.color, color: tintColor('#212026', 0.1) }"
    >
      <div>{{item.color}}</div>
    </div>
    <div class="iov-design-color-desc-box">
      <div>
        <span>css变量: $--color-{{item.label}}</span>
        <i class="el-icon-copy-document" @click="copyText(item.label)"></i>
      </div>
      <div class="color-desc">{{item.desc}}</div>
    </div>
  </el-col>
</el-row>

#### 中性色

中性色又称为无彩色系，能在产品界面中调和色彩搭配，衬托主色及其他色彩，同时有利于拉开内容层次，使用户更专注于内容。主要被大量的应用在界面的文字部分，此外背景、边框、分割线等场景中也非常常见。IOV Design根据过往业务经验，提供了适合线条、填充和文字的带一定品牌色倾向的中性色参考色。

##### 线条 Line

<el-row type="flex" class="iov-design-color" :gutter="12">
  <el-col
    v-for="(item, index) in iovDesignLine"
    :key="index"
    :span="6"
    :xs="{span: 12}"
  >
    <div
      class="demo-color-box"
      :style="{'background-color': item.color}"
    >
      <div>{{item.color}}</div>
    </div>
    <div class="iov-design-color-desc-box">
      <div>
        <span>css变量: $--color-{{item.label}}</span>
        <i class="el-icon-copy-document" @click="copyText(item.label)"></i>
      </div>
      <div class="color-desc">{{item.desc}}</div>
    </div>
  </el-col>
</el-row>


##### 填充 Fill

<el-row type="flex" class="iov-design-color" :gutter="12">
  <el-col
    v-for="(item, index) in iovDesignFill"
    :key="index"
    :span="6"
    :xs="{span: 12}"
  >
    <div
      class="demo-color-box"
      :style="{'background-color': item.color, color: tintColor('#212026', 0.7) }"
    >
      <div>{{item.color}}</div>
    </div>
    <div class="iov-design-color-desc-box">
      <div>
        <span>css变量: $--color-{{item.label}}</span>
        <i class="el-icon-copy-document" @click="copyText(item.label)"></i>
      </div>
      <div class="color-desc">{{item.desc}}</div>
    </div>
  </el-col>
</el-row>

##### 文字 Text

<el-row type="flex" class="iov-design-color" :gutter="12">
  <el-col
    v-for="(item, index) in iovDesignText"
    :key="index"
    :span="6"
    :xs="{span: 12}"
  >
    <div
      class="demo-color-box"
      :style="{'background-color': item.color, color: tintColor('#212026', 0.7) }"
    >
      <div>{{item.color}}</div>
    </div>
    <div class="iov-design-color-desc-box">
      <div>
        <span>css变量: $--color-{{item.label}}</span>
        <i class="el-icon-copy-document" @click="copyText(item.label)"></i>
      </div>
      <div class="color-desc">{{item.desc}}</div>
    </div>
  </el-col>
</el-row>

#### 功能色

功能色代表了明确的信息以及状态，比如成功、出错、失败、提醒、链接等。我们定义了4种功能色，在遵循色彩通用含义选取色相的基础上，从视觉一致性的角度选取了与品牌色更具一致关系的色调，并结合WCAG2.0标准综合考量，使其达到可用性标准。我们建议在一套产品体系下，功能色尽量保持一致，不要有过多的自定义干扰用户的认知体验。

##### 警示色

<el-row type="flex" class="iov-design-color" :gutter="12">
  <el-col
    v-for="(item, index) in iovDesignWarning"
    :key="index"
    :span="6"
    :xs="{span: 12}"
  >
    <div
      class="demo-color-box"
      :style="{'background-color': item.color}"
    >
      <div>{{item.color}}</div>
    </div>
    <div class="iov-design-color-desc-box">
      <div>
        <span>css变量: $--color-{{item.label}}</span>
        <i class="el-icon-copy-document" @click="copyText(item.label)"></i>
      </div>
      <div class="color-desc">{{item.desc}}</div>
    </div>
  </el-col>
</el-row>

##### 成功色

<el-row type="flex" class="iov-design-color" :gutter="12">
  <el-col
    v-for="(item, index) in iovDesignSuccess"
    :key="index"
    :span="6"
    :xs="{span: 12}"
  >
    <div
      class="demo-color-box"
      :style="{'background-color': item.color}"
    >
      <div>{{item.color}}</div>
    </div>
    <div class="iov-design-color-desc-box">
      <div>
        <span>css变量: $--color-{{item.label}}</span>
        <i class="el-icon-copy-document" @click="copyText(item.label)"></i>
      </div>
      <div class="color-desc">{{item.desc}}</div>
    </div>
  </el-col>
</el-row>

##### 错误色

<el-row type="flex" class="iov-design-color" :gutter="12">
  <el-col
    v-for="(item, index) in iovDesignError"
    :key="index"
    :span="6"
    :xs="{span: 12}"
  >
    <div
      class="demo-color-box"
      :style="{'background-color': item.color}"
    >
      <div>{{item.color}}</div>
    </div>
    <div class="iov-design-color-desc-box">
      <div>
        <span>css变量: $--color-{{item.label}}</span>
        <i class="el-icon-copy-document" @click="copyText(item.label)"></i>
      </div>
      <div class="color-desc">{{item.desc}}</div>
    </div>
  </el-col>
</el-row>

#### 扩展色

扩展色是一系列由功能色扩展而成的颜色。在有更多颜色需求的场景中（如数据可视化场景、插画场景）。同样采用了 HCT 及插值拟合曲线的方法，除了功能色蓝、红、黄、绿之外，IOV Design 色彩体系也增加了其余色系的辅助扩展色。

<el-row type="flex" class="iov-design-color" :gutter="12" v-for="(value, key) in iovDesignOther" :key="key">
  <el-col
    v-for="(item, index) in value"
    :key="index"
    :span="6"
    :xs="{span: 12}"
  >
    <div
      class="demo-color-box"
      :style="{'background-color': item.color}"
    >
      <div>{{item.color}}</div>
    </div>
    <div class="iov-design-color-desc-box">
      <div>
        <span>css变量: $--color-{{item.label}}</span>
        <i class="el-icon-copy-document" @click="copyText(item.label)"></i>
      </div>
      <div class="color-desc">{{item.desc}}</div>
    </div>
  </el-col>
</el-row>
