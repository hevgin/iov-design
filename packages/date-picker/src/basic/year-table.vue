<template>
  <table @click="handleYearTableClick" @mousemove="handleMouseMove" class="el-year-table" cellspacing="0" cellpadding="0">
    <tbody>
    <tr>
      <td class="available" :class="getCellStyle(startYear + 0)">
         <div class="year-grid">
          <div class="year-cell">
            <a class="cell">{{ startYear }}</a>
          </div>
         </div>
      </td>
      <td class="available" :class="getCellStyle(startYear + 1)">
        <div class="year-grid">
          <div class="year-cell">
            <a class="cell">{{ startYear + 1 }}</a>
          </div>
         </div>
      </td>
      <td class="available" :class="getCellStyle(startYear + 2)">
        <div class="year-grid">
          <div class="year-cell">
            <a class="cell">{{ startYear + 2 }}</a>
          </div>
         </div>
      </td>
    </tr>
    <tr>
      <td class="available" :class="getCellStyle(startYear + 3)">
        <div class="year-grid">
          <div class="year-cell">
            <a class="cell">{{ startYear + 3 }}</a>
          </div>
         </div>
      </td>
      <td class="available" :class="getCellStyle(startYear + 4)">
        <div class="year-grid">
          <div class="year-cell">
            <a class="cell">{{ startYear + 4 }}</a>
          </div>
         </div>
      </td>
      <td class="available" :class="getCellStyle(startYear + 5)">
        <div class="year-grid">
          <div class="year-cell">
            <a class="cell">{{ startYear + 5 }}</a>
          </div>
         </div>
      </td>
    </tr>
    <tr>
      <td class="available" :class="getCellStyle(startYear + 6)">
        <div class="year-grid">
          <div class="year-cell">
            <a class="cell">{{ startYear + 6 }}</a>
          </div>
         </div>
      </td>
      <td class="available" :class="getCellStyle(startYear + 7)">
        <div class="year-grid">
          <div class="year-cell">
            <a class="cell">{{ startYear + 7 }}</a>
          </div>
         </div>
      </td>
      <td class="available" :class="getCellStyle(startYear + 8)">
        <div class="year-grid">
          <div class="year-cell">
            <a class="cell">{{ startYear + 8 }}</a>
          </div>
         </div>
      </td>
    </tr>
    <tr>
      <td class="available" :class="getCellStyle(startYear + 9)">
        <div class="year-grid">
          <div class="year-cell">
            <a class="cell">{{ startYear + 9 }}</a>
          </div>
         </div>
      </td>
      <td class="available" :class="getCellStyle(startYear + 10)">
        <div class="year-grid">
          <div class="year-cell">
            <a class="cell">{{ startYear + 10 }}</a>
          </div>
         </div>
      </td>
      <td class="available" :class="getCellStyle(startYear + 11)">
        <div class="year-grid">
          <div class="year-cell">
            <a class="cell">{{ startYear + 11 }}</a>
          </div>
         </div>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script type="text/babel">
  import { hasClass } from 'iov-design/src/utils/dom';
  import { isDate, range, nextDate, getDayCountOfYear } from 'iov-design/src/utils/date-util';
  import { arrayFindIndex, coerceTruthyValueToArray } from 'iov-design/src/utils/util';

  const datesInYear = year => {
    const numOfDays = getDayCountOfYear(year);
    const firstDay = new Date(year, 0, 1);
    return range(numOfDays).map(n => nextDate(firstDay, n));
  };

  export default {
    props: {
      disabledDate: {},
      value: {},
      defaultValue: {
        validator(val) {
          // null or valid Date Object
          return val === null || (val instanceof Date && isDate(val));
        }
      },
      date: {},
      selectionMode: {},
      minDate: {},
      maxDate: {},
      rangeState: {
        default() {
          return {
            endDate: null,
            selecting: false
          };
        }
      }
    },

    data() {
      return {
        lastRow: null,
        lastColumn: null
      };
    },

    computed: {
      startYear() {
        return Math.floor(this.date.getFullYear() / 12) * 12;
      }
    },

    methods: {
      getCellStyle(year) {
        const style = {};
        const today = new Date();

        style.disabled = typeof this.disabledDate === 'function'
          ? datesInYear(year).every(this.disabledDate)
          : false;
        style.current = arrayFindIndex(coerceTruthyValueToArray(this.value), date => date.getFullYear() === year) >= 0;
        style.today = today.getFullYear() === year;
        style.default = this.defaultValue && this.defaultValue.getFullYear() === year;

        const minTimestamp = this.minDate ? new Date(this.minDate).getTime() : null;
        const maxTimestamp = this.maxDate ? new Date(this.maxDate).getTime() : null;

        if (this.selectionMode === 'range') {
          if (minTimestamp && maxTimestamp) {
            const minYear = new Date(minTimestamp).getFullYear();
            const maxYear = new Date(maxTimestamp).getFullYear();
            const min = Math.min(minYear, maxYear);
            const max = Math.max(minYear, maxYear);
            style['in-range'] = year >= min && year <= max;
            style['start-date'] = year === min;
            style['end-date'] = year === max;
          } else if (minTimestamp) {
            const minYear = new Date(minTimestamp).getFullYear();
            const rangeEndYear = this.rangeState.endDate ? this.rangeState.endDate.getFullYear() : null;
            if (rangeEndYear !== null) {
              const s = Math.min(minYear, rangeEndYear);
              const e = Math.max(minYear, rangeEndYear);
              style['in-range'] = year >= s && year <= e;
              style['start-date'] = year === s;
              style['end-date'] = year === e;
            }
          }
        }

        return style;
      },

      handleMouseMove(event) {
        if (!this.rangeState.selecting) return;

        let target = event.target;
        if (target.tagName === 'A') target = target.parentNode.parentNode;
        if (target.tagName === 'DIV') target = target.parentNode;
        if (target.tagName !== 'TD') return;

        const row = target.parentNode.rowIndex;
        const column = target.cellIndex;
        const year = this.startYear + row * 3 + column;

        if (typeof this.disabledDate === 'function' && datesInYear(year).every(this.disabledDate)) return;

        if (row !== this.lastRow || column !== this.lastColumn) {
          this.lastRow = row;
          this.lastColumn = column;
          this.$emit('changerange', {
            minDate: this.minDate,
            maxDate: this.maxDate,
            rangeState: {
              selecting: true,
              endDate: new Date(year, 0, 1)
            }
          });
        }
      },

      handleYearTableClick(event) {
        let target = event.target;
        if (target.tagName === 'A') target = target.parentNode.parentNode;
        if (target.tagName === 'DIV') target = target.parentNode;
        if (target.tagName !== 'TD') return;
        if (hasClass(target, 'disabled')) return;
        const row = target.parentNode.rowIndex;
        const column = target.cellIndex;
        const year = this.startYear + row * 3 + column;

        if (this.selectionMode === 'range') {
          if (!this.rangeState.selecting) {
            this.$emit('pick', { minDate: new Date(year, 0, 1), maxDate: null });
            this.rangeState.selecting = true;
          } else {
            const minYear = this.minDate.getFullYear();
            const newStart = Math.min(minYear, year);
            const newEnd = Math.max(minYear, year);
            this.$emit('pick', { minDate: new Date(newStart, 0, 1), maxDate: new Date(newEnd, 11, 31) });
            this.rangeState.selecting = false;
          }
        } else if (this.selectionMode === 'years') {
          const value = this.value || [];
          const idx = arrayFindIndex(value, date => date.getFullYear() === year);
          const newValue = idx > -1
            ? [...value.slice(0, idx), ...value.slice(idx + 1)]
            : [...value, new Date(year, 0, 1)];
          this.$emit('pick', newValue);
        } else {
          this.$emit('pick', year);
        }
      }
    }
  };
</script>
