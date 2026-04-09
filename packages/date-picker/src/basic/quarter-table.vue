<template>
  <table @click="handleQuarterTableClick" @mousemove="handleMouseMove" cellspacing="0" cellpadding="0" class="el-quarter-table">
    <tbody>
    <tr v-for="(row, key) in rows" :key="key">
      <td :class="getCellStyle(cell)" v-for="(cell, key) in row" :key="key">
        <div class="quarter-grid">
          <div class="quarter-cell">
            <a class="cell">{{ t('el.datepicker.quarters.q' + (cell.text + 1)) }}</a>
          </div>
        </div>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script type="text/babel">
  import Locale from 'iov-design/src/mixins/locale';
  import { isDate } from 'iov-design/src/utils/date-util';
  import { hasClass } from 'iov-design/src/utils/dom';
  import { arrayFindIndex, coerceTruthyValueToArray, arrayFind } from 'iov-design/src/utils/util';

  const clearDate = (date) => {
    return new Date(date.getFullYear(), Math.floor(date.getMonth() / 3) * 3);
  };

  const getQuarterTimestamp = function(time) {
    if (typeof time === 'number' || typeof time === 'string') {
      return clearDate(new Date(time)).getTime();
    } else if (time instanceof Date) {
      return clearDate(time).getTime();
    } else {
      return NaN;
    }
  };

  const removeFromArray = function(arr, pred) {
    const idx = typeof pred === 'function' ? arrayFindIndex(arr, pred) : arr.indexOf(pred);
    return idx >= 0 ? [...arr.slice(0, idx), ...arr.slice(idx + 1)] : arr;
  };

  export default {
    props: {
      disabledDate: {},
      value: {},
      selectionMode: {
        default: 'quarter'
      },
      minDate: {},
      maxDate: {},
      defaultValue: {
        validator(val) {
          return val === null || isDate(val) || (Array.isArray(val) && val.every(isDate));
        }
      },
      date: {},
      rangeState: {
        default() {
          return {
            endDate: null,
            selecting: false
          };
        }
      }
    },

    mixins: [Locale],

    watch: {
      'rangeState.endDate'(newVal) {
        this.markRange(this.minDate, newVal);
      },
      minDate(newVal, oldVal) {
        if (getQuarterTimestamp(newVal) !== getQuarterTimestamp(oldVal)) {
          this.markRange(this.minDate, this.maxDate);
        }
      },
      maxDate(newVal, oldVal) {
        if (getQuarterTimestamp(newVal) !== getQuarterTimestamp(oldVal)) {
          this.markRange(this.minDate, this.maxDate);
        }
      }
    },

    data() {
      return {
        tableRows: [[]],
        lastColumn: null
      };
    },

    methods: {
      cellMatchesDate(cell, date) {
        const value = new Date(date);
        return this.date.getFullYear() === value.getFullYear() && Number(cell.text) === Math.floor(value.getMonth() / 3);
      },
      getCellStyle(cell) {
        const style = {};
        const year = this.date.getFullYear();
        const today = new Date();
        const quarter = cell.text;
        const quarterStartMonth = quarter * 3;
        const defaultValue = this.defaultValue ? Array.isArray(this.defaultValue) ? this.defaultValue : [this.defaultValue] : [];

        const quarterStartDate = new Date(year, quarterStartMonth, 1);
        const quarterEndDate = new Date(year, quarterStartMonth + 3, 0);

        style.disabled = typeof this.disabledDate === 'function'
          ? (() => {
            const dates = [];
            const d = new Date(quarterStartDate);
            while (d <= quarterEndDate) {
              dates.push(new Date(d));
              d.setDate(d.getDate() + 1);
            }
            return dates.every(this.disabledDate);
          })()
          : false;
        style.current = arrayFindIndex(coerceTruthyValueToArray(this.value), date =>
          date.getFullYear() === year && Math.floor(date.getMonth() / 3) === quarter
        ) >= 0;
        style.today = today.getFullYear() === year && Math.floor(today.getMonth() / 3) === quarter;
        style.default = defaultValue.some(date => this.cellMatchesDate(cell, date));

        if (cell.inRange) {
          style['in-range'] = true;
          if (cell.start) style['start-date'] = true;
          if (cell.end) style['end-date'] = true;
        }
        return style;
      },
      getQuarterOfCell(quarter) {
        const year = this.date.getFullYear();
        return new Date(year, quarter * 3, 1);
      },
      markRange(minDate, maxDate) {
        minDate = getQuarterTimestamp(minDate);
        maxDate = getQuarterTimestamp(maxDate) || minDate;
        [minDate, maxDate] = [Math.min(minDate, maxDate), Math.max(minDate, maxDate)];
        const row = this.rows[0];
        for (let j = 0, l = row.length; j < l; j++) {
          const cell = row[j];
          const time = new Date(this.date.getFullYear(), j * 3).getTime();
          cell.inRange = minDate && time >= minDate && time <= maxDate;
          cell.start = minDate && time === minDate;
          cell.end = maxDate && time === maxDate;
        }
      },
      handleMouseMove(event) {
        if (!this.rangeState.selecting) return;

        let target = event.target;
        if (target.tagName === 'A') target = target.parentNode.parentNode;
        if (target.tagName === 'DIV') target = target.parentNode;
        if (target.tagName !== 'TD') return;

        const column = target.cellIndex;
        if (this.rows[0][column].disabled) return;

        if (column !== this.lastColumn) {
          this.lastColumn = column;
          this.$emit('changerange', {
            minDate: this.minDate,
            maxDate: this.maxDate,
            rangeState: {
              selecting: true,
              endDate: this.getQuarterOfCell(column)
            }
          });
        }
      },
      handleQuarterTableClick(event) {
        let target = event.target;
        if (target.tagName === 'A') target = target.parentNode.parentNode;
        if (target.tagName === 'DIV') target = target.parentNode;
        if (target.tagName !== 'TD') return;
        if (hasClass(target, 'disabled')) return;

        const column = target.cellIndex;
        const quarter = column;
        const newDate = this.getQuarterOfCell(quarter);

        if (this.selectionMode === 'range') {
          if (!this.rangeState.selecting) {
            this.$emit('pick', { minDate: newDate, maxDate: null });
            this.rangeState.selecting = true;
          } else {
            if (newDate >= this.minDate) {
              this.$emit('pick', { minDate: this.minDate, maxDate: newDate });
            } else {
              this.$emit('pick', { minDate: newDate, maxDate: this.minDate });
            }
            this.rangeState.selecting = false;
          }
        } else if (this.selectionMode === 'quarters') {
          const value = this.value || [];
          const year = this.date.getFullYear();
          const newValue = arrayFindIndex(value, date =>
            date.getFullYear() === year && Math.floor(date.getMonth() / 3) === quarter
          ) >= 0
            ? removeFromArray(value, date => date.getTime() === newDate.getTime())
            : [...value, newDate];
          this.$emit('pick', newValue);
        } else {
          this.$emit('pick', quarter);
        }
      }
    },

    computed: {
      rows() {
        const rows = this.tableRows;
        const disabledDate = this.disabledDate;
        const selectedDate = [];
        const now = getQuarterTimestamp(new Date());
        const row = rows[0];

        for (let j = 0; j < 4; j++) {
          let cell = row[j];
          if (!cell) {
            cell = { row: 0, column: j, type: 'normal', inRange: false, start: false, end: false };
          }

          cell.type = 'normal';
          const time = new Date(this.date.getFullYear(), j * 3).getTime();
          cell.inRange = time >= getQuarterTimestamp(this.minDate) && time <= getQuarterTimestamp(this.maxDate);
          cell.start = this.minDate && time === getQuarterTimestamp(this.minDate);
          cell.end = this.maxDate && time === getQuarterTimestamp(this.maxDate);

          if (time === now) cell.type = 'today';

          cell.text = j;
          let cellDate = new Date(time);
          cell.disabled = typeof disabledDate === 'function' && disabledDate(cellDate);
          cell.selected = arrayFind(selectedDate, date => date.getTime() === cellDate.getTime());

          this.$set(row, j, cell);
        }
        return rows;
      }
    }
  };
</script>
