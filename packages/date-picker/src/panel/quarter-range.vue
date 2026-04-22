<template>
  <transition name="el-zoom-in-top" @after-leave="$emit('dodestroy')">
    <div class="el-picker-panel__main el-popper">
    <div
      v-show="visible"
      class="el-picker-panel el-date-range-picker"
      :class="[{
        'has-sidebar': $slots.sidebar || shortcuts
      }, popperClass]">
      <div class="el-picker-panel__body-wrapper">
        <slot name="sidebar" class="el-picker-panel__sidebar"></slot>
        <div class="el-picker-panel__sidebar" v-if="shortcuts">
          <div
            type="button"
            class="el-picker-panel__shortcut"
            v-for="(shortcut, key) in shortcuts"
            :key="key"
            @click="handleShortcutClick(shortcut)">{{shortcut.text}}</div>
        </div>
        <div class="el-picker-panel__body">
          <div class="el-date-range-picker__header">
            <div class="el-date-picker__header">
              <i
                type="button"
                @click="leftPrevYear"
                class="el-picker-panel__icon-btn iov-icon-double-left-mini"></i>
              <i
                type="button"
                v-if="unlinkPanels"
                @click="enableYearArrow && leftNextYear()"
                :class="{ 'is-disabled': !enableYearArrow }"
                class="el-picker-panel__icon-btn iov-icon-double-right-mini"></i>
              <span class="el-date-picker__header-label">{{ leftLabel }}</span>
            </div>
            <div class="el-date-picker__header">
              <i
                type="button"
                v-if="unlinkPanels"
                @click="enableYearArrow && rightPrevYear()"
                :class="{ 'is-disabled': !enableYearArrow }"
                class="el-picker-panel__icon-btn iov-icon-double-left-mini"></i>
              <i
                type="button"
                @click="rightNextYear"
                class="el-picker-panel__icon-btn iov-icon-double-right-mini"></i>
              <span class="el-date-picker__header-label">{{ rightLabel }}</span>
            </div>
          </div>
          <div class="el-date-range-picker__content">
            <div class="el-picker-panel__content">
              <quarter-table
                selection-mode="range"
                :date="leftDate"
                :default-value="defaultValue"
                :min-date="minDate"
                :max-date="maxDate"
                :range-state="rangeState"
                :disabled-date="disabledDate"
                @changerange="handleChangeRange"
                @pick="handleRangePick">
              </quarter-table>
            </div>
            <div class="el-picker-panel__content">
              <quarter-table
                selection-mode="range"
                :date="rightDate"
                :default-value="defaultValue"
                :min-date="minDate"
                :max-date="maxDate"
                :range-state="rangeState"
                :disabled-date="disabledDate"
                @changerange="handleChangeRange"
                @pick="handleRangePick">
              </quarter-table>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  </transition>
</template>

<script type="text/babel">
  import {
    isDate,
    modifyWithTimeString,
    prevYear,
    nextYear
  } from 'iov-design/src/utils/date-util';
  import Locale from 'iov-design/src/mixins/locale';
  import QuarterTable from '../basic/quarter-table';

  const calcDefaultValue = (defaultValue) => {
    if (Array.isArray(defaultValue)) {
      return [new Date(defaultValue[0]), new Date(defaultValue[1])];
    } else if (defaultValue) {
      return [new Date(defaultValue), new Date(defaultValue.getFullYear(), defaultValue.getMonth() + 3)];
    } else {
      return [new Date(), new Date(new Date().getFullYear(), new Date().getMonth() + 3)];
    }
  };

  export default {
    mixins: [Locale],

    computed: {
      btnDisabled() {
        return !(this.minDate && this.maxDate && !this.rangeState.selecting && this.isValidValue([this.minDate, this.maxDate]));
      },

      leftLabel() {
        return this.leftDate.getFullYear();
      },

      rightLabel() {
        return this.rightDate.getFullYear();
      },

      leftYear() {
        return this.leftDate.getFullYear();
      },

      rightYear() {
        return this.rightDate.getFullYear() === this.leftDate.getFullYear() ? this.leftDate.getFullYear() + 1 : this.rightDate.getFullYear();
      },

      enableYearArrow() {
        return this.unlinkPanels && this.rightYear > this.leftYear + 1;
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
        rightDate: nextYear(new Date()),
        rangeState: {
          endDate: null,
          selecting: false,
          row: null,
          column: null
        },
        shortcuts: '',
        visible: '',
        disabledDate: '',
        format: '',
        arrowControl: false,
        unlinkPanels: false
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
              const maxDateYear = this.maxDate.getFullYear();
              this.rightDate = minDateYear === maxDateYear
                ? nextYear(this.maxDate)
                : this.maxDate;
            } else {
              this.rightDate = nextYear(this.leftDate);
            }
          } else {
            this.leftDate = calcDefaultValue(this.defaultValue)[0];
            this.rightDate = nextYear(this.leftDate);
          }
        }
      },

      defaultValue(val) {
        if (!Array.isArray(this.value)) {
          const [left, right] = calcDefaultValue(val);
          this.leftDate = left;
          this.rightDate = val && val[1] && left.getFullYear() !== right.getFullYear() && this.unlinkPanels
            ? right
            : nextYear(this.leftDate);
        }
      }
    },

    methods: {
      handleChangeRange(val) {
        this.minDate = val.minDate;
        this.maxDate = val.maxDate;
        this.rangeState = val.rangeState;
      },

      handleRangePick(val, close = true) {
        if (!val.maxDate) {
          close = false;
        }
        const defaultTime = this.defaultTime || [];
        const minDate = modifyWithTimeString(val.minDate, defaultTime[0]);
        const maxDate = modifyWithTimeString(val.maxDate, defaultTime[1]);
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
        if (!close) return;
        this.handleConfirm();
      },

      handleShortcutClick(shortcut) {
        if (shortcut.onClick) {
          shortcut.onClick(this);
        }
      },

      leftPrevYear() {
        this.leftDate = prevYear(this.leftDate);
        if (!this.unlinkPanels) {
          this.rightDate = prevYear(this.rightDate);
        }
      },

      rightNextYear() {
        if (!this.unlinkPanels) {
          this.leftDate = nextYear(this.leftDate);
        }
        this.rightDate = nextYear(this.rightDate);
      },

      leftNextYear() {
        this.leftDate = nextYear(this.leftDate);
      },

      rightPrevYear() {
        this.rightDate = prevYear(this.rightDate);
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
        this.minDate = this.value && isDate(this.value[0]) ? new Date(this.value[0]) : null;
        this.maxDate = this.value && isDate(this.value[1]) ? new Date(this.value[1]) : null;
      }
    },

    components: { QuarterTable }
  };
</script>
