<template>
  <transition
    name="el-zoom-in-top"
    @after-leave="$emit('dodestroy')">
    <div class="el-picker-panel__main el-popper">
    <div
      v-show="visible"
      class="el-time-range-picker el-picker-panel"
      :class="popperClass">
      <time-range-content
        ref="content"
        :min-date="minDate"
        :max-date="maxDate"
        :format="format"
        :arrow-control="arrowControl"
        @pick="handlePick"
        @select-range="handleSelectRange">
      </time-range-content>
      <div class="el-time-panel__footer">
        <el-link
          type="primary"
          size="small"
          class="el-time-panel__btn cancel"
          @click="handleCancel()">{{ t('el.datepicker.cancel') }}</el-link>
        <el-button
          type="info"
          class="el-time-panel__btn confirm"
          size="mini"
          @click="handleConfirm()"
          :disabled="btnDisabled">{{ t('el.datepicker.confirm') }}</el-button>
      </div>
    </div>
    </div>
  </transition>
</template>

<script type="text/babel">
  import {
    parseDate,
    modifyDate
  } from 'iov-design/src/utils/date-util';
  import Locale from 'iov-design/src/mixins/locale';
  import TimeRangeContent from './time-range-content';

  const MAX_TIME = parseDate('23:59:59', 'HH:mm:ss');

  const maxTimeOfDay = function(date) {
    return modifyDate(MAX_TIME, date.getFullYear(), date.getMonth(), date.getDate());
  };

  // increase time by amount of milliseconds, but within the range of day
  const advanceTime = function(date, amount) {
    return new Date(Math.min(date.getTime() + amount, maxTimeOfDay(date).getTime()));
  };

  export default {
    mixins: [Locale],

    components: { TimeRangeContent },

    computed: {
      btnDisabled() {
        return this.minDate.getTime() > this.maxDate.getTime();
      }
    },

    data() {
      return {
        popperClass: '',
        minDate: new Date(),
        maxDate: new Date(),
        value: [],
        oldValue: [new Date(), new Date()],
        defaultValue: null,
        format: 'HH:mm:ss',
        visible: false,
        arrowControl: false
      };
    },

    watch: {
      value(value) {
        if (Array.isArray(value)) {
          this.minDate = new Date(value[0]);
          this.maxDate = new Date(value[1]);
        } else {
          if (Array.isArray(this.defaultValue)) {
            this.minDate = new Date(this.defaultValue[0]);
            this.maxDate = new Date(this.defaultValue[1]);
          } else if (this.defaultValue) {
            this.minDate = new Date(this.defaultValue);
            this.maxDate = advanceTime(new Date(this.defaultValue), 60 * 60 * 1000);
          } else {
            this.minDate = new Date();
            this.maxDate = advanceTime(new Date(), 60 * 60 * 1000);
          }
        }
      },

      visible(val) {
        if (val) {
          this.oldValue = this.value;
          this.$nextTick(() => this.$refs.content && this.$refs.content.emitSelectRange('min'));
        }
      }
    },

    methods: {
      handlePick(val) {
        if (Array.isArray(val) && val.length === 2) {
          this.minDate = val[0];
          this.maxDate = val[1];
          this.$emit('pick', val, true);
        }
      },

      handleSelectRange(start, end, pos) {
        this.$emit('select-range', start, end, pos);
      },

      handleCancel() {
        this.$emit('pick', this.oldValue);
      },

      handleConfirm(visible = false) {
        if (this.isValidValue([this.minDate, this.maxDate])) {
          this.$emit('pick', [this.minDate, this.maxDate], visible);
        }
      },

      adjustSpinners() {
        this.$refs.content && this.$refs.content.adjustSpinners();
      },

      isValidValue(date) {
        return Array.isArray(date) && date[0] && date[1] &&
          this.minDate.getTime() <= this.maxDate.getTime();
      },

      handleKeydown(event) {
        const keyCode = event.keyCode;
        const map = { 38: -1, 40: 1 };

        // Left or Right
        if (keyCode === 37 || keyCode === 39) {
          const step = keyCode === 37 ? -1 : 1;
          this.$refs.content.emitSelectRange(step < 0 ? 'max' : 'min');
          event.preventDefault();
          return;
        }

        // Up or Down
        if (map[keyCode] !== undefined) {
          const spinner = this.$refs.content.$refs.minSpinner;
          spinner.emitSelectRange('hours');
          spinner.scrollDown(map[keyCode]);
          event.preventDefault();
        }
      }
    }
  };
</script>
