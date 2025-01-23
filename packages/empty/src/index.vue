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
  0: '//prod-common-public.obs-helf.cucloud.cn/user/72f51000000000112154360', // require('./img/0.png'),
  1: '//prod-common-public.obs-helf.cucloud.cn/user/2c951000000000112154402', // require('./img/1.png'),
  2: '//prod-common-public.obs-helf.cucloud.cn/user/c3301000000000112154439', // require('./img/2.png'),
  3: '//prod-common-public.obs-helf.cucloud.cn/user/98171000000000112154450', // require('./img/4.png'),
  4: '//prod-common-public.obs-helf.cucloud.cn/user/ccae1000000000112154463', // require('./img/4.png'),
  5: '//prod-common-public.obs-helf.cucloud.cn/user/ae811000000000112154481', // require('./img/5.png'),
  6: '//prod-common-public.obs-helf.cucloud.cn/user/3b9f1000000000112154499', // require('./img/6.png'),
  7: '//prod-common-public.obs-helf.cucloud.cn/user/3bfc1000000000112154525', // require('./img/7.png'),
  8: '//prod-common-public.obs-helf.cucloud.cn/user/eb8b1000000000112154533', // require('./img/8.png'),
  9: '//prod-common-public.obs-helf.cucloud.cn/user/22061000000000112154548' // require('./img/9.png')
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
