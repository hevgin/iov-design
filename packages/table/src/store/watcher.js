import Vue from 'vue';
import merge from 'iov-design/src/utils/merge';
import { getKeysMap, getRowIdentity, getColumnById, getColumnByKey, orderBy, toggleRowStatus } from '../util';
import expand from './expand';
import current from './current';
import tree from './tree';

const sortData = (data, states) => {
  const sortingColumn = states.sortingColumn;
  if (!sortingColumn || typeof sortingColumn.sortable === 'string') {
    return data;
  }
  return orderBy(data, states.sortProp, states.sortOrder, sortingColumn.sortMethod, sortingColumn.sortBy);
};

const doFlattenColumns = (columns) => {
  const result = [];
  columns.forEach((column) => {
    if (column.children) {
      result.push.apply(result, doFlattenColumns(column.children));
    } else {
      result.push(column);
    }
  });
  return result;
};

export default Vue.extend({
  data() {
    return {
      states: {
        // 3.0 版本后要求必须设置该属性
        rowKey: null,

        // 渲染的数据来源，是对 table 中的 data 过滤排序后的结果
        data: [],

        // 是否包含固定列
        isComplex: false,

        // 列
        _columns: [], // 不可响应的
        originColumns: [],
        columns: [],
        fixedColumns: [],
        rightFixedColumns: [],
        leafColumns: [],
        fixedLeafColumns: [],
        rightFixedLeafColumns: [],
        leafColumnsLength: 0,
        fixedLeafColumnsLength: 0,
        rightFixedLeafColumnsLength: 0,

        // 选择
        isAllSelected: false,
        selection: [],
        reserveSelection: false,
        selectOnIndeterminate: false,
        selectable: null,

        // 跨页全选标记
        isCrossPageSelection: false,
        // 全选下拉出现/隐藏事件
        showSelectionDropdown: false,
        // 已取消勾选的数据
        unSelectionData: [],

        // 过滤
        filters: {}, // 不可响应的
        filteredData: null,

        // 排序
        sortingColumn: null,
        sortProp: null,
        sortOrder: null,

        hoverRow: null
      }
    };
  },

  mixins: [expand, current, tree],

  methods: {
    // 检查 rowKey 是否存在
    assertRowKey() {
      const rowKey = this.states.rowKey;
      if (!rowKey) throw new Error('[ElTable] prop row-key is required');
    },

    // 更新列
    updateColumns() {
      const states = this.states;
      const _columns = states._columns || [];
      states.fixedColumns = _columns.filter((column) => column.fixed === true || column.fixed === 'left');
      states.rightFixedColumns = _columns.filter((column) => column.fixed === 'right');

      if (states.fixedColumns.length > 0 && _columns[0] && _columns[0].type === 'selection' && !_columns[0].fixed) {
        _columns[0].fixed = true;
        states.fixedColumns.unshift(_columns[0]);
      }

      const notFixedColumns = _columns.filter(column => !column.fixed);
      states.originColumns = [].concat(states.fixedColumns).concat(notFixedColumns).concat(states.rightFixedColumns);

      const leafColumns = doFlattenColumns(notFixedColumns);
      const fixedLeafColumns = doFlattenColumns(states.fixedColumns);
      const rightFixedLeafColumns = doFlattenColumns(states.rightFixedColumns);

      states.leafColumnsLength = leafColumns.length;
      states.fixedLeafColumnsLength = fixedLeafColumns.length;
      states.rightFixedLeafColumnsLength = rightFixedLeafColumns.length;

      states.columns = [].concat(fixedLeafColumns).concat(leafColumns).concat(rightFixedLeafColumns);
      states.isComplex = states.fixedColumns.length > 0 || states.rightFixedColumns.length > 0;
    },

    // 更新 DOM
    scheduleLayout(needUpdateColumns) {
      if (needUpdateColumns) {
        this.updateColumns();
      }
      this.table.debouncedUpdateLayout();
    },

    // 选择
    isSelected(row) {
      const { selection = [] } = this.states;
      return selection.indexOf(row) > -1;
    },

    clearSelection(emitChange = true) {
      const states = this.states;
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
        emitChange && this.table.$emit('selection-change', states.selection, states.isCrossPageSelection);
      }
    },

    cleanSelection() {
      const states = this.states;
      const { data, rowKey, selection } = states;
      let deleted;
      if (rowKey) {
        deleted = [];
        const selectedMap = getKeysMap(selection, rowKey);
        const dataMap = getKeysMap(data, rowKey);
        for (let key in selectedMap) {
          if (selectedMap.hasOwnProperty(key) && !dataMap[key]) {
            deleted.push(selectedMap[key].row);
          }
        }
      } else {
        deleted = selection.filter(item => data.indexOf(item) === -1);
      }
      if (deleted.length) {
        const newSelection = selection.filter(item => deleted.indexOf(item) === -1);
        states.selection = newSelection;
        this.table.$emit('selection-change', newSelection.slice(), false);
      }
    },

    toggleRowSelection(row, selected, emitChange = true) {
      const changed = toggleRowStatus(this.states.selection, row, selected);
      if (changed) {
        const newSelection = (this.states.selection || []).slice();
        // 调用 API 修改选中值，不触发 select 事件
        if (emitChange) {
          this.getUnSelectedRow(newSelection);
          this.table.$emit('select', newSelection, row);
        }
        if (this.states.isCrossPageSelection) {
          this.table.$emit('selection-change', this.states.unSelectionData, true);
        } else {
          this.table.$emit('selection-change', newSelection, false);
        }
      }
    },

    /**
    * 选择数据事件
    * @param  {num} command 选择事件类型 1-全选当前页 2-清空当前页 3-全选所有页 4-清空所有页
    */
    onSelectionChange(command) {
      switch (command) {
        // 全选当前页
        case 1:
          this.onChangeCurrentPage(true, command);
          break;
          // 清空当前页
        case 2:
          this.onChangeCurrentPage(false, command);
          break;
          // 全选所有页
        case 3:
          this.states.isCrossPageSelection = true;
          this.onChangeCurrentPage(true, command);
          break;
          // 清空所有页
        case 4:
          this.onChangeCurrentPage(false, command);
          break;
        default:
          break;
      }
    },

    onChangeCurrentPage(selected, command) {
      const states = this.states;
      const { data = [], selection } = states;
      data.forEach((row, index) => {
        if (states.selectable) {
          if (states.selectable.call(null, row, index)) {
            toggleRowStatus(selection, row, selected);
          }
        } else {
          toggleRowStatus(selection, row, selected);
        }
      });
      this.updateAllSelected();

      // 先点击跨页全选，再点击清空当前页/取消几条勾选数据, 最后点击全选当前页
      if (states.isCrossPageSelection) {
        // 重新计算未选中数据
        this.getUnSelectedRow(states.selection);
      }

      if (command === 4) {
        states.isCrossPageSelection = false;
        this.clearSelection(false);
        states.unSelectionData = [];
      }

      // 触发el-table的'selection-change'事件
      if (states.isCrossPageSelection) {
        this.table.$listeners['selection-change'](states.unSelectionData, states.isCrossPageSelection);
      } else {
        this.table.$listeners['selection-change'](states.selection, states.isCrossPageSelection);
      }
    },

    /**
    * 获取取消勾选数据项
    * @param  {arr} selection 当前已选择所有数据项
    */
    getUnSelectedRow(selection) {
      if (!this.states.isCrossPageSelection) return;

      const { rowKey } = this.states;

      // 从全部勾选数据中过滤出当前页勾选的数据
      const selected = this.states.data.filter(item => selection.some(row => row[rowKey] === item[rowKey]));
      // 通过当前页数据与当前页已勾选的数据, 过滤出当前页未勾选的数据
      const unselected = this.states.data.filter((item) => !selected.some((row) => row[rowKey] === item[rowKey]));

      // 取消勾选数据中是否存在当页面已勾选的数据项, 如有则删除
      const index = [];
      this.states.unSelectionData.forEach((item, i) => {
        if (selected.some(s => s[rowKey] === item[rowKey])) {
          index.push(i);
        }
      });
      this.states.unSelectionData = this.states.unSelectionData.filter((item, i) => !index.includes(i));

      // 取消勾选数据中如果不存在当前页未勾选的数据, 则将当前未勾选的数据添push到取消勾选数据中
      unselected.forEach(item => {
        if (!this.states.unSelectionData.some(s => s[rowKey] === item[rowKey])) {
          this.states.unSelectionData.push(item);
        }
      });
    },

    _toggleAllSelection() {
      const states = this.states;
      const { data = [], selection } = states;
      // when only some rows are selected (but not all), select or deselect all of them
      // depending on the value of selectOnIndeterminate
      const value = states.selectOnIndeterminate
        ? !states.isAllSelected
        : !(states.isAllSelected || selection.length);
      states.isAllSelected = value;

      let selectionChanged = false;
      data.forEach((row, index) => {
        if (states.selectable) {
          if (states.selectable.call(null, row, index) && toggleRowStatus(selection, row, value)) {
            selectionChanged = true;
          }
        } else {
          if (toggleRowStatus(selection, row, value)) {
            selectionChanged = true;
          }
        }
      });

      const newSelection = (this.states.selection || []).slice();

      if (selectionChanged) {
        if (states.isCrossPageSelection) {
          this.getUnSelectedRow(newSelection);
          this.table.$emit('selection-change', states.unSelectionData || [], true);
        } else {
          this.table.$emit('selection-change', selection ? selection.slice() : [], false);
        }
      }
      this.table.$emit('select-all', selection);
    },

    updateSelectionByRowKey() {
      const states = this.states;
      const { selection, rowKey, data } = states;
      const selectedMap = getKeysMap(selection, rowKey);
      data.forEach(row => {
        const rowId = getRowIdentity(row, rowKey);
        const rowInfo = selectedMap[rowId];
        if (rowInfo) {
          selection[rowInfo.index] = row;
        }
      });
    },

    updateAllSelected() {
      const states = this.states;
      const { selection, rowKey, selectable } = states;
      // data 为 null 时，解构时的默认值会被忽略
      const data = states.data || [];
      if (data.length === 0) {
        states.isAllSelected = false;
        return;
      }

      let selectedMap;
      if (rowKey) {
        selectedMap = getKeysMap(selection, rowKey);
      }
      const isSelected = function(row) {
        if (selectedMap) {
          return !!selectedMap[getRowIdentity(row, rowKey)];
        } else {
          return selection.indexOf(row) !== -1;
        }
      };
      let isAllSelected = true;
      let selectedCount = 0;
      for (let i = 0, j = data.length; i < j; i++) {
        const item = data[i];
        const isRowSelectable = selectable && selectable.call(null, item, i);
        if (!isSelected(item)) {
          if (!selectable || isRowSelectable) {
            isAllSelected = false;
            break;
          }
        } else {
          selectedCount++;
        }
      }

      if (selectedCount === 0) isAllSelected = false;
      states.isAllSelected = isAllSelected;
    },

    // 过滤与排序
    updateFilters(columns, values) {
      if (!Array.isArray(columns)) {
        columns = [columns];
      }
      const states = this.states;
      const filters = {};
      columns.forEach(col => {
        states.filters[col.id] = values;
        filters[col.columnKey || col.id] = values;
      });

      return filters;
    },

    updateSort(column, prop, order) {
      if (this.states.sortingColumn && this.states.sortingColumn !== column) {
        this.states.sortingColumn.order = null;
      }
      this.states.sortingColumn = column;
      this.states.sortProp = prop;
      this.states.sortOrder = order;
    },

    execFilter() {
      const states = this.states;
      const { _data, filters } = states;
      let data = _data;

      Object.keys(filters).forEach((columnId) => {
        const values = states.filters[columnId];
        if (!values || values.length === 0) return;
        const column = getColumnById(this.states, columnId);
        if (column && column.filterMethod) {
          data = data.filter((row) => {
            return values.some(value => column.filterMethod.call(null, value, row, column));
          });
        }
      });

      states.filteredData = data;
    },

    execSort() {
      const states = this.states;
      states.data = sortData(states.filteredData, states);
    },

    // 根据 filters 与 sort 去过滤 data
    execQuery(ignore) {
      if (!(ignore && ignore.filter)) {
        this.execFilter();
      }
      this.execSort();
    },

    clearFilter(columnKeys) {
      const states = this.states;
      const { tableHeader, fixedTableHeader, rightFixedTableHeader } = this.table.$refs;

      let panels = {};
      if (tableHeader) panels = merge(panels, tableHeader.filterPanels);
      if (fixedTableHeader) panels = merge(panels, fixedTableHeader.filterPanels);
      if (rightFixedTableHeader) panels = merge(panels, rightFixedTableHeader.filterPanels);

      const keys = Object.keys(panels);
      if (!keys.length) return;

      if (typeof columnKeys === 'string') {
        columnKeys = [columnKeys];
      }

      if (Array.isArray(columnKeys)) {
        const columns = columnKeys.map(key => getColumnByKey(states, key));
        keys.forEach(key => {
          const column = columns.find(col => col.id === key);
          if (column) {
            // TODO: 优化这里的代码
            panels[key].filteredValue = [];
          }
        });
        this.commit('filterChange', {
          column: columns,
          values: [],
          silent: true,
          multi: true
        });
      } else {
        keys.forEach(key => {
          // TODO: 优化这里的代码
          panels[key].filteredValue = [];
        });

        states.filters = {};
        this.commit('filterChange', {
          column: {},
          values: [],
          silent: true
        });
      }
    },

    clearSort() {
      const states = this.states;
      if (!states.sortingColumn) return;

      this.updateSort(null, null, null);
      this.commit('changeSortCondition', {
        silent: true
      });
    },

    // 适配层，expand-row-keys 在 Expand 与 TreeTable 中都有使用
    setExpandRowKeysAdapter(val) {
      // 这里会触发额外的计算，但为了兼容性，暂时这么做
      this.setExpandRowKeys(val);
      this.updateTreeExpandKeys(val);
    },

    // 展开行与 TreeTable 都要使用
    toggleRowExpansionAdapter(row, expanded) {
      const hasExpandColumn = this.states.columns.some(({ type }) => type === 'expand');
      if (hasExpandColumn) {
        this.toggleRowExpansion(row, expanded);
      } else {
        this.toggleTreeExpansion(row, expanded);
      }
    }
  }
});
