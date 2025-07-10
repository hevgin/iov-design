<template>
  <transition
    name="dialog-fade"
    @after-enter="afterEnter"
    @after-leave="afterLeave">
    <div
      v-show="visible"
      class="el-dialog__wrapper"
      @click.self="handleWrapperClick">
      <div
        role="dialog"
        :key="key"
        aria-modal="true"
        :aria-label="title || 'dialog'"
        :class="['el-dialog', { 'is-fullscreen': fullscreen, 'el-dialog--center': center }, customClass]"
        ref="dialog"
        :style="style">
        <div class="el-dialog__header">
          <slot name="title">
            <span class="el-dialog__title">{{ title }}</span>
          </slot>
          <span
            class="el-dialog__headerbtn"
            aria-label="Close"
            v-if="showClose"
            >
            <i class="el-dialog__close el-icon iov-icon-close" v-if="showClose" @click="handleClose"></i>
          </span>
        </div>
        <div class="el-dialog__body" ref="body" :class="type === 'form' ? 'el-dialog__body--form' : 'el-dialog__body--desc'" v-if="rendered"><slot></slot></div>
        <div class="el-dialog__footer" ref="footer" v-if="$slots.footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import Popup from 'iov-design/src/utils/popup';
  import Migrating from 'iov-design/src/mixins/migrating';
  import emitter from 'iov-design/src/mixins/emitter';

  export default {
    name: 'ElDialog',

    mixins: [Popup, emitter, Migrating],

    props: {
      title: {
        type: String,
        default: ''
      },

      type: {
        type: String,
        default: 'form'
      },

      modal: {
        type: Boolean,
        default: true
      },

      modalAppendToBody: {
        type: Boolean,
        default: true
      },

      appendToBody: {
        type: Boolean,
        default: false
      },

      lockScroll: {
        type: Boolean,
        default: true
      },

      closeOnClickModal: {
        type: Boolean,
        default: true
      },

      closeOnPressEscape: {
        type: Boolean,
        default: true
      },

      showClose: {
        type: Boolean,
        default: true
      },

      width: String,

      fullscreen: Boolean,

      customClass: {
        type: String,
        default: ''
      },

      top: {
        type: String,
        default: '50%'
      },
      beforeClose: Function,
      center: {
        type: Boolean,
        default: false
      },

      destroyOnClose: Boolean
    },

    data() {
      return {
        closed: false,
        key: 0
      };
    },

    watch: {
      visible(val) {
        if (val) {
          this.closed = false;
          this.$emit('open');
          this.$el.addEventListener('scroll', this.updatePopper);
          this.$nextTick(() => {
            this.$refs.dialog.scrollTop = 0;
          });
          if (this.appendToBody) {
            document.body.appendChild(this.$el);
          }
        } else {
          this.$el.removeEventListener('scroll', this.updatePopper);
          if (!this.closed) this.$emit('close');
          if (this.destroyOnClose) {
            this.$nextTick(() => {
              this.key++;
            });
          }
        }
      }
    },

    computed: {
      style() {
        let style = {};
        if (!this.fullscreen) {
          style.top = this.top;
          if (this.width) {
            style.width = this.width;
          }
        }
        return style;
      }
    },

    methods: {
      getMigratingConfig() {
        return {
          props: {
            'size': 'size is removed.'
          }
        };
      },
      handleWrapperClick() {
        if (!this.closeOnClickModal) return;
        this.handleClose();
      },
      handleClose() {
        if (typeof this.beforeClose === 'function') {
          this.beforeClose(this.hide);
        } else {
          this.hide();
        }
      },
      hide(cancel) {
        if (cancel !== false) {
          this.$emit('update:visible', false);
          this.$emit('close');
          this.closed = true;
        }
      },
      updatePopper() {
        this.broadcast('ElSelectDropdown', 'updatePopper');
        this.broadcast('ElDropdownMenu', 'updatePopper');
      },
      afterEnter() {
        this.onDialogOpened();
        this.$emit('opened');
      },
      afterLeave() {
        this.$emit('closed');
      },

      onDialogOpened() {
        this.$nextTick(() => {
          this.checkOverflow();
          this.observeContentChanges();
        });
      },

      // 检查内容是否超过body高度
      checkOverflow() {
        const body = this.$refs.body;
        const footer = this.$refs.footer;
        if (!body || !footer) return;
        if (body.scrollHeight > body.clientHeight) {
          footer.classList.add('el-dialog__footer--shadow');
        } else {
          footer.classList.remove('el-dialog__footer--shadow');
        }
      },
      // 监听节点变化
      observeContentChanges() {
        const body = this.$refs.body;
        if (!body) return;
        if (this._mutationObserver) {
          this._mutationObserver.disconnect();
        }
        this._mutationObserver = new MutationObserver(() => {
          this.checkOverflow();
        });
        // 监听子节点及文本节点的内容变化
        this._mutationObserver.observe(body, {
          childList: true,
          subtree: true,
          characterData: true
        });
      }
    },

    mounted() {
      if (this.visible) {
        this.rendered = true;
        this.open();
        if (this.appendToBody) {
          document.body.appendChild(this.$el);
        }
      }
    },

    destroyed() {
      // if appendToBody is true, remove DOM node after destroy
      if (this.appendToBody && this.$el && this.$el.parentNode) {
        this.$el.parentNode.removeChild(this.$el);
      }
      if (this._mutationObserver) {
        this._mutationObserver.disconnect();
      }
    }
  };
</script>
