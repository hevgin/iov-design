## Input 输入框

通过鼠标或键盘输入字符，支持单行输入、文本域、密码框、搜索框、带建议输入等多种场景。

:::warning
Input 为受控组件，它**总会显示 Vue 绑定值**。

通常情况下，应当处理 `input` 事件，并更新组件的绑定值（或使用`v-model`）。否则，输入框内显示的值将不会改变。

不支持 `v-model` 修饰符。
:::

### 基础用法

基础文本输入框，支持占位提示与尺寸控制。

:::demo
```html
<el-row :gutter="20">
  <el-col :span="12">
    <el-input v-model="input" placeholder="请输入内容" size="small"></el-input>
  </el-col>
  <el-col :span="12">
    <el-input v-model="input" placeholder="请输入内容" size="small" fill></el-input>
  </el-col>
</el-row>

<script>
export default {
  data() {
    return {
      input: ''
    }
  }
}
</script>
```
:::


### 禁用状态

通过 `disabled` 属性指定是否禁用输入框，禁用后不可编辑。

:::demo 
```html
<el-row :gutter="20">
  <el-col :span="12">
    <div class="component-content-title mgb-10">禁用未输入</div>
    <el-input v-model="input1" placeholder="请输入内容" disabled size="small" clearable></el-input>
  </el-col>
  <el-col :span="12">
    <div class="component-content-title mgb-10">禁用已输入</div>
    <el-input v-model="input2" placeholder="请输入内容" disabled size="small" clearable></el-input>
  </el-col>
</el-row>

<script>
export default {
  data() {
    return {
      input1: '',
      input2: 'Jackson'
    }
  }
}
</script>
```
:::

### 可清空

使用 `clearable` 属性显示清空按钮，一键清除已输入内容，支持字数统计展示。

:::demo 
```html
<el-row :gutter="20">
  <el-col :span="12">
    <div class="component-content-title mgb-10">基础可清空</div>
    <el-input v-model="input1" placeholder="请输入内容" size="small" clearable></el-input>
  </el-col>
  <el-col :span="12">
    <div class="component-content-title mgb-10">可清空+字数限制</div>
    <el-input v-model="input2" placeholder="请输入内容" size="small" clearable maxlength="10" show-word-limit></el-input>
  </el-col>
  <el-col :span="12">
    <div class="component-content-title mgb-10">后置按钮+可清空</div>
    <el-input v-model="input3" placeholder="请输入内容" size="small" clearable>
      <el-button slot="append" size="small" icon="iov-icon-search" type="primary"></el-button>
    </el-input>
  </el-col>
</el-row>

<script>
export default {
  data() {
    return {
      input1: '',
      input2: '',
      input3: ''
    }
  }
}
</script>
```
:::

### 密码框

使用 `show-password` 属性开启密码可见切换，支持明文 / 密文切换。

:::demo 

```html
<el-row :gutter="20">
  <el-col :span="12">
    <el-input v-model="input" placeholder="请输入密码" show-password size="small" clearable></el-input>
  </el-col>
</el-row>

<script>
export default {
  data() {
    return {
      input: ''
    }
  }
}
</script>
```
:::

### 带 icon 的输入框

通过前缀`prefix-icon` / 后缀`suffix-icon`图标强化输入类型标识，支持属性配置与插槽两种方式

:::demo 
```html
<el-row :gutter="20">
  <el-col :span="12">
    <div class="component-content-title mgb-10">后缀图标（属性）</div>
    <el-input placeholder="请选择日期" suffix-icon="iov-icon-date" v-model="input1" size="small"></el-input>
  </el-col>
  <el-col :span="12">
    <div class="component-content-title mgb-10">前缀图标（属性）</div>
    <el-input placeholder="请输入内容" prefix-icon="iov-icon-search" v-model="input2" size="small"></el-input>
  </el-col>
  <el-col :span="12">
    <div class="component-content-title mgb-10">后缀图标（插槽）</div>
    <el-input placeholder="请选择日期" v-model="input3" size="small">
      <i slot="suffix" class="el-input__icon iov-icon-date"></i>
    </el-input>
  </el-col>
  <el-col :span="12">
    <div class="component-content-title mgb-10">前缀图标（插槽）</div>
    <el-input placeholder="请输入内容" v-model="input4" size="small">
      <i slot="prefix" class="el-input__icon iov-icon-search"></i>
    </el-input>
  </el-col>
</el-row>

<script>
export default {
  data() {
    return {
      input1: '',
      input2: '',
      input3: '',
      input4: ''
    }
  }
}
</script>
```
:::

### 文本域

用于多行文本输入，通过 `type="textarea"` 启用，可通过 rows 控制初始高度。

:::demo 
```html
<el-row :gutter="20">
  <el-col :span="12">
    <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea"></el-input>
  </el-col>
</el-row>

<script>
export default {
  data() {
    return {
      textarea: ''
    }
  }
}
</script>
```
:::

### 自适应高度文本域

设置 `autosize` 实现高度随内容自适应，支持配置最小 / 最大行数。

:::demo
```html
<el-row :gutter="20">
  <el-col :span="12">
    <div class="component-content-title mgb-10">自由自适应</div>
    <el-input type="textarea" autosize placeholder="请输入内容" v-model="textarea1"></el-input>
  </el-col>
  <el-col :span="12">
    <div class="component-content-title mgb-10">限制最大最小行数</div>
    <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4 }" placeholder="请输入内容" v-model="textarea2"></el-input>
  </el-col>
</el-row>

<script>
export default {
  data() {
    return {
      textarea1: '',
      textarea2: ''
    }
  }
}
</script>
```
:::

### 前置/后置标签

在输入框外侧添加固定标签、下拉选择器，常用于 URL、金额、电话等场景。

:::demo
```html
<el-row :gutter="12">
  <el-col :span="24">
    <div class="component-content-title mgb-10">前后置文字标签</div>
    <el-input placeholder="请输入内容" v-model="input1" size="small">
      <template slot="prepend">http://</template>
      <template slot="append">.com</template>
    </el-input>
  </el-col>

  <el-col :span="12">
    <div class="component-content-title mgb-10">仅前置标签</div>
    <el-input placeholder="请输入内容" v-model="input2" size="small">
      <template slot="prepend">http://</template>
    </el-input>
  </el-col>
  <el-col :span="12">
    <div class="component-content-title mgb-10">仅后置标签</div>
    <el-input placeholder="请输入内容" v-model="input3" size="small">
      <template slot="append">.com</template>
    </el-input>
  </el-col>

  <el-col :span="24">
    <div class="component-content-title mgb-10">前后置select组件</div>
    <el-input placeholder="请输入内容" v-model="input4" size="small">
      <el-select v-model="select1" style="width:80px;" slot="prepend" placeholder="请选择">
        <el-option label="http://" value="1"></el-option>
        <el-option label="wss://" value="2"></el-option>
      </el-select>
      <el-select v-model="select2" style="width:80px;" slot="append" placeholder="请选择">
        <el-option label=".com" value="1"></el-option>
        <el-option label=".cn" value="2"></el-option>
      </el-select>
    </el-input>
  </el-col>

  <el-col :span="12">
    <div class="component-content-title mgb-10">前置select组件</div>
    <el-input placeholder="请输入内容" v-model="input5" size="small">
      <el-select v-model="select3" style="width:80px;" slot="prepend" placeholder="请选择">
        <el-option label="+86" value="1"></el-option>
        <el-option label="+25" value="2"></el-option>
      </el-select>
    </el-input>
  </el-col>
  <el-col :span="12">
    <div class="component-content-title mgb-10">后置select组件</div>
    <el-input placeholder="请输入内容" v-model="input6" size="small">
      <el-select v-model="select4" style="width:80px;" slot="append" placeholder="请选择">
        <el-option label="万元" value="1"></el-option>
        <el-option label="元" value="2"></el-option>
      </el-select>
    </el-input>
  </el-col>

</el-row>

<script>
export default {
  data() {
    return {
      input1: '',
      input2: '',
      input3: '',
      input4: '',
      input5: '',
      input6: '',
      select1: '1',
      select2: '1',
      select3: '1',
      select4: '1'
    }
  }
}
</script>
```
:::


### 内嵌标签

在输入框内部嵌入前缀 / 后缀标签，不占用外部宽度，界面更紧凑。

:::demo
```html
<el-row :gutter="12">
  <el-col :span="12">
    <el-input placeholder="请输入金额" v-model="input1" size="small" clearable>
      <template slot="prefixLabel">金额</template>
      <el-select v-model="select1" style="width:80px;" slot="append" placeholder="请选择">
        <el-option label="万元" value="1"></el-option>
        <el-option label="元" value="2"></el-option>
      </el-select>
    </el-input>
  </el-col>
  <el-col :span="12">
    <el-input placeholder="请输入金额" v-model="input1" size="small" clearable>
      <el-select v-model="select1" style="width:80px;" slot="prefixLabel" placeholder="请选择">
        <el-option label="万元" value="1"></el-option>
        <el-option label="元" value="2"></el-option>
      </el-select>
      <el-select v-model="select1" style="width:80px;" slot="suffixLabel" placeholder="请选择">
        <el-option label="万元" value="1"></el-option>
        <el-option label="元" value="2"></el-option>
      </el-select>
      <template slot="append">金额</template>
    </el-input>
  </el-col>

  <el-col :span="12">
    <el-input placeholder="请输入金额" v-model="input1" size="small" clearable>
      <template slot="prefixLabel">金额</template>
      <el-select v-model="select1" style="width:80px;" slot="suffixLabel" placeholder="请选择">
        <el-option label="万元" value="1"></el-option>
        <el-option label="元" value="2"></el-option>
      </el-select>
    </el-input>
  </el-col>
  <el-col :span="12">
    <el-input placeholder="请输入金额" v-model="input1" size="small" clearable>
      <el-select v-model="select1" style="width:80px;" slot="prefixLabel" placeholder="请选择">
        <el-option label="万元" value="1"></el-option>
        <el-option label="元" value="2"></el-option>
      </el-select>
      <el-select v-model="select1" style="width:80px;" slot="suffixLabel" placeholder="请选择">
        <el-option label="万元" value="1"></el-option>
        <el-option label="元" value="2"></el-option>
      </el-select>
      <template slot="append">金额</template>
    </el-input>
  </el-col>

  <el-col :span="24">
    <el-input placeholder="请输入金额" v-model="input1" size="large" clearable>
      <template slot="prefixLabel">金额</template>
      <template slot="suffixLabel">元</template>
    </el-input>
  </el-col>
  <el-col :span="24">
    <el-input placeholder="请输入金额" v-model="input1" size="medium" clearable>
      <template slot="prefixLabel">金额</template>
      <template slot="suffixLabel">元</template>
    </el-input>
  </el-col>
  <el-col :span="24">
    <el-input placeholder="请输入金额" v-model="input1" size="small" clearable>
      <template slot="prefixLabel">金额</template>
      <template slot="suffixLabel">元</template>
    </el-input>
  </el-col>
  <el-col :span="24">
    <el-input placeholder="请输入金额" v-model="input1" size="mini" clearable>
      <template slot="prefixLabel">金额</template>
      <template slot="suffixLabel">元</template>
    </el-input>
  </el-col>

  <el-col :span="12">
    <el-input placeholder="请输入金额" v-model="input2" size="small" clearable>
      <template slot="prefixLabel">金额</template>
    </el-input>
  </el-col>
  <el-col :span="12">
    <el-input placeholder="请输入金额" v-model="input3" size="small" clearable>
      <template slot="suffixLabel">元</template>
    </el-input>
  </el-col>

  <el-col :span="24">
    <el-input placeholder="请输入内容large" v-model="input4" size="large" clearable>
      <i slot="prefix" class="el-input__icon el-icon-search"></i>
      <i slot="suffix" class="el-input__icon el-icon-info"></i>
    </el-input>
  </el-col>

  <el-col :span="12">
    <el-input placeholder="请输入内容large" v-model="input5" size="large" clearable>
      <i slot="prefix" class="el-input__icon el-icon-search"></i>
    </el-input>
  </el-col>
  <el-col :span="12">
    <el-input placeholder="请输入内容large" v-model="input6" size="large" clearable>
      <i slot="suffix" class="el-input__icon el-icon-info"></i>
    </el-input>
  </el-col>

  <el-col :span="24">
    <el-input placeholder="请输入内容small" v-model="input4" size="small" clearable>
      <i slot="prefix" class="el-input__icon el-icon-search"></i>
      <i slot="suffix" class="el-input__icon el-icon-info"></i>
    </el-input>
  </el-col>

  <el-col :span="12">
    <el-input placeholder="请输入内容small" v-model="input5" size="small" clearable>
      <i slot="prefix" class="el-input__icon el-icon-search"></i>
    </el-input>
  </el-col>
  <el-col :span="12">
    <el-input placeholder="请输入内容small" v-model="input6" size="small" clearable>
      <i slot="suffix" class="el-input__icon el-icon-info"></i>
    </el-input>
  </el-col>

  <el-col :span="24">
    <el-input placeholder="请输入内容mini" v-model="input4" size="mini" clearable>
      <i slot="prefix" class="el-input__icon el-icon-search"></i>
      <i slot="suffix" class="el-input__icon el-icon-info"></i>
    </el-input>
  </el-col>

  <el-col :span="12">
    <el-input placeholder="请输入内容mini" v-model="input5" size="mini" clearable>
      <i slot="prefix" class="el-input__icon el-icon-search"></i>
    </el-input>
  </el-col>
  <el-col :span="12">
    <el-input placeholder="请输入内容mini" v-model="input6" size="mini" clearable>
      <i slot="suffix" class="el-input__icon el-icon-info"></i>
    </el-input>
  </el-col>

  <el-col :span="24">
    <el-input placeholder="请输入内容" v-model="input7" size="small">
      <i slot="prefix" class="el-input__icon el-icon-search"></i>
      <i slot="suffix" class="el-input__icon el-icon-info"></i>
      <template slot="prefixLabel">金额</template>
      <template slot="suffixLabel">元</template>
    </el-input>
  </el-col>

</el-row>

<script>
export default {
  data() {
    return {
      input1: '',
      input2: '',
      input3: '',
      input4: '',
      input5: '',
      input6: '',
      input7: '',
      select1: '1',
      select2: '1',
      select3: '1',
      select4: '1'
    }
  }
}
</script>
```
:::



### 搜索框

组合前置筛选、搜索图标、搜索按钮，适用于内容检索场景。

:::demo
```html
<el-row :gutter="20">
  <el-col :span="12">
    <div class="component-content-title mgb-10">带分类筛选搜索框</div>
    <el-input placeholder="请输入搜索内容" v-model="input1" size="small">
      <el-select v-model="select" slot="prepend" placeholder="地区" style="width: 100px;">
        <el-option label="北京市" value="1"></el-option>
        <el-option label="上海市" value="2"></el-option>
      </el-select>
      <el-button slot="append" icon="iov-icon-search" type="primary" size="small"></el-button>
    </el-input>
  </el-col>
  <el-col :span="12">
    <div class="component-content-title mgb-10">图标+文字搜索按钮</div>
    <el-input placeholder="请输入搜索内容" v-model="input2" size="small">
      <i slot="prefix" class="el-input__icon iov-icon-search"></i>
      <el-button slot="append" type="primary" size="small">搜索</el-button>
    </el-input>
  </el-col>
</el-row>

<script>
export default {
  data() {
    return {
      select: '1',
      input1: '',
      input2: ''
    }
  }
}
</script>
```
:::

### 尺寸

可通过 `size` 属性指定输入框的尺寸, 提供 `large` / `medium` / `small` / `mini` 四种尺寸，适配不同布局场景。

:::demo 
```html
<el-row :gutter="20">
  <el-col :span="12">
    <div class="component-content-title mgb-10">large 尺寸</div>
    <el-input placeholder="请输入内容" size="large" v-model="input1"></el-input>
  </el-col>
  <el-col :span="12">
    <div class="component-content-title mgb-10">medium 尺寸</div>
    <el-input placeholder="请输入内容" size="medium" v-model="input2"></el-input>
  </el-col>
</el-row>
<el-row :gutter="20">
  <el-col :span="12">
    <div class="component-content-title mgb-10">small 尺寸</div>
    <el-input placeholder="请输入内容" size="small" v-model="input3"></el-input>
  </el-col>
  <el-col :span="12">
    <div class="component-content-title mgb-10">mini 尺寸</div>
    <el-input placeholder="请输入内容" size="mini" v-model="input4"></el-input>
  </el-col>
</el-row>

<script>
export default {
  data() {
    return {
      input1: '',
      input2: '',
      input3: '',
      input4: ''
    }
  }
}
</script>
```
:::

### 带输入建议

根据输入内容实时匹配下拉建议，支持激活即显示与输入后匹配两种模式。。`autocomplete` 是一个可带输入建议的输入框组件，`fetch-suggestions` 是一个返回输入建议的方法属性，如 `querySearch(queryString, cb)`，在该方法中你可以在你的输入建议数据准备好时通过 `cb(data)` 返回到 `autocomplete` 组件中。

:::demo 
```html
<el-row :gutter="20">
  <el-col :span="12">
    <div class="component-content-title mgb-10">激活即显示建议</div>
    <el-autocomplete
      v-model="state1"
      :fetch-suggestions="querySearch"
      placeholder="请输入内容"
      @select="handleSelect"
    ></el-autocomplete>
  </el-col>
  <el-col :span="12">
    <div class="component-content-title mgb-10">输入后匹配建议</div>
    <el-autocomplete
      v-model="state2"
      :fetch-suggestions="querySearch"
      placeholder="请输入内容"
      :trigger-on-focus="false"
      @select="handleSelect"
    ></el-autocomplete>
  </el-col>
</el-row>

<script>
  export default {
    data() {
      return {
        restaurants: [],
        state1: '',
        state2: ''
      };
    },
    methods: {
      querySearch(queryString, cb) {
        var restaurants = this.restaurants;
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      loadAll() {
        return [
          { "value": "三全鲜食（北新泾店）", "address": "长宁区新渔路144号" },
          { "value": "Hot honey 首尔炸鸡（仙霞路）", "address": "上海市长宁区淞虹路661号" },
          { "value": "新旺角茶餐厅", "address": "上海市普陀区真北路988号创邑金沙谷6号楼113" },
          { "value": "泷千家(天山西路店)", "address": "天山西路438号" },
          { "value": "胖仙女纸杯蛋糕（上海凌空店）", "address": "上海市长宁区金钟路968号1幢18号楼一层商铺18-101" },
          { "value": "贡茶", "address": "上海市长宁区金钟路633号" },
          { "value": "豪大大香鸡排超级奶爸", "address": "上海市嘉定区曹安公路曹安路1685号" },
          { "value": "茶芝兰（奶茶，手抓饼）", "address": "上海市普陀区同普路1435号" },
          { "value": "十二泷町", "address": "上海市北翟路1444弄81号B幢-107" },
          { "value": "星移浓缩咖啡", "address": "上海市嘉定区新郁路817号" },
          { "value": "阿姨奶茶/豪大大", "address": "嘉定区曹安路1611号" },
          { "value": "新麦甜四季甜品炸鸡", "address": "嘉定区曹安公路2383弄55号" },
          { "value": "Monica摩托主题咖啡店", "address": "嘉定区江桥镇曹安公路2409号1F，2383弄62号1F" },
          { "value": "浮生若茶（凌空soho店）", "address": "上海长宁区金钟路968号9号楼地下一层" },
          { "value": "NONO JUICE  鲜榨果汁", "address": "上海市长宁区天山西路119号" },
          { "value": "CoCo都可(北新泾店）", "address": "上海市长宁区仙霞西路" },
          { "value": "快乐柠檬（神州智慧店）", "address": "上海市长宁区天山西路567号1层R117号店铺" },
          { "value": "Merci Paul cafe", "address": "上海市普陀区光复西路丹巴路28弄6号楼819" },
          { "value": "猫山王（西郊百联店）", "address": "上海市长宁区仙霞西路88号第一层G05-F01-1-306" },
          { "value": "枪会山", "address": "上海市普陀区棕榈路" },
          { "value": "纵食", "address": "元丰天山花园(东门) 双流路267号" },
          { "value": "钱记", "address": "上海市长宁区天山西路" },
          { "value": "壹杯加", "address": "上海市长宁区通协路" },
          { "value": "唦哇嘀咖", "address": "上海市长宁区新泾镇金钟路999号2幢（B幢）第01层第1-02A单元" },
          { "value": "爱茜茜里(西郊百联)", "address": "长宁区仙霞西路88号1305室" },
          { "value": "爱茜茜里(近铁广场)", "address": "上海市普陀区真北路818号近铁城市广场北区地下二楼N-B2-O2-C商铺" },
          { "value": "鲜果榨汁（金沙江路和美广店）", "address": "普陀区金沙江路2239号金沙和美广场B1-10-6" },
          { "value": "开心丽果（缤谷店）", "address": "上海市长宁区威宁路天山路341号" },
          { "value": "超级鸡车（丰庄路店）", "address": "上海市嘉定区丰庄路240号" },
          { "value": "妙生活果园（北新泾店）", "address": "长宁区新渔路144号" },
          { "value": "香宜度麻辣香锅", "address": "长宁区淞虹路148号" },
          { "value": "凡仔汉堡（老真北路店）", "address": "上海市普陀区老真北路160号" },
          { "value": "港式小铺", "address": "上海市长宁区金钟路968号15楼15-105室" },
          { "value": "蜀香源麻辣香锅（剑河路店）", "address": "剑河路443-1" },
          { "value": "北京饺子馆", "address": "长宁区北新泾街道天山西路490-1号" },
          { "value": "饭典*新简餐（凌空SOHO店）", "address": "上海市长宁区金钟路968号9号楼地下一层9-83室" },
          { "value": "焦耳·川式快餐（金钟路店）", "address": "上海市金钟路633号地下一层甲部" },
          { "value": "动力鸡车", "address": "长宁区仙霞西路299弄3号101B" },
          { "value": "浏阳蒸菜", "address": "天山西路430号" },
          { "value": "四海游龙（天山西路店）", "address": "上海市长宁区天山西路" },
          { "value": "樱花食堂（凌空店）", "address": "上海市长宁区金钟路968号15楼15-105室" },
          { "value": "壹分米客家传统调制米粉(天山店)", "address": "天山西路428号" },
          { "value": "福荣祥烧腊（平溪路店）", "address": "上海市长宁区协和路福泉路255弄57-73号" },
          { "value": "速记黄焖鸡米饭", "address": "上海市长宁区北新泾街道金钟路180号1层01号摊位" },
          { "value": "红辣椒麻辣烫", "address": "上海市长宁区天山西路492号" },
          { "value": "(小杨生煎)西郊百联餐厅", "address": "长宁区仙霞西路88号百联2楼" },
          { "value": "阳阳麻辣烫", "address": "天山西路389号" },
          { "value": "南拳妈妈龙虾盖浇饭", "address": "普陀区金沙江路1699号鑫乐惠美食广场A13" }
        ];
      },
      handleSelect(item) {
        console.log(item);
      }
    },
    mounted() {
      this.restaurants = this.loadAll();
    }
  }
</script>
```
:::

### 自定义模板

可通过 `scoped slot` 自定义输入建议的显示内容，作用域参数为 `item`（当前建议对象），支持多字段组合展示与样式定制。

:::demo 
```html
<el-row :gutter="20">
  <el-col :span="12">
    <el-autocomplete
      popper-class="my-autocomplete"
      v-model="state"
      :fetch-suggestions="querySearch"
      placeholder="请输入内容"
      @select="handleSelect">
      <i
        class="el-icon-edit el-input__icon"
        slot="suffix"
        @click="handleIconClick">
      </i>
      <template slot-scope="{ item }">
        <div class="name">{{ item.value }}</div>
        <span class="addr">{{ item.address }}</span>
      </template>
    </el-autocomplete>
  </el-col>
</el-row>

<style>
.my-autocomplete {
  li {
    line-height: normal;
    padding: 7px;

    .name {
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .addr {
      font-size: 12px;
      color: #b4b4b4;
    }

    .highlighted .addr {
      color: #ddd;
    }
  }
}
</style>

<script>
  export default {
    data() {
      return {
        restaurants: [],
        state: ''
      };
    },
    methods: {
      querySearch(queryString, cb) {
        var restaurants = this.restaurants;
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      loadAll() {
        return [
          { "value": "三全鲜食（北新泾店）", "address": "长宁区新渔路144号" },
          { "value": "Hot honey 首尔炸鸡（仙霞路）", "address": "上海市长宁区淞虹路661号" },
          { "value": "新旺角茶餐厅", "address": "上海市普陀区真北路988号创邑金沙谷6号楼113" },
          { "value": "泷千家(天山西路店)", "address": "天山西路438号" },
          { "value": "胖仙女纸杯蛋糕（上海凌空店）", "address": "上海市长宁区金钟路968号1幢18号楼一层商铺18-101" },
          { "value": "贡茶", "address": "上海市长宁区金钟路633号" },
          { "value": "豪大大香鸡排超级奶爸", "address": "上海市嘉定区曹安公路曹安路1685号" },
          { "value": "茶芝兰（奶茶，手抓饼）", "address": "上海市普陀区同普路1435号" },
          { "value": "十二泷町", "address": "上海市北翟路1444弄81号B幢-107" },
          { "value": "星移浓缩咖啡", "address": "上海市嘉定区新郁路817号" },
          { "value": "阿姨奶茶/豪大大", "address": "嘉定区曹安路1611号" },
          { "value": "新麦甜四季甜品炸鸡", "address": "嘉定区曹安公路2383弄55号" },
          { "value": "Monica摩托主题咖啡店", "address": "嘉定区江桥镇曹安公路2409号1F，2383弄62号1F" },
          { "value": "浮生若茶（凌空soho店）", "address": "上海长宁区金钟路968号9号楼地下一层" },
          { "value": "NONO JUICE  鲜榨果汁", "address": "上海市长宁区天山西路119号" },
          { "value": "CoCo都可(北新泾店）", "address": "上海市长宁区仙霞西路" },
          { "value": "快乐柠檬（神州智慧店）", "address": "上海市长宁区天山西路567号1层R117号店铺" },
          { "value": "Merci Paul cafe", "address": "上海市普陀区光复西路丹巴路28弄6号楼819" },
          { "value": "猫山王（西郊百联店）", "address": "上海市长宁区仙霞西路88号第一层G05-F01-1-306" },
          { "value": "枪会山", "address": "上海市普陀区棕榈路" },
          { "value": "纵食", "address": "元丰天山花园(东门) 双流路267号" },
          { "value": "钱记", "address": "上海市长宁区天山西路" },
          { "value": "壹杯加", "address": "上海市长宁区通协路" },
          { "value": "唦哇嘀咖", "address": "上海市长宁区新泾镇金钟路999号2幢（B幢）第01层第1-02A单元" },
          { "value": "爱茜茜里(西郊百联)", "address": "长宁区仙霞西路88号1305室" },
          { "value": "爱茜茜里(近铁广场)", "address": "上海市普陀区真北路818号近铁城市广场北区地下二楼N-B2-O2-C商铺" },
          { "value": "鲜果榨汁（金沙江路和美广店）", "address": "普陀区金沙江路2239号金沙和美广场B1-10-6" },
          { "value": "开心丽果（缤谷店）", "address": "上海市长宁区威宁路天山路341号" },
          { "value": "超级鸡车（丰庄路店）", "address": "上海市嘉定区丰庄路240号" },
          { "value": "妙生活果园（北新泾店）", "address": "长宁区新渔路144号" },
          { "value": "香宜度麻辣香锅", "address": "长宁区淞虹路148号" },
          { "value": "凡仔汉堡（老真北路店）", "address": "上海市普陀区老真北路160号" },
          { "value": "港式小铺", "address": "上海市长宁区金钟路968号15楼15-105室" },
          { "value": "蜀香源麻辣香锅（剑河路店）", "address": "剑河路443-1" },
          { "value": "北京饺子馆", "address": "长宁区北新泾街道天山西路490-1号" },
          { "value": "饭典*新简餐（凌空SOHO店）", "address": "上海市长宁区金钟路968号9号楼地下一层9-83室" },
          { "value": "焦耳·川式快餐（金钟路店）", "address": "上海市金钟路633号地下一层甲部" },
          { "value": "动力鸡车", "address": "长宁区仙霞西路299弄3号101B" },
          { "value": "浏阳蒸菜", "address": "天山西路430号" },
          { "value": "四海游龙（天山西路店）", "address": "上海市长宁区天山西路" },
          { "value": "樱花食堂（凌空店）", "address": "上海市长宁区金钟路968号15楼15-105室" },
          { "value": "壹分米客家传统调制米粉(天山店)", "address": "天山西路428号" },
          { "value": "福荣祥烧腊（平溪路店）", "address": "上海市长宁区协和路福泉路255弄57-73号" },
          { "value": "速记黄焖鸡米饭", "address": "上海市长宁区北新泾街道金钟路180号1层01号摊位" },
          { "value": "红辣椒麻辣烫", "address": "上海市长宁区天山西路492号" },
          { "value": "(小杨生煎)西郊百联餐厅", "address": "长宁区仙霞西路88号百联2楼" },
          { "value": "阳阳麻辣烫", "address": "天山西路389号" },
          { "value": "南拳妈妈龙虾盖浇饭", "address": "普陀区金沙江路1699号鑫乐惠美食广场A13" }
        ];
      },
      handleSelect(item) {
        console.log(item);
      },
      handleIconClick(ev) {
        console.log(ev);
      }
    },
    mounted() {
      this.restaurants = this.loadAll();
    }
  }
</script>
```
:::

### 远程搜索

通过异步请求从服务端获取搜索建议，内置防抖控制避免频繁请求，适配大数据量远程检索场景。

:::demo
```html
<el-row :gutter="20">
  <el-col :span="12">
    <el-autocomplete
      v-model="state"
      :fetch-suggestions="querySearchAsync"
      placeholder="请输入内容"
      @select="handleSelect"
      clearable
    ></el-autocomplete>
  </el-col>
</el-row>

<script>
  export default {
    data() {
      return {
        restaurants: [],
        state: '',
        timeout:  null
      };
    },
    methods: {
      loadAll() {
        return [
          { "value": "三全鲜食（北新泾店）", "address": "长宁区新渔路144号" },
          { "value": "Hot honey 首尔炸鸡（仙霞路）", "address": "上海市长宁区淞虹路661号" },
          { "value": "新旺角茶餐厅", "address": "上海市普陀区真北路988号创邑金沙谷6号楼113" },
          { "value": "泷千家(天山西路店)", "address": "天山西路438号" },
          { "value": "胖仙女纸杯蛋糕（上海凌空店）", "address": "上海市长宁区金钟路968号1幢18号楼一层商铺18-101" },
          { "value": "贡茶", "address": "上海市长宁区金钟路633号" },
          { "value": "豪大大香鸡排超级奶爸", "address": "上海市嘉定区曹安公路曹安路1685号" },
          { "value": "茶芝兰（奶茶，手抓饼）", "address": "上海市普陀区同普路1435号" },
          { "value": "十二泷町", "address": "上海市北翟路1444弄81号B幢-107" },
          { "value": "星移浓缩咖啡", "address": "上海市嘉定区新郁路817号" },
          { "value": "阿姨奶茶/豪大大", "address": "嘉定区曹安路1611号" },
          { "value": "新麦甜四季甜品炸鸡", "address": "嘉定区曹安公路2383弄55号" },
          { "value": "Monica摩托主题咖啡店", "address": "嘉定区江桥镇曹安公路2409号1F，2383弄62号1F" },
          { "value": "浮生若茶（凌空soho店）", "address": "上海长宁区金钟路968号9号楼地下一层" },
          { "value": "NONO JUICE  鲜榨果汁", "address": "上海市长宁区天山西路119号" },
          { "value": "CoCo都可(北新泾店）", "address": "上海市长宁区仙霞西路" },
          { "value": "快乐柠檬（神州智慧店）", "address": "上海市长宁区天山西路567号1层R117号店铺" },
          { "value": "Merci Paul cafe", "address": "上海市普陀区光复西路丹巴路28弄6号楼819" },
          { "value": "猫山王（西郊百联店）", "address": "上海市长宁区仙霞西路88号第一层G05-F01-1-306" },
          { "value": "枪会山", "address": "上海市普陀区棕榈路" },
          { "value": "纵食", "address": "元丰天山花园(东门) 双流路267号" },
          { "value": "钱记", "address": "上海市长宁区天山西路" },
          { "value": "壹杯加", "address": "上海市长宁区通协路" },
          { "value": "唦哇嘀咖", "address": "上海市长宁区新泾镇金钟路999号2幢（B幢）第01层第1-02A单元" },
          { "value": "爱茜茜里(西郊百联)", "address": "长宁区仙霞西路88号1305室" },
          { "value": "爱茜茜里(近铁广场)", "address": "上海市普陀区真北路818号近铁城市广场北区地下二楼N-B2-O2-C商铺" },
          { "value": "鲜果榨汁（金沙江路和美广店）", "address": "普陀区金沙江路2239号金沙和美广场B1-10-6" },
          { "value": "开心丽果（缤谷店）", "address": "上海市长宁区威宁路天山路341号" },
          { "value": "超级鸡车（丰庄路店）", "address": "上海市嘉定区丰庄路240号" },
          { "value": "妙生活果园（北新泾店）", "address": "长宁区新渔路144号" },
          { "value": "香宜度麻辣香锅", "address": "长宁区淞虹路148号" },
          { "value": "凡仔汉堡（老真北路店）", "address": "上海市普陀区老真北路160号" },
          { "value": "港式小铺", "address": "上海市长宁区金钟路968号15楼15-105室" },
          { "value": "蜀香源麻辣香锅（剑河路店）", "address": "剑河路443-1" },
          { "value": "北京饺子馆", "address": "长宁区北新泾街道天山西路490-1号" },
          { "value": "饭典*新简餐（凌空SOHO店）", "address": "上海市长宁区金钟路968号9号楼地下一层9-83室" },
          { "value": "焦耳·川式快餐（金钟路店）", "address": "上海市金钟路633号地下一层甲部" },
          { "value": "动力鸡车", "address": "长宁区仙霞西路299弄3号101B" },
          { "value": "浏阳蒸菜", "address": "天山西路430号" },
          { "value": "四海游龙（天山西路店）", "address": "上海市长宁区天山西路" },
          { "value": "樱花食堂（凌空店）", "address": "上海市长宁区金钟路968号15楼15-105室" },
          { "value": "壹分米客家传统调制米粉(天山店)", "address": "天山西路428号" },
          { "value": "福荣祥烧腊（平溪路店）", "address": "上海市长宁区协和路福泉路255弄57-73号" },
          { "value": "速记黄焖鸡米饭", "address": "上海市长宁区北新泾街道金钟路180号1层01号摊位" },
          { "value": "红辣椒麻辣烫", "address": "上海市长宁区天山西路492号" },
          { "value": "(小杨生煎)西郊百联餐厅", "address": "长宁区仙霞西路88号百联2楼" },
          { "value": "阳阳麻辣烫", "address": "天山西路389号" },
          { "value": "南拳妈妈龙虾盖浇饭", "address": "普陀区金沙江路1699号鑫乐惠美食广场A13" }
        ];
      },
      querySearchAsync(queryString, cb) {
        var restaurants = this.restaurants;
        var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;

        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          cb(results);
        }, 3000 * Math.random());
      },
      createStateFilter(queryString) {
        return (state) => {
          return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      handleSelect(item) {
        console.log(item);
      }
    },
    mounted() {
      this.restaurants = this.loadAll();
    }
  };
</script>
```
:::

### 输入长度限制

通过 `maxlength`/`minlength` 限制字符数，搭配 `show-word-limit` 展示字数统计。

:::demo  
```html
<el-row :gutter="20">
  <el-col :span="12">
    <div class="component-content-title mgb-10">文本输入限制</div>
    <el-input
      type="text"
      placeholder="最多输入10字符"
      v-model="text"
      maxlength="10"
      show-word-limit
    ></el-input>
  </el-col>
  <el-col :span="12">
    <div class="component-content-title mgb-10">文本域限制</div>
    <el-input
      type="textarea"
      placeholder="最多输入30字符"
      v-model="textarea"
      maxlength="30"
      show-word-limit
    ></el-input>
  </el-col>
</el-row>

<script>
export default {
  data() {
    return {
      text: '',
      textarea: ''
    }
  }
}
</script>
```
:::

### Input Attributes

| 参数          | 说明            | 类型            | 可选值                 | 默认值   |
|-------------  |---------------- |---------------- |---------------------- |-------- |
| type         | 类型   | string  | text，textarea 和其他 [原生 input 的 type 值](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Form_%3Cinput%3E_types) | text |
| value / v-model | 绑定值           | string / number  | — | — |
| maxlength     | 原生属性，最大输入长度      | number          |  —  | — |
| minlength     | 原生属性，最小输入长度      | number          | — | — |
| show-word-limit | 是否显示输入字数统计，只在 `type = "text"` 或 `type = "textarea"` 时有效 | boolean    |  —  | false |
| placeholder   | 输入框占位文本    | string          | — | — |
| clearable     | 是否可清空        | boolean         | — | false |
| show-password | 是否显示切换密码图标| boolean         | — | false |
| disabled      | 禁用            | boolean         | — | false   |
| size          | 输入框尺寸，只在 `type!="textarea"` 时有效      | string          | medium / small / mini  | — |
| prefix-icon   | 输入框头部图标    | string          | — | — |
| suffix-icon   | 输入框尾部图标    | string          | — | — |
| rows          | 输入框行数，只对 `type="textarea"` 有效  |  number | — |  2   |
| autosize      | 自适应内容高度，只对 `type="textarea"` 有效，可传入对象，如，{ minRows: 2, maxRows: 6 }  |  boolean / object | — |  false   |
| autocomplete | 原生属性，自动补全 | string | on, off | off |
| auto-complete | 下个主版本弃用 | string | on, off | off |
| name | 原生属性 | string | — | — |
| readonly | 原生属性，是否只读 | boolean | — | false |
| max | 原生属性，设置最大值 | — | — | — |
| min | 原生属性，设置最小值 | — | — | — |
| step | 原生属性，设置输入字段的合法数字间隔 | — | — | — |
| resize | 控制是否能被用户缩放 | string | none, both, horizontal, vertical | — |
| autofocus | 原生属性，自动获取焦点 | boolean | true, false | false |
| form | 原生属性 | string | — | — |
| label | 输入框关联的label文字 | string | — | — |
| tabindex | 输入框的tabindex | string | - | - |
| validate-event | 输入时是否触发表单的校验 | boolean | - | true |

### Input Slots
| name | 说明 |
|------|--------|
| prefix | 输入框头部内容，只对 `type="text"` 有效 |
| suffix | 输入框尾部内容，只对 `type="text"` 有效 |
| prefixLabel | 输入框头部标签，只对 `type="text"` 有效 |
| suffixLabel | 输入框尾部标签，只对 `type="text"` 有效 |
| prepend | 输入框前置内容，只对 `type="text"` 有效 |
| append | 输入框后置内容，只对 `type="text"` 有效 |

### Input Events
| 事件名称 | 说明 | 回调参数 |
|---------|--------|---------|
| blur | 在 Input 失去焦点时触发 | (event: Event) |
| focus | 在 Input 获得焦点时触发 | (event: Event) |
| change | 仅在输入框失去焦点或用户按下回车时触发 | (value: string \| number) |
| input | 在 Input 值改变时触发 | (value: string \| number) |
| clear | 在点击由 `clearable` 属性生成的清空按钮时触发 | — |

### Input Methods
| 方法名 | 说明 | 参数 |
| ---- | ---- | ---- |
| focus | 使 input 获取焦点 | — |
| blur | 使 input 失去焦点 | — |
| select | 选中 input 中的文字 | — |

### Autocomplete Attributes

| 参数          | 说明            | 类型            | 可选值                 | 默认值   |
|-------------  |---------------- |---------------- |---------------------- |-------- |
| placeholder   | 输入框占位文本   | string          | — | — |
| disabled      | 禁用            | boolean         | — | false   |
| value-key | 输入建议对象中用于显示的键名 | string | — | value |
| value         | 必填值，输入绑定值   | string  | — | — |
| debounce      | 获取输入建议的去抖延时 | number         | — | 300 |
| placement     | 菜单弹出位置 | string         | top / top-start / top-end / bottom / bottom-start / bottom-end | bottom-start |
| fetch-suggestions | 返回输入建议的方法，仅当你的输入建议数据 resolve 时，通过调用 callback(data:[]) 来返回它  | Function(queryString, callback)  | — | — |
| popper-class | Autocomplete 下拉列表的类名 | string | — | — |
| trigger-on-focus | 是否在输入框 focus 时显示建议列表 | boolean | — | true |
| name | 原生属性 | string | — | — |
| select-when-unmatched | 在输入没有任何匹配建议的情况下，按下回车是否触发 `select` 事件 | boolean | — | false |
| label | 输入框关联的label文字 | string | — | — |
| prefix-icon | 输入框头部图标 | string | — | — |
| suffix-icon | 输入框尾部图标 | string | — | — |
| hide-loading | 是否隐藏远程加载时的加载图标 | boolean | — | false |
| popper-append-to-body | 是否将下拉列表插入至 body 元素。在下拉列表的定位出现问题时，可将该属性设置为 false | boolean | - | true |
| highlight-first-item | 是否默认突出显示远程搜索建议中的第一项 | boolean | — | false |

### Autocomplete Slots
| name | 说明 |
|------|--------|
| prefix | 输入框头部内容 |
| suffix | 输入框尾部内容 |
| prefixLabel | 输入框头部标签 |
| suffixLabel | 输入框尾部标签 |
| prepend | 输入框前置内容 |
| append | 输入框后置内容 |

### Autocomplete Scoped Slot
| name | 说明 |
|------|--------|
| — | 自定义输入建议，参数为 { item } |

### Autocomplete Events
| 事件名称 | 说明 | 回调参数 |
|---------|--------|---------|
| select | 点击选中建议项时触发 | 选中建议项 |
| change | 在 Input 值改变时触发 | (value: string \| number) |

### Autocomplete Methods
| 方法名 | 说明 | 参数 |
| ---- | ---- | ---- |
| focus | 使 input 获取焦点 | - |
