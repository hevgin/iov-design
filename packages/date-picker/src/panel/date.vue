<template>
  <transition name="el-zoom-in-top" @after-enter="handleEnter" @after-leave="handleLeave">
    <div class="el-picker-panel__main el-popper">
    <div
      v-show="visible"
      class="el-picker-panel el-date-picker"
      :class="[{
        'has-sidebar': $slots.sidebar || shortcuts,
        'has-time': showTime,
        [`el-picker-panel--${selectionMode}`]: true
      }, popperClass]">
      <div class="el-picker-panel__body-wrapper">
        <slot name="sidebar" class="el-picker-panel__sidebar"></slot>
        <div class="el-picker-panel__sidebar" v-if="shortcuts">
          <div
            type="button"
            class="el-picker-panel__shortcut"
            v-for="(shortcut, key) in shortcuts"
            :key="key"
            @click="handleShortcutClick(shortcut)">{{ shortcut.text }}</div>
        </div>
        <div class="el-picker-panel__body">
          <div
            class="el-date-picker__header"
            :class="{ 'el-date-picker__header--bordered': currentView === 'year' || currentView === 'month' || currentView === 'quarter' }"
            v-show="currentView !== 'time'">
            <i
              @click="prevYear"
              :aria-label="t(`el.datepicker.prevYear`)"
              class="el-picker-panel__icon-btn el-date-picker__prev-btn iov-icon-double-left-mini">
            </i>
            <i
              @click="prevMonth"
              v-show="currentView === 'date'"
              :aria-label="t(`el.datepicker.prevMonth`)"
              class="el-picker-panel__icon-btn el-date-picker__prev-btn iov-icon-left">
            </i>
            <span
              @click="showYearPicker"
              role="button"
              class="el-date-picker__header-label">{{ yearLabel }}</span>
              <span
              v-show="currentView === 'date'"
              class="el-date-picker__header-label">-</span>
            <span
              @click="showMonthPicker"
              v-show="currentView === 'date'"
              role="button"
              class="el-date-picker__header-label"
              :class="{ active: currentView === 'month' }">{{monthLabel}}</span>
            <i
              @click="nextYear"
              :aria-label="t(`el.datepicker.nextYear`)"
              class="el-picker-panel__icon-btn el-date-picker__next-btn iov-icon-double-right-mini">
            </i>
            <i
              @click="nextMonth"
              v-show="currentView === 'date'"
              :aria-label="t(`el.datepicker.nextMonth`)"
              class="el-picker-panel__icon-btn el-date-picker__next-btn iov-icon-right">
            </i>
          </div>

          <div
            class="el-picker-panel__content">
            <date-table
              v-show="currentView === 'date'"
              @pick="handleDatePick"
              :selection-mode="selectionMode"
              :show-week-number="selectionMode === 'week'"
              :first-day-of-week="firstDayOfWeek"
              :value="value"
              :default-value="defaultValue ? new Date(defaultValue) : null"
              :date="date"
              :cell-class-name="cellClassName"
              :disabled-date="disabledDate">
            </date-table>
            <year-table
              v-show="currentView === 'year'"
              @pick="handleYearPick"
              :selection-mode="selectionMode"
              :value="value"
              :default-value="defaultValue ? new Date(defaultValue) : null"
              :date="date"
              :disabled-date="disabledDate">
            </year-table>
            <month-table
              v-show="currentView === 'month'"
              @pick="handleMonthPick"
              :selection-mode="selectionMode"
              :value="value"
              :default-value="defaultValue ? new Date(defaultValue) : null"
              :date="date"
              :disabled-date="disabledDate">
            </month-table>
            <quarter-table
              v-show="currentView === 'quarter'"
              @pick="handleQuarterPick"
              :selection-mode="selectionMode"
              :value="value"
              :default-value="defaultValue ? new Date(defaultValue) : null"
              :date="date"
              :disabled-date="disabledDate">
            </quarter-table>
          </div>
        </div>
        <div class="el-date-picker__time-content" v-if="showTime">
          <div class="el-date-picker__header">
            <span class="el-date-picker__header-label">{{ timeLabel }}</span>
          </div>
          <time-spinner
            ref="spinner"
            @change="handleTimeSpinnerChange"
            :arrow-control="arrowControl"
            :show-seconds="showSeconds"
            :date="date">
          </time-spinner>
        </div>
      </div>

      <div v-if="showToday" class="el-picker-panel__footer">
        <el-link type="primary" size="small" @click="changeToToday">{{ t('el.datepicker.today') }}</el-link>
      </div>

      <div
        class="el-picker-panel__footer"
        :class="[{
          'el-picker-panel__footer--flex-between': selectionMode !== 'dates' && selectionMode !== 'months' && selectionMode !== 'years' && selectionMode !== 'quarters',
          'el-picker-panel__footer--flex-end': !(selectionMode !== 'dates' && selectionMode !== 'months' && selectionMode !== 'years' && selectionMode !== 'quarters')
        }]"
        v-show="footerVisible && (currentView === 'date' || currentView === 'month' || currentView === 'year' || currentView === 'quarter')">
        <el-link
          type="primary"
          size="small"
          class="el-picker-panel__link-btn"
          @click="changeToNow"
          v-show="selectionMode !== 'dates' && selectionMode !== 'months' && selectionMode !== 'years' && selectionMode !== 'quarters'">
          {{ t('el.datepicker.now') }}
        </el-link>
        <el-button
          type="info"
          size="mini"
          class="el-picker-panel__link-btn"
          @click="confirm">
          {{ t('el.datepicker.confirm') }}
        </el-button>
      </div>
    </div>
    </div>
  </transition>
</template>

<script type="text/babel">
  import {
    getWeekNumber,
    isDate,
    modifyDate,
    modifyWithTimeString,
    clearMilliseconds,
    clearTime,
    prevYear,
    nextYear,
    prevMonth,
    nextMonth,
    changeYearMonthAndClampDate,
    extractDateFormat,
    extractTimeFormat,
    timeWithinRange,
    formatDate
  } from 'iov-design/src/utils/date-util';
  import Locale from 'iov-design/src/mixins/locale';
  import ElInput from 'iov-design/packages/input';
  import ElButton from 'iov-design/packages/button';
  import TimeSpinner from '../basic/time-spinner';
  import YearTable from '../basic/year-table';
  import MonthTable from '../basic/month-table';
  import QuarterTable from '../basic/quarter-table';
  import DateTable from '../basic/date-table';

  export default {
    mixins: [Locale],

    components: {
      ElInput,
      ElButton,
      TimeSpinner,
      YearTable,
      MonthTable,
      QuarterTable,
      DateTable
    },

    watch: {
      visible(val) {
        if (val) {
          if (!isDate(this.value)) {
            this.date = this.getDefaultValue();
          }
          if (this.showTime && this.$refs.spinner) {
            this.$nextTick(() => {
              this.$refs.spinner.adjustSpinners();
            });
          }
        }
      },

      value(val) {
        if (this.selectionMode === 'dates' && this.value) return;
        if (this.selectionMode === 'months' && this.value) return;
        if (this.selectionMode === 'quarters' && this.value) return;
        if (this.selectionMode === 'years' && this.value) return;
        if (isDate(val)) {
          this.date = new Date(val);
        } else {
          this.date = this.getDefaultValue();
        }
      },

      defaultValue(val) {
        if (!isDate(this.value)) {
          this.date = val ? new Date(val) : this.getDefaultValue();
        }
      },

      selectionMode(newVal) {
        if (newVal === 'month') {
          if (this.currentView !== 'year' || this.currentView !== 'month') {
            this.currentView = 'month';
          }
        } else if (newVal === 'dates') {
          this.currentView = 'date';
        } else if (newVal === 'years') {
          this.currentView = 'year';
        } else if (newVal === 'months') {
          this.currentView = 'month';
        } else if (newVal === 'quarters') {
          this.currentView = 'quarter';
        } else if (newVal === 'quarter') {
          this.currentView = 'quarter';
        }
      }
    },

    methods: {
      handleTimeSpinnerChange(date) {
        if (isDate(date)) {
          this.date = new Date(date);
        }
      },

      handleClear() {
        this.date = this.getDefaultValue();
        this.$emit('pick', null);
      },

      emit(value, ...args) {
        if (!value) {
          this.$emit('pick', value, ...args);
        } else if (Array.isArray(value)) {
          const dates = value.map(date => this.showTime ? clearMilliseconds(date) : clearTime(date));
          this.$emit('pick', dates, ...args);
        } else {
          this.$emit('pick', this.showTime ? clearMilliseconds(value) : clearTime(value), ...args);
        }
      },

      // resetDate() {
      //   this.date = new Date(this.date);
      // },

      showMonthPicker() {
        this.currentView = 'month';
      },

      showYearPicker() {
        this.currentView = 'year';
      },

      // XXX: 没用到
      // handleLabelClick() {
      //   if (this.currentView === 'date') {
      //     this.showMonthPicker();
      //   } else if (this.currentView === 'month') {
      //     this.showYearPicker();
      //   }
      // },

      prevMonth() {
        this.date = prevMonth(this.date);
      },

      nextMonth() {
        this.date = nextMonth(this.date);
      },

      prevYear() {
        if (this.currentView === 'year') {
          this.date = prevYear(this.date, 12);
        } else {
          this.date = prevYear(this.date);
        }
      },

      nextYear() {
        if (this.currentView === 'year') {
          this.date = nextYear(this.date, 12);
        } else {
          this.date = nextYear(this.date);
        }
      },

      handleShortcutClick(shortcut) {
        if (shortcut.onClick) {
          shortcut.onClick(this);
        }
      },

      handleMonthPick(month) {
        if (this.selectionMode === 'month') {
          this.date = modifyDate(this.date, this.year, month, 1);
          this.emit(this.date);
        } else if (this.selectionMode === 'months') {
          this.emit(month, true);
        } else {
          this.date = changeYearMonthAndClampDate(this.date, this.year, month);
          // TODO: should emit intermediate value ??
          // this.emit(this.date);
          this.currentView = 'date';
        }
      },

      handleQuarterPick(quarter) {
        if (this.selectionMode === 'quarter') {
          this.date = new Date(this.year, quarter * 3, 1);
          this.emit(this.date);
        } else if (this.selectionMode === 'quarters') {
          this.emit(quarter, true);
        }
      },

      handleDatePick(value) {
        if (this.selectionMode === 'day') {
          let newDate = this.value
            ? modifyDate(this.value, value.getFullYear(), value.getMonth(), value.getDate())
            : modifyWithTimeString(value, this.defaultTime);
          // change default time while out of selectableRange
          if (!this.checkDateWithinRange(newDate)) {
            newDate = modifyDate(this.selectableRange[0][0], value.getFullYear(), value.getMonth(), value.getDate());
          }
          this.date = newDate;
          this.emit(this.date, this.showTime);
        } else if (this.selectionMode === 'week') {
          this.emit(value.date);
        } else if (this.selectionMode === 'dates') {
          this.emit(value, true); // set false to keep panel open
        }
      },

      handleYearPick(year) {
        if (this.selectionMode === 'year') {
          this.date = modifyDate(this.date, year, 0, 1);
          this.emit(this.date);
        } else if (this.selectionMode === 'years') {
          this.emit(year, true);
        } else if (this.selectionMode === 'quarter' || this.selectionMode === 'quarters') {
          this.date = modifyDate(this.date, year, 0, 1);
          this.currentView = 'quarter';
        } else {
          this.date = changeYearMonthAndClampDate(this.date, year, this.month);
          // TODO: should emit intermediate value ??
          // this.emit(this.date, true);
          this.currentView = 'month';
        }
      },

      changeToToday() {
        if ((!this.disabledDate || !this.disabledDate(new Date())) && this.checkDateWithinRange(new Date())) {
          this.date = new Date();
          this.emit(this.date);
        }
      },

      changeToNow() {
        // NOTE: not a permanent solution
        //       consider disable "now" button in the future
        if ((!this.disabledDate || !this.disabledDate(new Date())) && this.checkDateWithinRange(new Date())) {
          this.date = new Date();
          this.emit(this.date);
        }
      },

      confirm() {
        if (this.selectionMode === 'dates' || this.selectionMode === 'months' || this.selectionMode === 'years' || this.selectionMode === 'quarters') {
          this.emit(this.value);
        } else {
          this.emit(this.date);
        }
      },

      resetView() {
        if (this.selectionMode === 'month' || this.selectionMode === 'months') {
          this.currentView = 'month';
        } else if (this.selectionMode === 'quarter' || this.selectionMode === 'quarters') {
          this.currentView = 'quarter';
        } else if (this.selectionMode === 'year' || this.selectionMode === 'years') {
          this.currentView = 'year';
        } else {
          this.currentView = 'date';
        }
      },

      handleEnter() {
        document.body.addEventListener('keydown', this.handleKeydown);
      },

      handleLeave() {
        this.$emit('dodestroy');
        document.body.removeEventListener('keydown', this.handleKeydown);
      },

      handleKeydown(event) {
        const keyCode = event.keyCode;
        const list = [38, 40, 37, 39];
        if (this.visible) {
          if (list.indexOf(keyCode) !== -1) {
            this.handleKeyControl(keyCode);
            event.stopPropagation();
            event.preventDefault();
          }
          if (keyCode === 13) {
            this.emit(this.date, false);
          }
        }
      },

      handleKeyControl(keyCode) {
        const mapping = {
          'year': {
            38: -4, 40: 4, 37: -1, 39: 1, offset: (date, step) => date.setFullYear(date.getFullYear() + step)
          },
          'month': {
            38: -4, 40: 4, 37: -1, 39: 1, offset: (date, step) => date.setMonth(date.getMonth() + step)
          },
          'week': {
            38: -1, 40: 1, 37: -1, 39: 1, offset: (date, step) => date.setDate(date.getDate() + step * 7)
          },
          'day': {
            38: -7, 40: 7, 37: -1, 39: 1, offset: (date, step) => date.setDate(date.getDate() + step)
          }
        };
        const mode = this.selectionMode;
        const year = 3.1536e10;
        const now = this.date.getTime();
        const newDate = new Date(this.date.getTime());
        while (Math.abs(now - newDate.getTime()) <= year) {
          const map = mapping[mode];
          map.offset(newDate, map[keyCode]);
          if (typeof this.disabledDate === 'function' && this.disabledDate(newDate)) {
            continue;
          }
          this.date = newDate;
          this.$emit('pick', newDate, true);
          break;
        }
      },

      isValidValue(value) {
        return value && !isNaN(value) && (
          typeof this.disabledDate === 'function'
            ? !this.disabledDate(value)
            : true
        ) && this.checkDateWithinRange(value);
      },

      getDefaultValue() {
        const defaultDate = this.defaultValue ? new Date(this.defaultValue) : new Date();
        const time = this.defaultTime || '00:00:00';
        return modifyWithTimeString(defaultDate, time);
      },

      checkDateWithinRange(date) {
        return this.selectableRange.length > 0
          ? timeWithinRange(date, this.selectableRange, this.format || 'HH:mm:ss')
          : true;
      }
    },

    data() {
      return {
        popperClass: '',
        date: new Date(),
        value: '',
        defaultValue: null,
        defaultTime: null,
        showTime: false,
        selectionMode: 'day',
        shortcuts: '',
        visible: false,
        currentView: 'date',
        disabledDate: '',
        cellClassName: '',
        selectableRange: [],
        firstDayOfWeek: 7,
        showWeekNumber: false,
        format: '',
        arrowControl: false
      };
    },

    computed: {
      year() {
        return this.date.getFullYear();
      },

      month() {
        return this.date.getMonth();
      },

      week() {
        return getWeekNumber(this.date);
      },

      monthDate() {
        return this.date.getDate();
      },

      showToday() {
        return this.currentView === 'date' && !this.showTime && this.shortcuts.length === 0 && !['dates', 'months', 'years', 'quarters', 'week'].includes(this.selectionMode);
      },

      footerVisible() {
        return this.showTime || this.selectionMode === 'dates' || this.selectionMode === 'months' || this.selectionMode === 'years' || this.selectionMode === 'quarters';
      },

      yearLabel() {
        if (this.currentView === 'year') {
          const startYear = Math.floor(this.year / 12) * 12;
          return startYear + ' - ' + (startYear + 11);
        }
        return this.year;
      },

      monthLabel() {
        const value = this.month + 1;
        return value < 10 ? '0' + value : '' + value;
      },

      timeLabel() {
        return formatDate(this.date, this.timeFormat);
      },

      timeFormat() {
        if (this.format) {
          return extractTimeFormat(this.format);
        } else {
          return 'HH:mm:ss';
        }
      },

      showSeconds() {
        return (this.timeFormat || '').indexOf('ss') !== -1;
      },

      dateFormat() {
        if (this.format) {
          return extractDateFormat(this.format);
        } else {
          return 'yyyy-MM-dd';
        }
      }
    }
  };
</script>
