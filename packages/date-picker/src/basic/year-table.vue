<template>
  <table @click="handleYearTableClick" class="el-year-table" cellspacing="0" cellpadding="0">
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
      selectionMode: {}
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

        return style;
      },

      handleYearTableClick(event) {
        let target = event.target;
        if (target.tagName === 'A') target = target.parentNode.parentNode;
        if (target.tagName === 'DIV') target = target.parentNode;
        if (target.tagName !== 'TD') return;
        if (hasClass(target, 'disabled')) return;
        const year = target.textContent || target.innerText;
        if (this.selectionMode === 'years') {
          const value = this.value || [];
          const idx = arrayFindIndex(value, date => date.getFullYear() === Number(year));
          const newValue = idx > -1
            ? [...value.slice(0, idx), ...value.slice(idx + 1)]
            : [...value, new Date(year)];
          this.$emit('pick', newValue);
        } else {
          this.$emit('pick', Number(year));
        }
      }
    }
  };
</script>
