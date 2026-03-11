<template>
  <transition name="el-zoom-in-top">
    <div
      class="el-table-search"
      v-clickoutside="handleOutsideClick"
      v-show="showPopper">
      <div class="el-table-search__content">
        <el-input
          v-model="searchValue"
          size="small"
          :placeholder="column && column.searchPlaceholder"
          @keyup.enter.native="handleConfirm"
          clearable
          ref="searchInput">
        </el-input>
      </div>
      <div class="el-table-search__bottom">
        <el-button size="mini" @click="handleReset" :disabled="!searchValue">重置</el-button>
        <el-button size="mini" type="info" icon="iov-icon-search" @click="handleConfirm">搜索</el-button>
      </div>
    </div>
  </transition>
</template>

<script type="text/babel">
  import Popper from 'iov-design/src/utils/vue-popper';
  import { PopupManager } from 'iov-design/src/utils/popup';
  import Clickoutside from 'iov-design/src/utils/clickoutside';
  import Dropdown from './dropdown';
  import ElInput from 'iov-design/packages/input';

  export default {
    name: 'ElTableSearchPanel',

    mixins: [Popper],

    directives: {
      Clickoutside
    },

    components: {
      ElInput
    },

    props: {
      placement: {
        type: String,
        default: 'bottom'
      }
    },

    data() {
      return {
        table: null,
        cell: null,
        column: null,
        searchValue: ''
      };
    },

    computed: {
      currentSearchValue() {
        return this.column && this.column.searchedValue || '';
      }
    },

    watch: {
      showPopper(value) {
        if (this.column) this.column.searchOpened = value;
        if (value) {
          // 打开时同步当前已搜索的值
          this.searchValue = this.currentSearchValue;
          this.$nextTick(() => {
            this.$refs.searchInput && this.$refs.searchInput.focus();
          });
          Dropdown.open(this);
          if (parseInt(this.popperJS._popper.style.zIndex, 10) < PopupManager.zIndex) {
            this.popperJS._popper.style.zIndex = PopupManager.nextZIndex();
          }
        } else {
          Dropdown.close(this);
        }
      }
    },

    methods: {
      handleOutsideClick() {
        setTimeout(() => {
          this.showPopper = false;
        }, 16);
      },

      handleConfirm() {
        this.confirmSearch(this.searchValue);
        this.handleOutsideClick();
      },

      handleReset() {
        this.searchValue = '';
        this.confirmSearch('');
        this.handleOutsideClick();
      },

      confirmSearch(value) {
        this.table.store.commit('searchChange', {
          column: this.column,
          value
        });
        if (this.column) {
          this.$set(this.column, 'searchedValue', value);
        }
      }
    },

    mounted() {
      this.popperElm = this.$el;
      this.referenceElm = this.cell;
      this.table.bodyWrapper.addEventListener('scroll', () => {
        this.updatePopper();
      });
    }
  };
</script>
