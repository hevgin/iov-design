<template>
  <transition name="el-loading-fade" @after-leave="handleAfterLeave">
    <div
      v-show="visible"
      class="el-loading-mask"
      :style="{ backgroundColor: background || '' }"
      :class="[customClass, { 'is-fullscreen': fullscreen }]">
      <div class="el-loading-spinner" :style="{marginTop: -(loadingSize/2) + 'px'}">
        <i v-if="!spinner" class="iov-icon-loading el-loading-icon" :style="{width: loadingSize + 'px', height: loadingSize + 'px'}"></i>
        <i v-else :class="spinner" class="el-loading-icon" :style="{width: loadingSize + 'px', height: loadingSize + 'px'}"></i>
        <p v-if="text" class="el-loading-text">{{ text }}</p>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    data() {
      return {
        text: null,
        spinner: null,
        background: null,
        fullscreen: true,
        visible: false,
        customClass: '',
        size: 14
      };
    },

    methods: {
      handleAfterLeave() {
        this.$emit('after-leave');
      },
      setText(text) {
        this.text = text;
      }
    },
    computed: {
      loadingSize() {
        if (this.fullscreen) {
          return 32;
        }
        return this.size;
      }
    }
  };
</script>
