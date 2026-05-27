<template>
  <button
    class="el-button"
    @click="handleClick"
    :disabled="buttonDisabled || loading"
    :autofocus="autofocus"
    :type="nativeType"
    :class="[
      type ? 'el-button--' + type : '',
      type === 'text' && size ? 'el-button--text-' + color : '',
      $slots.default ? '' : 'is-icon-only',
      buttonSize ? 'el-button--' + buttonSize : '',
      {
        'is-disabled': buttonDisabled || (loading && loadingIcon),
        'is-loading': loading && loadingIcon,
        'is-plain': plain,
        'is-round': round,
        'is-circle': circle,
        'is-dashed': dashed,
        'is-ghost': ghost,
        'is-block': block
      }
    ]"
  >
    <i :class="loadingIcon" v-if="loading && loadingIcon"></i>
    <i :class="icon" v-if="icon && !loading"></i>
    <span class="el-button__text" v-if="$slots.default"><slot></slot></span>
  </button>
</template>
<script>
  export default {
    name: 'ElButton',

    inject: {
      elForm: {
        default: ''
      },
      elFormItem: {
        default: ''
      }
    },

    props: {
      type: {
        type: String,
        default: 'default'
      },
      size: String,
      icon: {
        type: String,
        default: ''
      },
      nativeType: {
        type: String,
        default: 'button'
      },
      loading: Boolean,
      disabled: Boolean,
      plain: Boolean,
      autofocus: Boolean,
      round: Boolean,
      circle: Boolean,
      dashed: Boolean,
      ghost: Boolean,
      block: Boolean,
      color: {
        type: String,
        default: 'primary'
      }
    },

    computed: {
      loadingIcon() {
        if (this.loading && ['primary', 'success', 'info', 'warning', 'danger'].includes(this.type) && !this.plain && !this.dashed && !this.ghost) {
          return 'iov-icon-loading-white';
        } else if (this.loading && (this.type === 'default' || (this.type === 'info' && (this.plain || this.dashed || this.ghost)))) {
          return 'iov-icon-loading-gray';
        } else if (this.loading && (this.type === 'primary' && (this.plain || this.dashed || this.ghost))) {
          return 'iov-icon-loading';
        } else {
          return '';
        }
      },
      _elFormItemSize() {
        return (this.elFormItem || {}).elFormItemSize;
      },
      buttonSize() {
        return this.size || this._elFormItemSize || (this.$ELEMENT || {}).size;
      },
      buttonDisabled() {
        return this.$options.propsData.hasOwnProperty('disabled') ? this.disabled : (this.elForm || {}).disabled;
      }
    },

    methods: {
      handleClick(evt) {
        this.$emit('click', evt);
      }
    }
  };
</script>
