import Vue from 'vue';
import { hasClass, addClass, removeClass } from 'iov-design/src/utils/dom';
import ElCheckbox from 'iov-design/packages/checkbox';
import FilterPanel from './filter-panel.vue';
import LayoutObserver from './layout-observer';
import { mapStates } from './store/helper';
import { toggleRowStatus } from './util';

const getAllColumns = (columns) => {
  const result = [];
  columns.forEach((column) => {
    if (column.children) {
      result.push(column);
      result.push.apply(result, getAllColumns(column.children));
    } else {
      result.push(column);
    }
  });
  return result;
};

const convertToRows = (originColumns) => {
  let maxLevel = 1;
  const traverse = (column, parent) => {
    if (parent) {
      column.level = parent.level + 1;
      if (maxLevel < column.level) {
        maxLevel = column.level;
      }
    }
    if (column.children) {
      let colSpan = 0;
      column.children.forEach((subColumn) => {
        traverse(subColumn, column);
        colSpan += subColumn.colSpan;
      });
      column.colSpan = colSpan;
    } else {
      column.colSpan = 1;
    }
  };

  originColumns.forEach((column) => {
    column.level = 1;
    traverse(column);
  });

  const rows = [];
  for (let i = 0; i < maxLevel; i++) {
    rows.push([]);
  }

  const allColumns = getAllColumns(originColumns);

  allColumns.forEach((column) => {
    if (!column.children) {
      column.rowSpan = maxLevel - column.level + 1;
    } else {
      column.rowSpan = 1;
    }
    rows[column.level - 1].push(column);
  });

  return rows;
};

export default {
  name: 'ElTableHeader',

  mixins: [LayoutObserver],

  render(h) {
    const originColumns = this.store.states.originColumns;
    const columnRows = convertToRows(originColumns, this.columns);
    // 是否拥有多级表头
    const isGroup = columnRows.length > 1;
    if (isGroup) this.$parent.isGroup = true;
    return (
      <table
        class="el-table__header"
        cellspacing="0"
        cellpadding="0"
        border="0">
        <colgroup>
          {
            this.columns.map(column => <col name={ column.id } key={column.id} />)
          }
          {
            this.hasGutter ? <col name="gutter" /> : ''
          }
        </colgroup>
        <thead class={ [{ 'is-group': isGroup, 'has-gutter': this.hasGutter }] }>
          {
            this._l(columnRows, (columns, rowIndex) =>
              <tr
                style={ this.getHeaderRowStyle(rowIndex) }
                class={ this.getHeaderRowClass(rowIndex) }
              >
                {
                  columns.map((column, cellIndex) => (<th
                    colspan={ column.colSpan }
                    rowspan={ column.rowSpan }
                    on-mousemove={ ($event) => this.handleMouseMove($event, column) }
                    on-mouseout={ this.handleMouseOut }
                    on-mousedown={ ($event) => this.handleMouseDown($event, column) }
                    on-click={ ($event) => this.handleHeaderClick($event, column) }
                    on-contextmenu={ ($event) => this.handleHeaderContextMenu($event, column) }
                    style={ this.getHeaderCellStyle(rowIndex, cellIndex, columns, column) }
                    class={ this.getHeaderCellClass(rowIndex, cellIndex, columns, column) }
                    key={ column.id }>
                    <div class={ ['cell', column.filteredValue && column.filteredValue.length > 0 ? 'highlight' : '', column.labelClassName] }>
                      {
                        column.renderHeader
                          ? column.renderHeader.call(this._renderProxy, h, { column, $index: cellIndex, store: this.store, _self: this.$parent.$vnode.context })
                          : column.label
                      }
                      {
                        column.sortable ? (<span
                          class="caret-wrapper"
                          on-click={ ($event) => this.handleSortClick($event, column) }>
                          <i class="sort-caret ascending"
                            on-click={ ($event) => this.handleSortClick($event, column, 'ascending') }>
                          </i>
                          <i class="sort-caret descending"
                            on-click={ ($event) => this.handleSortClick($event, column, 'descending') }>
                          </i>
                        </span>) : ''
                      }
                      {
                        column.filterable ? (<span
                          class="el-table__column-filter-trigger"
                          on-click={ ($event) => this.handleFilterClick($event, column) }>
                          <i class={ ['el-icon-arrow-down', column.filterOpened ? 'el-icon-arrow-up' : ''] }></i>
                        </span>) : ''
                      }
                    </div>
                  </th>))
                }
                {
                  this.hasGutter ? <th class="el-table__cell gutter"></th> : ''
                }
              </tr>
            )
          }
        </thead>
      </table>
    );
  },

  props: {
    fixed: String,
    store: {
      required: true
    },
    border: Boolean,
    defaultSort: {
      type: Object,
      default() {
        return {
          prop: '',
          order: ''
        };
      }
    }
  },

  components: {
    ElCheckbox
  },

  computed: {
    table() {
      return this.$parent;
    },

    hasGutter() {
      return !this.fixed && this.tableLayout.gutterWidth;
    },

    ...mapStates({
      columns: 'columns',
      isAllSelected: 'isAllSelected',
      leftFixedLeafCount: 'fixedLeafColumnsLength',
      rightFixedLeafCount: 'rightFixedLeafColumnsLength',
      columnsCount: states => states.columns.length,
      leftFixedCount: states => states.fixedColumns.length,
      rightFixedCount: states => states.rightFixedColumns.length
    })
  },

  watch: {
    'store.states.data': {
      handler() {
        const { states } = this.store;
        const { data = [], selection } = states;
        const { rowKey } = this.table;
        // 全选所有页
        if (this.store.states.isCrossPageSelection) {

          states.isAllSelected = true;

          data.forEach((row, index) => {
            if (states.selectable) {
              if (states.selectable.call(null, row, index)) {
                // 如果已勾选数据中不包含当前页数据(如跳转至新的一页), 则勾选
                if (!selection.some(o => o[rowKey] === row[rowKey])) {
                  toggleRowStatus(selection, row, true);
                }
                if (states.unSelectedRow.some(o => o[rowKey] === row[rowKey])) {
                  // 如果取消勾选数据中包含当前页数据项, 则取消勾选
                  toggleRowStatus(selection, row, false);
                  states.isAllSelected = false;
                }
              }
            } else {
              // 如果已勾选数据中不包含当前页数据(如跳转至新的一页), 则勾选
              if (!selection.some(o => o[rowKey] === row[rowKey])) {
                toggleRowStatus(selection, row, true);
              }
              // 如果取消勾选数据中包含当前页数据项, 则取消勾选
              if (states.unSelectedRow.some(o => o[rowKey] === row[rowKey])) {
                toggleRowStatus(selection, row, false);
                states.isAllSelected = false;
              }
            }
          });
          // console.log(states, 'states===========================');
        } else {
          // states.isAllSelected = false;
          states.selection = [];
        }
      },
      deep: true
    }
  },

  created() {
    this.filterPanels = {};
  },

  mounted() {
    // nextTick 是有必要的 https://github.com/ElemeFE/element/pull/11311
    this.$nextTick(() => {
      const { prop, order } = this.defaultSort;
      const init = true;
      this.store.commit('sort', { prop, order, init });
    });
  },

  beforeDestroy() {
    const panels = this.filterPanels;
    for (let prop in panels) {
      if (panels.hasOwnProperty(prop) && panels[prop]) {
        panels[prop].$destroy(true);
      }
    }
  },

  methods: {
    isCellHidden(index, columns) {
      let start = 0;
      for (let i = 0; i < index; i++) {
        start += columns[i].colSpan;
      }
      const after = start + columns[index].colSpan - 1;
      if (this.fixed === true || this.fixed === 'left') {
        return after >= this.leftFixedLeafCount;
      } else if (this.fixed === 'right') {
        return start < this.columnsCount - this.rightFixedLeafCount;
      } else {
        return (after < this.leftFixedLeafCount) || (start >= this.columnsCount - this.rightFixedLeafCount);
      }
    },

    getHeaderRowStyle(rowIndex) {
      const headerRowStyle = this.table.headerRowStyle;
      if (typeof headerRowStyle === 'function') {
        return headerRowStyle.call(null, { rowIndex });
      }
      return headerRowStyle;
    },

    getHeaderRowClass(rowIndex) {
      const classes = [];

      const headerRowClassName = this.table.headerRowClassName;
      if (typeof headerRowClassName === 'string') {
        classes.push(headerRowClassName);
      } else if (typeof headerRowClassName === 'function') {
        classes.push(headerRowClassName.call(null, { rowIndex }));
      }

      return classes.join(' ');
    },

    getHeaderCellStyle(rowIndex, columnIndex, row, column) {
      const headerCellStyle = this.table.headerCellStyle;
      if (typeof headerCellStyle === 'function') {
        return headerCellStyle.call(null, {
          rowIndex,
          columnIndex,
          row,
          column
        });
      }
      return headerCellStyle;
    },

    getHeaderCellClass(rowIndex, columnIndex, row, column) {
      const classes = [column.id, column.order, column.headerAlign, column.className, column.labelClassName];

      if (rowIndex === 0 && this.isCellHidden(columnIndex, row)) {
        classes.push('is-hidden');
      }

      if (!column.children) {
        classes.push('is-leaf');
      }

      if (column.sortable) {
        classes.push('is-sortable');
      }

      const headerCellClassName = this.table.headerCellClassName;
      if (typeof headerCellClassName === 'string') {
        classes.push(headerCellClassName);
      } else if (typeof headerCellClassName === 'function') {
        classes.push(headerCellClassName.call(null, {
          rowIndex,
          columnIndex,
          row,
          column
        }));
      }

      classes.push('el-table__cell');

      return classes.join(' ');
    },

    toggleAllSelection() {
      this.store.commit('toggleAllSelection');
    },

    /**
    * 下拉框出现/隐藏事件
    * @param  {bol} visible 出现/隐藏
    */
    onVisibleChange(v) {
      this.store.states.showSelectionDropdown = v;
    },

    /**
    * 选择数据事件
    * @param  {num} command 选择事件类型 1-全选当前页 2-清空当前页 3-全选所有页 4-清空所有页
    */
    onCommand(command) {
      this.store.states.selectionType = command;
      const { states } = this.store;
      const { data = [], selection } = states;
      // console.log(this, 'this===========================');

      switch (command) {
        // 全选当前页
        case 1:
          states.isAllSelected = true;
          data.forEach((row, index) => {
            if (states.selectable) {
              if (states.selectable.call(null, row, index)) {
                toggleRowStatus(selection, row, true);
              }
            } else {
              toggleRowStatus(selection, row, true);
            }
          });
          // console.log(states, 'states1===========================');
          // 先点击跨页全选，再点击清空当前页/取消几条勾选数据, 最后点击全选当前页
          if (states.isCrossPageSelection) {
            // 重新计算未选中数据
            this.store.getUnSelectedRow(states.selection);
            // 触发el-table的'selection-change'事件
            this.table.$listeners['selection-change'](states.unSelectedRow, true);
          } else {
            this.table.$listeners['selection-change'](this.table.selection, false);
          }
          break;
          // 清空当前页
        case 2:
          // 先点击跨页选择，再点击清空当前页
          if (states.isCrossPageSelection) {
            // 标记当前页未选中, 如果有选中的数据，清空选中数据
            states.isAllSelected = false;
            const oldSelection = states.selection;
            // 表格中有选中的数据项是disabled状态时，清空时保留该数据
            const isDisabledSelection = states.data.filter((row, index) => {
              // 判断selectable是不可选中状态, 且当前数据项已被选中
              if (states.selectable && !states.selectable.call(null, row, index) && oldSelection.some(item => item[states.rowKey] === row[states.rowKey])) {
                return row;
              }
            });
            if (oldSelection.length) {
              states.selection = isDisabledSelection;
            }
            // 重新计算未选中数据
            this.store.getUnSelectedRow(states.selection);
            // 触发el-table的'selection-change'事件
            this.table.$listeners['selection-change'](states.unSelectedRow, true);
          } else {
            states.unSelectedRow = [];
            this.table.clearSelection();
          }
          // console.log(states, 'states2===========================');
          break;
          // 全选所有页
        case 3:
          states.isCrossPageSelection = true;
          states.unSelectedRow = [];
          states.isAllSelected = true;
          data.forEach((row, index) => {
            if (states.selectable) {
              if (states.selectable.call(null, row, index)) {
                toggleRowStatus(selection, row, true);
              }
            } else {
              toggleRowStatus(selection, row, true);
            }
          });
          // console.log(states, 'states3===========================');
          // 重新计算未选中数据
          this.store.getUnSelectedRow(states.selection);
          // 触发el-table的'selection-change'事件
          this.table.$listeners['selection-change'](states.unSelectedRow, true);
          break;
          // 清空所有页
        case 4:
          states.isCrossPageSelection = false;
          states.unSelectedRow = [];
          // console.log(states, 'states4===========================');
          this.table.clearSelection();
          break;
        default:
          break;
      }

    },

    handleFilterClick(event, column) {
      event.stopPropagation();
      const target = event.target;
      let cell = target.tagName === 'TH' ? target : target.parentNode;
      if (hasClass(cell, 'noclick')) return;
      cell = cell.querySelector('.el-table__column-filter-trigger') || cell;
      const table = this.$parent;

      let filterPanel = this.filterPanels[column.id];

      if (filterPanel && column.filterOpened) {
        filterPanel.showPopper = false;
        return;
      }

      if (!filterPanel) {
        filterPanel = new Vue(FilterPanel);
        this.filterPanels[column.id] = filterPanel;
        if (column.filterPlacement) {
          filterPanel.placement = column.filterPlacement;
        }
        filterPanel.table = table;
        filterPanel.cell = cell;
        filterPanel.column = column;
        !this.$isServer && filterPanel.$mount(document.createElement('div'));
      }

      setTimeout(() => {
        filterPanel.showPopper = true;
      }, 16);
    },

    handleHeaderClick(event, column) {
      if (!column.filters && column.sortable) {
        this.handleSortClick(event, column);
      } else if (column.filterable && !column.sortable) {
        this.handleFilterClick(event, column);
      }

      this.$parent.$emit('header-click', column, event);
    },

    handleHeaderContextMenu(event, column) {
      this.$parent.$emit('header-contextmenu', column, event);
    },

    handleMouseDown(event, column) {
      if (this.$isServer) return;
      if (column.children && column.children.length > 0) return;
      /* istanbul ignore if */
      if (this.draggingColumn && this.border) {
        this.dragging = true;

        this.$parent.resizeProxyVisible = true;

        const table = this.$parent;
        const tableEl = table.$el;
        const tableLeft = tableEl.getBoundingClientRect().left;
        const columnEl = this.$el.querySelector(`th.${column.id}`);
        const columnRect = columnEl.getBoundingClientRect();
        const minLeft = columnRect.left - tableLeft + 30;

        addClass(columnEl, 'noclick');

        this.dragState = {
          startMouseLeft: event.clientX,
          startLeft: columnRect.right - tableLeft,
          startColumnLeft: columnRect.left - tableLeft,
          tableLeft
        };

        const resizeProxy = table.$refs.resizeProxy;
        resizeProxy.style.left = this.dragState.startLeft + 'px';

        document.onselectstart = function() { return false; };
        document.ondragstart = function() { return false; };

        const handleMouseMove = (event) => {
          const deltaLeft = event.clientX - this.dragState.startMouseLeft;
          const proxyLeft = this.dragState.startLeft + deltaLeft;

          resizeProxy.style.left = Math.max(minLeft, proxyLeft) + 'px';
        };

        const handleMouseUp = () => {
          if (this.dragging) {
            const {
              startColumnLeft,
              startLeft
            } = this.dragState;
            const finalLeft = parseInt(resizeProxy.style.left, 10);
            const columnWidth = finalLeft - startColumnLeft;
            column.width = column.realWidth = columnWidth;
            table.$emit('header-dragend', column.width, startLeft - startColumnLeft, column, event);

            this.store.scheduleLayout();

            document.body.style.cursor = '';
            this.dragging = false;
            this.draggingColumn = null;
            this.dragState = {};

            table.resizeProxyVisible = false;
          }

          document.removeEventListener('mousemove', handleMouseMove);
          document.removeEventListener('mouseup', handleMouseUp);
          document.onselectstart = null;
          document.ondragstart = null;

          setTimeout(function() {
            removeClass(columnEl, 'noclick');
          }, 0);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
      }
    },

    handleMouseMove(event, column) {
      if (column.children && column.children.length > 0) return;
      let target = event.target;
      while (target && target.tagName !== 'TH') {
        target = target.parentNode;
      }

      if (!column || !column.resizable) return;

      if (!this.dragging && this.border) {
        let rect = target.getBoundingClientRect();

        const bodyStyle = document.body.style;
        if (rect.width > 12 && rect.right - event.pageX < 8) {
          bodyStyle.cursor = 'col-resize';
          if (hasClass(target, 'is-sortable')) {
            target.style.cursor = 'col-resize';
          }
          this.draggingColumn = column;
        } else if (!this.dragging) {
          bodyStyle.cursor = '';
          if (hasClass(target, 'is-sortable')) {
            target.style.cursor = 'pointer';
          }
          this.draggingColumn = null;
        }
      }
    },

    handleMouseOut() {
      if (this.$isServer) return;
      document.body.style.cursor = '';
    },

    toggleOrder({ order, sortOrders }) {
      if (order === '') return sortOrders[0];
      const index = sortOrders.indexOf(order || null);
      return sortOrders[index > sortOrders.length - 2 ? 0 : index + 1];
    },

    handleSortClick(event, column, givenOrder) {
      event.stopPropagation();
      let order = column.order === givenOrder
        ? null
        : (givenOrder || this.toggleOrder(column));

      let target = event.target;
      while (target && target.tagName !== 'TH') {
        target = target.parentNode;
      }

      if (target && target.tagName === 'TH') {
        if (hasClass(target, 'noclick')) {
          removeClass(target, 'noclick');
          return;
        }
      }

      if (!column.sortable) return;

      const states = this.store.states;
      let sortProp = states.sortProp;
      let sortOrder;
      const sortingColumn = states.sortingColumn;

      if (sortingColumn !== column || (sortingColumn === column && sortingColumn.order === null)) {
        if (sortingColumn) {
          sortingColumn.order = null;
        }
        states.sortingColumn = column;
        sortProp = column.property;
      }

      if (!order) {
        sortOrder = column.order = null;
      } else {
        sortOrder = column.order = order;
      }

      states.sortProp = sortProp;
      states.sortOrder = sortOrder;

      this.store.commit('changeSortCondition');
    }
  },

  data() {
    return {
      draggingColumn: null,
      dragging: false,
      dragState: {}
    };
  }
};
