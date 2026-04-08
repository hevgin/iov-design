<template>
  <transition name="el-zoom-in-top" @after-leave="$emit('dodestroy')">
    <div class="el-picker-panel__main el-popper">
    <div
      v-show="visible"
      class="el-picker-panel el-date-range-picker"
      :class="[{
        'has-sidebar': $slots.sidebar || shortcuts,
        'has-time': showTime
      }, popperClass]">
      <div class="el-picker-panel__body-wrapper">
        <slot name="sidebar" class="el-picker-panel__sidebar"></slot>
        <div class="el-picker-panel__sidebar" v-if="shortcuts">
          <div
            class="el-picker-panel__shortcut"
            v-for="(shortcut, key) in shortcuts"
            :key="key"
            @click="handleShortcutClick(shortcut)">{{shortcut.text}}</div>
        </div>
        <div class="el-picker-panel__body">
          <div class="el-date-range-picker__header" v-show="currentView === 'date'">
            <div class="el-date-picker__header">
              <i
                @click="leftPrevYear"
                class="el-picker-panel__icon-btn el-date-picker__prev-btn iov-icon-double-left-mini"></i>
              <i
                @click="leftPrevMonth"
                class="el-picker-panel__icon-btn el-date-picker__prev-btn iov-icon-left"></i>
              <i
                @click="enableYearArrow && leftNextYear()"
                v-if="unlinkPanels"
                :class="{ 'is-disabled': !enableYearArrow }"
                class="el-picker-panel__icon-btn el-date-picker__next-btn iov-icon-double-right-mini"></i>
              <i
                @click="enableMonthArrow && leftNextMonth()"
                v-if="unlinkPanels"
                :class="{ 'is-disabled': !enableMonthArrow }"
                class="el-picker-panel__icon-btn el-date-picker__next-btn iov-icon-right"></i>
              <div class="el-date-picker__header-label">{{ leftLabel }}</div>
            </div>
            <div class="el-date-picker__header">
              <i
                @click="enableYearArrow && rightPrevYear()"
                v-if="unlinkPanels"
                :class="{ 'is-disabled': !enableYearArrow }"
                class="el-picker-panel__icon-btn el-date-picker__prev-btn iov-icon-double-left-mini"></i>
              <i
                @click="enableMonthArrow && rightPrevMonth()"
                v-if="unlinkPanels"
                :class="{ 'is-disabled': !enableMonthArrow }"
                class="el-picker-panel__icon-btn el-date-picker__prev-btn iov-icon-left"></i>
              <i
                @click="rightNextYear"
                class="el-picker-panel__icon-btn el-date-picker__next-btn iov-icon-double-right-mini"></i>
              <i
                @click="rightNextMonth"
                class="el-picker-panel__icon-btn el-date-picker__next-btn iov-icon-right"></i>
              <div class="el-date-picker__header-label">{{ rightLabel }}</div>
            </div>
          </div>
          <div class="el-date-range-picker__content" v-show="currentView === 'date'">
            <div class="el-picker-panel__content is-left">
              <date-table
                selection-mode="range"
                :date="leftDate"
                :default-value="defaultValue"
                :min-date="minDate"
                :max-date="maxDate"
                :range-state="rangeState"
                :disabled-date="disabledDate"
                :cell-class-name="cellClassName"
                @changerange="handleChangeRange"
                :first-day-of-week="firstDayOfWeek"
                @pick="handleRangePick">
              </date-table>
            </div>
            <div class="el-picker-panel__content is-right">
              <date-table
                selection-mode="range"
                :date="rightDate"
                :default-value="defaultValue"
                :min-date="minDate"
                :max-date="maxDate"
                :range-state="rangeState"
                :disabled-date="disabledDate"
                :cell-class-name="cellClassName"
                @changerange="handleChangeRange"
                :first-day-of-week="firstDayOfWeek"
                @pick="handleRangePick">
              </date-table>
            </div>
          </div>
          <time-range-content
            v-if="showTime"
            ref="timeRangeContent"
            v-show="currentView === 'time'"
            :min-date="minDate || new Date()"
            :max-date="maxDate || new Date()"
            :format="timeFormat"
            :arrow-control="arrowControl"
            @pick="handleTimePick"
            @select-range="handleTimeSelectRange">
          </time-range-content>
          <div v-if="showTime" class="el-date-range-picker__content">
            <div class="el-date-range-picker__now">
              <div class="el-date-range-picker__date" :class="{ 'is-active': currentView === 'date' }" @click="switchToDateView"><i class="iov-icon-date"></i>{{ minDateLabel }}</div>
              <div class="el-date-range-picker__time" :class="{ 'is-active': currentView === 'time' }" @click="switchToTimeView"><i class="iov-icon-time"></i>{{ minTimeLabel }}</div>
            </div>
            <div class="el-date-range-picker__now">
              <div class="el-date-range-picker__date" :class="{ 'is-active': currentView === 'date' }" @click="switchToDateView"><i class="iov-icon-date"></i>{{ maxDateLabel }}</div>
              <div class="el-date-range-picker__time" :class="{ 'is-active': currentView === 'time' }" @click="switchToTimeView"><i class="iov-icon-time"></i>{{ maxTimeLabel }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="el-picker-panel__footer el-picker-panel__footer--flex-end" v-if="showTime">
        <!-- <el-link
          type="primary"
          size="small"
          class="el-picker-panel__link-btn"
          @click="handleClear">
          {{ t('el.datepicker.clear') }}
        </el-link> -->
        <el-button
          type="info"
          size="mini"
          class="el-picker-panel__link-btn"
          :disabled="btnDisabled"
          @click="handleConfirm(false)">
          {{ t('el.datepicker.confirm') }}
        </el-button>
      </div>
    </div>
    </div>
  </transition>
</template>

<script type="text/babel">
  import {
    formatDate,
    isDate,
    modifyWithTimeString,
    prevYear,
    nextYear,
    prevMonth,
    nextMonth,
    nextDate,
    extractDateFormat,
    extractTimeFormat
  } from 'iov-design/src/utils/date-util';
  import Locale from 'iov-design/src/mixins/locale';
  import DateTable from '../basic/date-table';
  import TimeRangeContent from './time-range-content';
  import ElButton from 'iov-design/packages/button';

  const calcDefaultValue = (defaultValue) => {
    if (Array.isArray(defaultValue)) {
      return [new Date(defaultValue[0]), new Date(defaultValue[1])];
    } else if (defaultValue) {
      return [new Date(defaultValue), nextDate(new Date(defaultValue), 1)];
    } else {
      return [new Date(), nextDate(new Date(), 1)];
    }
  };

  export default {
    mixins: [Locale],

    computed: {
      btnDisabled() {
        return !(this.minDate && this.maxDate && !this.rangeState.selecting && this.isValidValue([this.minDate, this.maxDate]));
      },

      minDateLabel() {
        if (this.minDate) {
          return formatDate(this.minDate, this.dateFormat);
        }
        return formatDate(new Date(), this.dateFormat);
      },

      maxDateLabel() {
        if (this.minDate && this.rangeState && this.rangeState.selecting && this.rangeState.endDate) {
          return formatDate(this.rangeState.endDate, this.dateFormat);
        }
        if (this.maxDate) {
          return formatDate(this.maxDate, this.dateFormat);
        }
        return formatDate(new Date(), this.dateFormat);
      },

      minTimeLabel() {
        if (this.minDate) return formatDate(this.minDate, this.timeFormat);
        const defaultTime = this.defaultTime || [];
        return defaultTime[0] || this.timeFormat.replace(/[Hms]/g, '0');
      },

      maxTimeLabel() {
        if (this.maxDate) return formatDate(this.maxDate, this.timeFormat);
        const defaultTime = this.defaultTime || [];
        return (defaultTime.length > 1 ? defaultTime[1] : defaultTime[0]) || this.timeFormat.replace(/[Hms]/g, '0');
      },

      leftLabel() {
        return this.leftDate.getFullYear() + '-' + ((this.leftDate.getMonth() + 1) < 10 ? '0' + (this.leftDate.getMonth() + 1) : (this.leftDate.getMonth() + 1));
      },

      rightLabel() {
        return this.rightDate.getFullYear() + '-' + ((this.rightDate.getMonth() + 1) < 10 ? '0' + (this.rightDate.getMonth() + 1) : (this.rightDate.getMonth() + 1));
      },

      leftYear() {
        return this.leftDate.getFullYear();
      },

      leftMonth() {
        return this.leftDate.getMonth();
      },

      leftMonthDate() {
        return this.leftDate.getDate();
      },

      rightYear() {
        return this.rightDate.getFullYear();
      },

      rightMonth() {
        return this.rightDate.getMonth();
      },

      rightMonthDate() {
        return this.rightDate.getDate();
      },

      timeFormat() {
        if (this.format) {
          return extractTimeFormat(this.format);
        } else {
          return 'HH:mm:ss';
        }
      },

      dateFormat() {
        if (this.format) {
          return extractDateFormat(this.format);
        } else {
          return 'yyyy-MM-dd';
        }
      },

      enableMonthArrow() {
        const nextMonth = (this.leftMonth + 1) % 12;
        const yearOffset = this.leftMonth + 1 >= 12 ? 1 : 0;
        return this.unlinkPanels && new Date(this.leftYear + yearOffset, nextMonth) < new Date(this.rightYear, this.rightMonth);
      },

      enableYearArrow() {
        return this.unlinkPanels && this.rightYear * 12 + this.rightMonth - (this.leftYear * 12 + this.leftMonth + 1) >= 12;
      }
    },

    data() {
      return {
        popperClass: '',
        value: [],
        defaultValue: null,
        defaultTime: null,
        minDate: '',
        maxDate: '',
        leftDate: new Date(),
        rightDate: nextMonth(new Date()),
        rangeState: {
          endDate: null,
          selecting: false,
          row: null,
          column: null
        },
        showTime: false,
        shortcuts: '',
        visible: '',
        disabledDate: '',
        cellClassName: '',
        firstDayOfWeek: 7,
        format: '',
        arrowControl: false,
        unlinkPanels: false,
        currentView: 'date'
      };
    },

    watch: {
      value(newVal) {
        if (!newVal) {
          this.minDate = null;
          this.maxDate = null;
        } else if (Array.isArray(newVal)) {
          this.minDate = isDate(newVal[0]) ? new Date(newVal[0]) : null;
          this.maxDate = isDate(newVal[1]) ? new Date(newVal[1]) : null;
          if (this.minDate) {
            this.leftDate = this.minDate;
            if (this.unlinkPanels && this.maxDate) {
              const minDateYear = this.minDate.getFullYear();
              const minDateMonth = this.minDate.getMonth();
              const maxDateYear = this.maxDate.getFullYear();
              const maxDateMonth = this.maxDate.getMonth();
              this.rightDate = minDateYear === maxDateYear && minDateMonth === maxDateMonth
                ? nextMonth(this.maxDate)
                : this.maxDate;
            } else {
              this.rightDate = nextMonth(this.leftDate);
            }
          } else {
            this.leftDate = calcDefaultValue(this.defaultValue)[0];
            this.rightDate = nextMonth(this.leftDate);
          }
        }
      },

      defaultValue(val) {
        if (!Array.isArray(this.value)) {
          const [left, right] = calcDefaultValue(val);
          this.leftDate = left;
          this.rightDate = val && val[1] && this.unlinkPanels
            ? right
            : nextMonth(this.leftDate);
        }
      }
    },

    methods: {
      switchToTimeView() {
        if (!this.showTime) return;
        this.currentView = 'time';
        this.$nextTick(() => {
          this.$refs.timeRangeContent && this.$refs.timeRangeContent.adjustSpinners();
        });
      },

      switchToDateView() {
        this.currentView = 'date';
      },

      handleTimePick(val) {
        if (Array.isArray(val) && val.length === 2) {
          this.minDate = val[0];
          this.maxDate = val[1];
        }
      },

      handleTimeSelectRange(start, end, pos) {
        this.$emit('select-range', start, end, pos);
      },

      handleClear() {
        this.minDate = null;
        this.maxDate = null;
        this.leftDate = calcDefaultValue(this.defaultValue)[0];
        this.rightDate = nextMonth(this.leftDate);
        this.$emit('pick', null);
      },

      handleChangeRange(val) {
        this.minDate = val.minDate;
        this.maxDate = val.maxDate;
        this.rangeState = val.rangeState;
      },

      handleRangePick(val, close = true) {
        // 第一次点击只选了开始日期，不关闭弹窗
        if (!val.maxDate) {
          close = false;
        }
        const defaultTime = this.defaultTime || ['00:00:00', '00:00:00'];
        const startTime = defaultTime[0] || '00:00:00';
        const endTime = defaultTime.length > 1 ? (defaultTime[1] || startTime) : startTime;
        let minDate = val.minDate;
        let maxDate = val.maxDate || val.minDate;

        // 如果结束时间小于开始时间，则交换
        if (maxDate < minDate) {
          [minDate, maxDate] = [maxDate, minDate];
        }

        // 如果已有默认值，保留原有时间；否则使用 defaultTime
        if (this.minDate && this.value && this.value[0]) {
          minDate = modifyWithTimeString(minDate, formatDate(this.value[0], 'HH:mm:ss'));
        } else {
          minDate = modifyWithTimeString(minDate, startTime);
        }

        if (this.maxDate && this.value && this.value[1]) {
          maxDate = modifyWithTimeString(maxDate, formatDate(this.value[1], 'HH:mm:ss'));
        } else {
          maxDate = modifyWithTimeString(maxDate, endTime);
        }

        if (this.maxDate === maxDate && this.minDate === minDate) {
          return;
        }
        this.onPick && this.onPick(val);
        this.maxDate = maxDate;
        this.minDate = minDate;

        setTimeout(() => {
          this.maxDate = maxDate;
          this.minDate = minDate;
        }, 10);
        if (!close || this.showTime) return;
        this.handleConfirm();
      },

      handleShortcutClick(shortcut) {
        if (shortcut.onClick) {
          shortcut.onClick(this);
        }
      },

      // leftPrev*, rightNext* need to take care of `unlinkPanels`
      leftPrevYear() {
        this.leftDate = prevYear(this.leftDate);
        if (!this.unlinkPanels) {
          this.rightDate = nextMonth(this.leftDate);
        }
      },

      leftPrevMonth() {
        this.leftDate = prevMonth(this.leftDate);
        if (!this.unlinkPanels) {
          this.rightDate = nextMonth(this.leftDate);
        }
      },

      rightNextYear() {
        if (!this.unlinkPanels) {
          this.leftDate = nextYear(this.leftDate);
          this.rightDate = nextMonth(this.leftDate);
        } else {
          this.rightDate = nextYear(this.rightDate);
        }
      },

      rightNextMonth() {
        if (!this.unlinkPanels) {
          this.leftDate = nextMonth(this.leftDate);
          this.rightDate = nextMonth(this.leftDate);
        } else {
          this.rightDate = nextMonth(this.rightDate);
        }
      },

      // leftNext*, rightPrev* are called when `unlinkPanels` is true
      leftNextYear() {
        this.leftDate = nextYear(this.leftDate);
      },

      leftNextMonth() {
        this.leftDate = nextMonth(this.leftDate);
      },

      rightPrevYear() {
        this.rightDate = prevYear(this.rightDate);
      },

      rightPrevMonth() {
        this.rightDate = prevMonth(this.rightDate);
      },

      handleConfirm(visible = false) {
        if (this.isValidValue([this.minDate, this.maxDate])) {
          this.$emit('pick', [this.minDate, this.maxDate], visible);
        }
      },

      isValidValue(value) {
        return Array.isArray(value) &&
          value && value[0] && value[1] &&
          isDate(value[0]) && isDate(value[1]) &&
          value[0].getTime() <= value[1].getTime() && (
          typeof this.disabledDate === 'function'
            ? !this.disabledDate(value[0]) && !this.disabledDate(value[1])
            : true
        );
      },

      resetView() {
        // NOTE: this is a hack to reset {min, max}Date on picker open.
        // TODO: correct way of doing so is to refactor {min, max}Date to be dependent on value and internal selection state
        //       an alternative would be resetView whenever picker becomes visible, should also investigate date-panel's resetView
        if (this.minDate && this.maxDate == null) this.rangeState.selecting = false;
        this.minDate = this.value && isDate(this.value[0]) ? new Date(this.value[0]) : null;
        this.maxDate = this.value && isDate(this.value[1]) ? new Date(this.value[1]) : null;
        this.currentView = 'date';
      }
    },

    components: { DateTable, TimeRangeContent, ElButton }
  };
</script>
