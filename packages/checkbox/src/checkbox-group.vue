<script>
  import Emitter from 'iov-design/src/mixins/emitter';

  export default {
    name: 'ElCheckboxGroup',

    componentName: 'ElCheckboxGroup',

    mixins: [Emitter],

    inject: {
      elFormItem: {
        default: ''
      }
    },

    props: {
      value: {},
      disabled: Boolean,
      min: Number,
      max: Number,
      size: String,
      fill: String,
      borderColor: String,
      textColor: String,
      gap: {
        type: Number,
        default: null
      }
    },

    computed: {
      _elFormItemSize() {
        return (this.elFormItem || {}).elFormItemSize;
      },
      checkboxGroupSize() {
        return this.size || this._elFormItemSize || (this.$ELEMENT || {}).size;
      },
      gapStyle() {
        if (this.gap !== null) {
          return { '--checkbox-gap': `${this.gap}px` };
        }
        return {};
      }
    },

    watch: {
      value(value) {
        this.dispatch('ElFormItem', 'el.form.change', [value]);
      }
    }
  };
</script>

<template>
  <div class="el-checkbox-group" :style="gapStyle" role="group" aria-label="checkbox-group">
    <slot></slot>
  </div>
</template>
