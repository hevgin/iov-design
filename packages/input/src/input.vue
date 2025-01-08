<template>
  <div :class="[
    type === 'textarea' ? 'el-textarea' : 'el-input',
    inputSize ? 'el-input--' + inputSize : '',
    {
      'is-disabled': inputDisabled,
      'is-exceed': inputExceed,
      'el-input-group': $slots.prepend || $slots.append || $slots.prefixLabel || $slots.suffixLabel,
      'el-input-group--append': $slots.append,
      'el-input-group--prepend': $slots.prepend,
      'is-focus': ($slots.suffixLabel || $slots.prefixLabel) && focused,
      'el-input--prefix': $slots.prefix || prefixIcon,
      'el-input--suffix': $slots.suffix || suffixIcon || clearable || showPassword
    }
    ]"
    @mouseenter="hovering = true"
    @mouseleave="hovering = false"
  >
    <template v-if="type !== 'textarea'">
      <!-- 前置元素 -->
      <div class="el-input-group__prepend" v-if="$slots.prepend">
        <slot name="prepend"></slot>
      </div>
      <div class="el-input-group__inner" :class="{
          'is-disabled': inputDisabled,
          'el-input-group--prefix': $slots.prefixLabel,
          'el-input-group--suffix': $slots.suffixLabel,
          'is-focus': ($slots.suffixLabel || $slots.prefixLabel) && focused
        }">
        <!-- 前置标签 -->
        <div class="el-input-group__prefix-label" v-if="$slots.prefixLabel">
          <slot name="prefixLabel"></slot>
        </div>
        <input
          :tabindex="tabindex"
          v-if="type !== 'textarea'"
          class="el-input__inner"
          v-bind="$attrs"
          :type="showPassword ? (passwordVisible ? 'text': 'password') : type"
          :disabled="inputDisabled"
          :readonly="readonly"
          :autocomplete="autoComplete || autocomplete"
          ref="input"
          @compositionstart="handleCompositionStart"
          @compositionupdate="handleCompositionUpdate"
          @compositionend="handleCompositionEnd"
          @input="handleInput"
          @focus="handleFocus"
          @blur="handleBlur"
          @change="handleChange"
          :aria-label="label"
        >
        <!-- 前置内容 -->
        <span class="el-input__prefix" v-if="$slots.prefix || prefixIcon">
          <slot name="prefix"></slot>
          <i class="el-input__icon" v-if="prefixIcon" :class="prefixIcon"></i>
        </span>
        <!-- 后置内容 -->
        <span class="el-input__suffix" v-if="getSuffixVisible()">
          <span class="el-input__suffix-inner">
            <i v-if="showClear" class="el-input__icon iov-icon-close-mini el-input__clear" @mousedown.prevent @click="clear"></i>
            <!-- 后置标签 -->
            <span class="el-input-group__suffix-label" v-if="$slots.suffixLabel">
              <slot name="suffixLabel"></slot>
            </span>
            <template v-if="!showClear || !showPwdVisible || !isWordLimitVisible">
              <slot name="suffix"></slot>
              <i class="el-input__icon" v-if="suffixIcon" :class="suffixIcon"></i>
            </template>
            <i v-if="showPwdVisible" class="el-input__icon" :class="passwordVisible ? 'iov-icon-eye' : 'iov-icon-eye-close'" @click="handlePasswordVisible"></i>
            <span v-if="isWordLimitVisible" class="el-input__count">
              <span class="el-input__count-inner">
                {{ textLength }}/{{ upperLimit }}
              </span>
            </span>
          </span>
          <i class="el-input__icon" v-if="validateState" :class="['el-input__validateIcon', validateIcon]"></i>
        </span>
      </div>
      <!-- 后置元素 -->
      <div class="el-input-group__append" v-if="$slots.append">
        <slot name="append"></slot>
      </div>
    </template>
    <textarea
      v-else
      :tabindex="tabindex"
      class="el-textarea__inner"
      @compositionstart="handleCompositionStart"
      @compositionupdate="handleCompositionUpdate"
      @compositionend="handleCompositionEnd"
      @input="handleInput"
      ref="textarea"
      v-bind="$attrs"
      :disabled="inputDisabled"
      :readonly="readonly"
      :autocomplete="autoComplete || autocomplete"
      :style="textareaStyle"
      @focus="handleFocus"
      @blur="handleBlur"
      @change="handleChange"
      :aria-label="label"
    >
    </textarea>
    <span v-if="isWordLimitVisible && type === 'textarea'" class="el-input__count">{{ textLength }}/{{ upperLimit }}</span>
  </div>
</template>
<script>
  import { addClass } from 'iov-design/src/utils/dom';
  import emitter from 'iov-design/src/mixins/emitter';
  import Migrating from 'iov-design/src/mixins/migrating';
  import calcTextareaHeight from './calcTextareaHeight';
  import merge from 'iov-design/src/utils/merge';
  import {isKorean} from 'iov-design/src/utils/shared';

  export default {
    name: 'ElInput',

    componentName: 'ElInput',

    mixins: [emitter, Migrating],

    inheritAttrs: false,

    inject: {
      elForm: {
        default: ''
      },
      elFormItem: {
        default: ''
      }
    },

    data() {
      return {
        textareaCalcStyle: {},
        hovering: false,
        focused: false,
        isComposing: false,
        passwordVisible: false
      };
    },

    props: {
      value: [String, Number],
      size: String,
      resize: String,
      form: String,
      disabled: Boolean,
      readonly: Boolean,
      type: {
        type: String,
        default: 'text'
      },
      autosize: {
        type: [Boolean, Object],
        default: false
      },
      autocomplete: {
        type: String,
        default: 'off'
      },
      /** @Deprecated in next major version */
      autoComplete: {
        type: String,
        validator(val) {
          process.env.NODE_ENV !== 'production' &&
            console.warn('[Element Warn][Input]\'auto-complete\' property will be deprecated in next major version. please use \'autocomplete\' instead.');
          return true;
        }
      },
      validateEvent: {
        type: Boolean,
        default: true
      },
      suffixIcon: String,
      prefixIcon: String,
      label: String,
      clearable: {
        type: Boolean,
        default: false
      },
      showPassword: {
        type: Boolean,
        default: false
      },
      showWordLimit: {
        type: Boolean,
        default: false
      },
      tabindex: String
    },

    computed: {
      _elFormItemSize() {
        return (this.elFormItem || {}).elFormItemSize;
      },
      validateState() {
        return this.elFormItem ? this.elFormItem.validateState : '';
      },
      needStatusIcon() {
        return this.elForm ? this.elForm.statusIcon : false;
      },
      validateIcon() {
        return {
          validating: 'iov-icon-loading',
          success: 'iov-icon-circle-success',
          error: 'iov-icon-circle-fail'
        }[this.validateState];
      },
      textareaStyle() {
        return merge({}, this.textareaCalcStyle, { resize: this.resize });
      },
      inputSize() {
        return this.size || this._elFormItemSize || (this.$ELEMENT || {}).size;
      },
      inputDisabled() {
        return this.disabled || (this.elForm || {}).disabled;
      },
      nativeInputValue() {
        return this.value === null || this.value === undefined ? '' : String(this.value);
      },
      showClear() {
        return this.clearable &&
          !this.inputDisabled &&
          !this.readonly &&
          this.nativeInputValue &&
          (this.focused || this.hovering);
      },
      showPwdVisible() {
        return this.showPassword &&
          !this.inputDisabled &&
          !this.readonly &&
          (!!this.nativeInputValue || this.focused);
      },
      isWordLimitVisible() {
        return this.showWordLimit &&
          this.$attrs.maxlength &&
          (this.type === 'text' || this.type === 'textarea') &&
          !this.inputDisabled &&
          !this.readonly &&
          !this.showPassword;
      },
      upperLimit() {
        return this.$attrs.maxlength;
      },
      textLength() {
        if (typeof this.value === 'number') {
          return String(this.value).length;
        }

        return (this.value || '').length;
      },
      inputExceed() {
        // show exceed style if length of initial value greater then maxlength
        return this.isWordLimitVisible &&
          (this.textLength > this.upperLimit);
      }
    },

    watch: {
      value(val) {
        this.$nextTick(this.resizeTextarea);
        if (this.validateEvent) {
          this.dispatch('ElFormItem', 'el.form.change', [val]);
        }
      },
      // native input value is set explicitly
      // do not use v-model / :value in template
      // see: https://github.com/ElemeFE/element/issues/14521
      nativeInputValue() {
        this.setNativeInputValue();
      },
      // when change between <input> and <textarea>,
      // update DOM dependent value and styles
      // https://github.com/ElemeFE/element/issues/14857
      type() {
        this.$nextTick(() => {
          this.setNativeInputValue();
          this.resizeTextarea();
          this.updateIconOffset();
        });
      }
    },

    methods: {
      focus() {
        this.getInput().focus();
      },
      blur() {
        this.getInput().blur();
      },
      getMigratingConfig() {
        return {
          props: {
            'icon': 'icon is removed, use suffix-icon / prefix-icon instead.',
            'on-icon-click': 'on-icon-click is removed.'
          },
          events: {
            'click': 'click is removed.'
          }
        };
      },
      handleBlur(event) {
        this.focused = false;
        this.$emit('blur', event);
        if (this.validateEvent) {
          this.dispatch('ElFormItem', 'el.form.blur', [this.value]);
        }
      },
      select() {
        this.getInput().select();
      },
      resizeTextarea() {
        if (this.$isServer) return;
        const { autosize, type } = this;
        if (type !== 'textarea') return;
        if (!autosize) {
          this.textareaCalcStyle = {
            minHeight: calcTextareaHeight(this.$refs.textarea).minHeight
          };
          return;
        }
        const minRows = autosize.minRows;
        const maxRows = autosize.maxRows;

        this.textareaCalcStyle = calcTextareaHeight(this.$refs.textarea, minRows, maxRows);
      },
      setNativeInputValue() {
        const input = this.getInput();
        if (!input) return;
        if (input.value === this.nativeInputValue) return;
        input.value = this.nativeInputValue;
      },
      handleFocus(event) {
        this.focused = true;
        this.$emit('focus', event);
      },
      handleCompositionStart(event) {
        this.$emit('compositionstart', event);
        this.isComposing = true;
      },
      handleCompositionUpdate(event) {
        this.$emit('compositionupdate', event);
        const text = event.target.value;
        const lastCharacter = text[text.length - 1] || '';
        this.isComposing = !isKorean(lastCharacter);
      },
      handleCompositionEnd(event) {
        this.$emit('compositionend', event);
        if (this.isComposing) {
          this.isComposing = false;
          this.handleInput(event);
        }
      },
      handleInput(event) {
        // should not emit input during composition
        // see: https://github.com/ElemeFE/element/issues/10516
        if (this.isComposing) return;

        // hack for https://github.com/ElemeFE/element/issues/8548
        // should remove the following line when we don't support IE
        if (event.target.value === this.nativeInputValue) return;

        this.$emit('input', event.target.value);

        // ensure native input value is controlled
        // see: https://github.com/ElemeFE/element/issues/12850
        this.$nextTick(this.setNativeInputValue);
      },
      handleChange(event) {
        this.$emit('change', event.target.value);
      },
      handlePendantCls(place) {
        const pendantMap = {
          suffix: 'append',
          prefix: 'prepend'
        };
        const pendant = pendantMap[place];
        const pendantEl = this.$el.querySelector(`.el-input-group__${pendant}`);
        if (!pendantEl) return;
        const isSelect = pendantEl.querySelector('.el-select');
        const isButton = pendantEl.querySelector('.el-button');
        if (isSelect) {
          addClass(pendantEl, 'is-select');
        }
        if (isButton) {
          addClass(pendantEl, 'is-button');
        }
      },
      calcIconOffset(place) {
        let elList = [].slice.call(this.$el.querySelectorAll(`.el-input__${place}`) || []);
        if (!elList.length) return;
        let el = null;
        for (let i = 0; i < elList.length; i++) {
          if (elList[i].parentNode.parentNode === this.$el) {
            el = elList[i];
            break;
          }
        }
        if (!el) return;
        const pendantMap = {
          suffix: 'append',
          prefix: 'prepend'
        };
        const embedMap = {
          suffix: 'suffixLabel',
          prefix: 'prefixLabel'
        };

        const pendant = pendantMap[place];
        const embed = embedMap[place];

        const pendantEl = this.$el.querySelector(`.el-input-group__${pendant}`);
        const embedEl = this.$el.querySelector(`.el-input-group__${place}-label`);

        if (this.$slots[pendant] && this.$slots[embed]) {
          el.style.transform = place === 'prefix' ? `translateX(${pendantEl.offsetWidth + embedEl.offsetWidth}px)` : '';
        } else if (this.$slots[pendant]) {
          el.style.transform = place === 'prefix' ? `translateX(${pendantEl.offsetWidth}px)` : '';
        } else if (this.$slots[embed]) {
          el.style.transform = place === 'prefix' ? `translateX(${embedEl.offsetWidth}px)` : '';
        } else {
          el.removeAttribute('style');
        }
      },
      updateIconOffset() {
        this.handlePendantCls('prefix');
        this.handlePendantCls('suffix');

        this.calcIconOffset('prefix');
        this.calcIconOffset('suffix');
      },
      clear() {
        this.$emit('input', '');
        this.$emit('change', '');
        this.$emit('clear');
      },
      handlePasswordVisible() {
        this.passwordVisible = !this.passwordVisible;
        this.$nextTick(() => {
          this.focus();
        });
      },
      getInput() {
        return this.$refs.input || this.$refs.textarea;
      },
      getSuffixVisible() {
        return this.$slots.suffix ||
          this.$slots.suffixLabel ||
          this.suffixIcon ||
          this.showClear ||
          this.showPassword ||
          this.isWordLimitVisible ||
          (this.validateState && this.needStatusIcon);
      }
    },

    created() {
      this.$on('inputSelect', this.select);
    },

    mounted() {
      this.setNativeInputValue();
      this.resizeTextarea();
      this.updateIconOffset();
    },

    updated() {
      this.$nextTick(this.updateIconOffset);
    }
  };
</script>
