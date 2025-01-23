<template>
  <div class="el-empty">
    <div class="el-empty__image" :style="imageStyle">
      <img v-if="image"  :src="image" @load="onLoad" ondragstart="return false">
      <slot v-else name="image">
        <img :src="img" @load="onLoad" ondragstart="return false">
      </slot>
    </div>
    <div class="el-empty__description">
      <slot v-if="$slots.description" name="description"></slot>
      <p class="description-text" v-else>{{ emptyDescription }}</p>
    </div>
    <div v-if="$slots.default" class="el-empty__bottom">
      <slot></slot>
    </div>
  </div>
</template>

<script>
const IMG = {
  0: require('./img/0.png'),
  1: require('./img/1.png'),
  2: require('./img/2.png'),
  3: require('./img/4.png'),
  4: require('./img/4.png'),
  5: require('./img/5.png'),
  6: require('./img/6.png'),
  7: require('./img/7.png'),
  8: require('./img/8.png'),
  9: require('./img/9.png')
};
import { t } from 'iov-design/src/locale';

export default {
  name: 'ElEmpty',
  components: {
  },
  props: {
    image: {
      type: String,
      default: ''
    },
    type: {
      type: Number,
      default: 1
    },
    imageSize: Number,
    description: {
      type: String,
      default: ''
    }
  },
  computed: {
    emptyDescription() {
      return this.description || t('el.empty.description');
    },
    imageStyle() {
      return {
        width: this.imageSize ? `${this.imageSize}px` : ''
      };
    },
    img() {
      return IMG[this.type];
    }
  },
  methods: {
    onLoad() {
      this.$emit('loaded');
    }
  }
};
</script>
