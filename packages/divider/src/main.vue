<template functional>
  <div
    v-bind="data.attrs"
    v-on="listeners"
    :style="{
      borderBottomStyle: props.direction === 'horizontal' && props.type || '',
      borderBottomColor: props.direction === 'horizontal' && props.color || '',
      borderRightStyle: props.direction === 'vertical' && props.type || '',
      borderRightColor: props.direction === 'vertical' && props.color || ''
    }"
    :class="[data.staticClass, 'el-divider', `el-divider--${props.direction}`]"
  >
    <div
      v-if="slots().default && props.direction !== 'vertical'"
      :class="['el-divider__text', `is-${props.contentPosition}`]"
     >
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ElDivider',
  props: {
    direction: {
      type: String,
      default: 'horizontal',
      validator(val) {
        return ['horizontal', 'vertical'].indexOf(val) !== -1;
      }
    },
    contentPosition: {
      type: String,
      default: 'center',
      validator(val) {
        return ['left', 'center', 'right'].indexOf(val) !== -1;
      }
    },
    color: {
      type: String,
      default: '' // $--color-line-1
    },
    type: {
      type: String,
      default: ''
    }
  }
};

</script>
