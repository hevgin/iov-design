<template>
  <div class="el-time-range-picker__content">
    <div class="el-time-range-picker__cell">
      <div class="el-date-range-picker__header">
        <div class="el-date-picker__header">
            <div class="el-date-picker__header-label">选择时间</div>
        </div>
      </div>
      <div
        :class="{ 'has-seconds': showSeconds, 'is-arrow': arrowControl }"
        class="el-time-range-picker__body el-time-panel__content">
        <time-spinner
          ref="minSpinner"
          :show-seconds="showSeconds"
          :am-pm-mode="amPmMode"
          @change="handleMinChange"
          :arrow-control="arrowControl"
          @select-range="setMinSelectionRange"
          :date="minDate">
        </time-spinner>
      </div>
    </div>
    <div class="el-time-range-picker__cell">
      <div class="el-date-range-picker__header">
        <div class="el-date-picker__header">
            <div class="el-date-picker__header-label">选择时间</div>
        </div>
      </div>
      <div
        :class="{ 'has-seconds': showSeconds, 'is-arrow': arrowControl }"
        class="el-time-range-picker__body el-time-panel__content">
        <time-spinner
          ref="maxSpinner"
          :show-seconds="showSeconds"
          :am-pm-mode="amPmMode"
          @change="handleMaxChange"
          :arrow-control="arrowControl"
          @select-range="setMaxSelectionRange"
          :date="maxDate">
        </time-spinner>
      </div>
    </div>
  </div>
</template>

<script type="text/babel">
  import { clearMilliseconds } from 'iov-design/src/utils/date-util';
  import TimeSpinner from '../basic/time-spinner';

  export default {
    name: 'TimeRangeContent',

    components: { TimeSpinner },

    props: {
      minDate: {
        type: Date,
        default: () => new Date()
      },
      maxDate: {
        type: Date,
        default: () => new Date()
      },
      format: {
        type: String,
        default: 'HH:mm:ss'
      },
      arrowControl: {
        type: Boolean,
        default: false
      }
    },

    computed: {
      showSeconds() {
        return (this.format || '').indexOf('ss') !== -1;
      },

      amPmMode() {
        if ((this.format || '').indexOf('A') !== -1) return 'A';
        if ((this.format || '').indexOf('a') !== -1) return 'a';
        return '';
      }
    },

    methods: {
      handleMinChange(date) {
        this.$emit('pick', [clearMilliseconds(date), this.maxDate], true);
      },

      handleMaxChange(date) {
        this.$emit('pick', [this.minDate, clearMilliseconds(date)], true);
      },

      setMinSelectionRange(start, end) {
        this.$emit('select-range', start, end, 'min');
      },

      setMaxSelectionRange(start, end) {
        this.$emit('select-range', start, end, 'max');
      },

      adjustSpinners() {
        this.$refs.minSpinner && this.$refs.minSpinner.adjustSpinners();
        this.$refs.maxSpinner && this.$refs.maxSpinner.adjustSpinners();
      },

      emitSelectRange(type) {
        if (type === 'min') {
          this.$refs.minSpinner && this.$refs.minSpinner.emitSelectRange('hours');
        } else {
          this.$refs.maxSpinner && this.$refs.maxSpinner.emitSelectRange('hours');
        }
      }
    }
  };
</script>
