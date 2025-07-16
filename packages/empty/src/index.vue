<template>
  <div class="el-empty">
    <div class="el-empty__image" :style="imageStyle">
      <img v-if="image" :src="image" ondragstart="return false">
      <slot v-else name="image">
        <img :src="img" ondragstart="return false">
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
  0: '//obs-helf.cucloud.cn/prod-common-public/iov-design/empty_0.png', // require('./img/0.png'),
  1: '//obs-helf.cucloud.cn/prod-common-public/iov-design/empty_1.png', // require('./img/1.png'),
  2: '//obs-helf.cucloud.cn/prod-common-public/iov-design/empty_2.png', // require('./img/2.png'),
  3: '//obs-helf.cucloud.cn/prod-common-public/iov-design/empty_3.png', // require('./img/4.png'),
  4: '//obs-helf.cucloud.cn/prod-common-public/iov-design/empty_4.png', // require('./img/4.png'),
  5: '//obs-helf.cucloud.cn/prod-common-public/iov-design/empty_5.png', // require('./img/5.png'),
  6: '//obs-helf.cucloud.cn/prod-common-public/iov-design/empty_6.png', // require('./img/6.png'),
  7: '//obs-helf.cucloud.cn/prod-common-public/iov-design/empty_7.png', // require('./img/7.png'),
  8: '//obs-helf.cucloud.cn/prod-common-public/iov-design/empty_8.png', // require('./img/8.png'),
  9: '//obs-helf.cucloud.cn/prod-common-public/iov-design/empty_9.png' // require('./img/9.png')
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
    imageSize: {
      type: Number,
      default: 140
    },
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
  }
};
</script>
