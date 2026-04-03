<template>
  <div class="el-time-spinner" :class="{ 'has-seconds': showSeconds }">
    <div class="el-time-spinner__column">
      <i v-if="arrowControl" v-repeat-click="decrease" class="el-time-spinner__arrow iov-icon-arrow-up" @click="emitSelectRange('hours')"></i>
      <div
        class="el-time-spinner__wrapper is-snap"
        ref="hours"
        @mouseenter="emitSelectRange('hours')"
        @mousemove="adjustCurrentSpinner('hours')">
        <ul class="el-time-spinner__list">
          <li
            @click="handleClick('hours', { value: hour, disabled: disabled })"
            v-for="(disabled, hour) in hoursList"
            class="el-time-spinner__item"
            :key="hour"
            :class="{ 'active': hour === hours, 'disabled': disabled }">{{ ('0' + (amPmMode ? (hour % 12 || 12) : hour )).slice(-2) }}{{ amPm(hour) }}</li>
        </ul>
      </div>
      <i v-if="arrowControl" v-repeat-click="increase" class="el-time-spinner__arrow iov-icon-arrow-down" @click="emitSelectRange('hours')"></i>
    </div>
    <div class="el-time-spinner__column">
      <i v-if="arrowControl" v-repeat-click="decrease" class="el-time-spinner__arrow iov-icon-arrow-up" @click="emitSelectRange('minutes')"></i>
      <div
        class="el-time-spinner__wrapper is-snap"
        ref="minutes"
        @mouseenter="emitSelectRange('minutes')"
        @mousemove="adjustCurrentSpinner('minutes')">
        <ul class="el-time-spinner__list">
          <li
            @click="handleClick('minutes', { value: key, disabled: false })"
            v-for="(enabled, key) in minutesList"
            :key="key"
            class="el-time-spinner__item"
            :class="{ 'active': key === minutes, disabled: !enabled }">{{ ('0' + key).slice(-2) }}</li>
        </ul>
      </div>
      <i v-if="arrowControl" v-repeat-click="increase" class="el-time-spinner__arrow iov-icon-arrow-down" @click="emitSelectRange('minutes')"></i>
    </div>
    <div class="el-time-spinner__column" v-show="showSeconds">
      <i v-if="arrowControl" v-repeat-click="decrease" class="el-time-spinner__arrow iov-icon-arrow-up" @click="emitSelectRange('seconds')"></i>
      <div
        class="el-time-spinner__wrapper is-snap"
        ref="seconds"
        v-show="showSeconds"
        @mouseenter="emitSelectRange('seconds')"
        @mousemove="adjustCurrentSpinner('seconds')">
        <ul class="el-time-spinner__list">
          <li
            @click="handleClick('seconds', { value: key, disabled: false })"
            v-for="(second, key) in 60"
            class="el-time-spinner__item"
            :class="{ 'active': key === seconds }"
            :key="key">{{ ('0' + key).slice(-2) }}</li>
        </ul>
      </div>
      <i v-if="arrowControl" v-repeat-click="increase" class="el-time-spinner__arrow iov-icon-arrow-down" @click="emitSelectRange('seconds')"></i>
    </div>
  </div>
</template>

<script type="text/babel">
  import { getRangeHours, getRangeMinutes, modifyTime } from 'iov-design/src/utils/date-util';
  import RepeatClick from 'iov-design/src/directives/repeat-click';

  export default {
    directives: {
      repeatClick: RepeatClick
    },

    props: {
      date: {},
      defaultValue: {}, // reserved for future use
      showSeconds: {
        type: Boolean,
        default: true
      },
      arrowControl: Boolean,
      amPmMode: {
        type: String,
        default: '' // 'a': am/pm; 'A': AM/PM
      }
    },

    computed: {
      hours() {
        return this.date.getHours();
      },
      minutes() {
        return this.date.getMinutes();
      },
      seconds() {
        return this.date.getSeconds();
      },
      hoursList() {
        return getRangeHours(this.selectableRange);
      },
      minutesList() {
        return getRangeMinutes(this.selectableRange, this.hours);
      }
    },

    data() {
      return {
        selectableRange: [],
        currentScrollbar: null,
        isAdjusting: false
      };
    },

    mounted() {
      this.$nextTick(() => {
        this.bindScrollEvent();
      });
    },

    methods: {
      increase() {
        this.scrollDown(1);
      },

      decrease() {
        this.scrollDown(-1);
      },

      modifyDateField(type, value) {
        switch (type) {
          case 'hours': this.$emit('change', modifyTime(this.date, value, this.minutes, this.seconds)); break;
          case 'minutes': this.$emit('change', modifyTime(this.date, this.hours, value, this.seconds)); break;
          case 'seconds': this.$emit('change', modifyTime(this.date, this.hours, this.minutes, value)); break;
        }
      },

      handleClick(type, {value, disabled}) {
        if (!disabled) {
          this.modifyDateField(type, value);
          this.emitSelectRange(type);
          this.adjustSpinner(type, value);
        }
      },

      emitSelectRange(type) {
        if (type === 'hours') {
          this.$emit('select-range', 0, 2);
        } else if (type === 'minutes') {
          this.$emit('select-range', 3, 5);
        } else if (type === 'seconds') {
          this.$emit('select-range', 6, 8);
        }
        this.currentScrollbar = type;
      },

      bindScrollEvent() {
        const bindFunction = (type) => {
          this.$refs[type].onscroll = (e) => {
            this.handleScroll(type, e);
          };
        };
        bindFunction('hours');
        bindFunction('minutes');
        bindFunction('seconds');
      },

      handleScroll(type) {
        if (this.isAdjusting) return;
        const el = this.$refs[type];
        const itemHeight = this.typeItemHeight(type);
        const scrollTop = el.scrollTop;
        const value = Math.min(Math.round(scrollTop / itemHeight), (type === 'hours' ? 23 : 59));
        const clampedValue = Math.max(0, value);

        if (this.isDisabled(type, clampedValue)) {
          return;
        }

        this.modifyDateField(type, clampedValue);
      },

      isDisabled(type, value) {
        if (type === 'hours') {
          return this.hoursList[value];
        } else if (type === 'minutes') {
          return !this.minutesList[value];
        }
        return false;
      },

      adjustSpinners() {
        this.isAdjusting = true;
        this.removeScrollClasses();
        this.$nextTick(() => {
          this.setScrollTop('hours', this.hours);
          this.setScrollTop('minutes', this.minutes);
          this.setScrollTop('seconds', this.seconds);
          requestAnimationFrame(() => {
            this.addScrollClasses();
            this.isAdjusting = false;
          });
        });
      },

      adjustCurrentSpinner(type) {
        // this.adjustSpinner(type, this[type]);
      },

      adjustSpinner(type, value) {
        const el = this.$refs[type];
        if (el) {
          const itemHeight = this.typeItemHeight(type);
          el.classList.add('is-smooth');
          el.scrollTop = Math.max(0, value * itemHeight);
          setTimeout(() => {
            el.classList.remove('is-smooth');
          }, 300);
        }
      },

      setScrollTop(type, value) {
        const el = this.$refs[type];
        if (el) {
          const itemHeight = this.typeItemHeight(type);
          el.scrollTop = Math.max(0, value * itemHeight);
        }
      },

      removeScrollClasses() {
        ['hours', 'minutes', 'seconds'].forEach(type => {
          const el = this.$refs[type];
          if (el) {
            el.classList.remove('is-snap', 'is-smooth');
          }
        });
      },

      addScrollClasses() {
        ['hours', 'minutes', 'seconds'].forEach(type => {
          const el = this.$refs[type];
          if (el) {
            el.classList.add('is-snap', 'is-smooth');
          }
        });
      },

      scrollDown(step) {
        if (!this.currentScrollbar) {
          this.emitSelectRange('hours');
        }

        const label = this.currentScrollbar;
        const hoursList = this.hoursList;
        let now = this[label];

        if (this.currentScrollbar === 'hours') {
          let total = Math.abs(step);
          step = step > 0 ? 1 : -1;
          let length = hoursList.length;
          while (length-- && total) {
            now = (now + step + hoursList.length) % hoursList.length;
            if (hoursList[now]) {
              continue;
            }
            total--;
          }
          if (hoursList[now]) return;
        } else {
          now = (now + step + 60) % 60;
        }

        this.modifyDateField(label, now);
        this.adjustSpinner(label, now);
        this.$nextTick(() => this.emitSelectRange(this.currentScrollbar));
      },
      amPm(hour) {
        let shouldShowAmPm = this.amPmMode.toLowerCase() === 'a';
        if (!shouldShowAmPm) return '';
        let isCapital = this.amPmMode === 'A';
        let content = (hour < 12) ? ' am' : ' pm';
        if (isCapital) content = content.toUpperCase();
        return content;
      },
      typeItemHeight(type) {
        const li = this.$refs[type].querySelector('li');
        if (!li) return 28;
        const style = window.getComputedStyle(li);
        return li.offsetHeight + parseInt(style.marginBottom, 10);
      },
      scrollBarHeight(type) {
        return this.$refs[type].offsetHeight;
      }
    }
  };
</script>
