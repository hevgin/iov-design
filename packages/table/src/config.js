import { getPropByPath } from 'iov-design/src/utils/util';

export const cellStarts = {
  default: {
    order: ''
  },
  selection: {
    width: 48,
    minWidth: 48,
    realWidth: 48,
    order: '',
    className: 'el-table-column--selection'
  },
  expand: {
    width: 48,
    minWidth: 48,
    realWidth: 48,
    order: ''
  },
  index: {
    width: 48,
    minWidth: 48,
    realWidth: 48,
    order: ''
  }
};

// 这些选项不应该被覆盖
export const cellForced = {
  selection: {
    renderHeader: function(h, { store }) {
      const { selection, data, rowKey } = store.states;
      let indeterminate = selection.length > 0 && !(selection.length === data.length);

      if (rowKey) {
        // 全选: v-model - true, indeterminate - false
        // 半选: v-model - false, indeterminate - true
        // 不选：v-model - false, indeterminate - false

        // 已选择的数据中是否包括当前页的数据项 && !当前页数据全部选中
        indeterminate = selection.some(o => data.some(row => row[rowKey] === o[rowKey])) && !(data.every(row => selection.some(o => row[rowKey] === o[rowKey])));
      }
      return [<el-checkbox
        disabled={ data && data.length === 0 }
        indeterminate={ indeterminate }
        on-input={ this.toggleAllSelection }
        value={ this.isAllSelected } />,
      this.table.crossPageSelection && <el-dropdown
        class="el-table__cross-page-selection"
        placement="bottom-start"
        trigger="click"
        size="small"
        onCommand={command => this.onSelectionChange(command, this.scope)}
        on-visible-change={this.onVisibleChange}
      >
        <i class={['iov-icon-arrow-down', this.store.states.showSelectionDropdown ? 'show-selection-dropdown' : '']} />
        <el-dropdown-menu slot="dropdown" class="table-selection__dropdown">
          <el-dropdown-item disabled={ data && data.length === 0 } command={1}>全选当页</el-dropdown-item>
          <el-dropdown-item disabled={ data && data.length === 0 } command={3}>全选所有页</el-dropdown-item>
          <el-dropdown-item disabled={ data && data.length === 0 } command={2}>清空当页</el-dropdown-item>
          <el-dropdown-item disabled={ data && data.length === 0 } command={4}>清空所有页</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      ];
    },
    renderCell: function(h, { row, column, isSelected, store, $index }) {
      return <el-checkbox
        nativeOn-click={ (event) => event.stopPropagation() }
        value={ isSelected }
        disabled={ column.selectable ? !column.selectable.call(null, row, $index) : false }
        on-input={ () => { store.commit('rowSelectedChanged', row); } }
      />;
    },
    sortable: false,
    resizable: false
  },
  index: {
    renderHeader: function(h, { column }) {
      return column.label || '#';
    },
    renderCell: function(h, { $index, column }) {
      let i = $index + 1;
      const index = column.index;

      if (typeof index === 'number') {
        i = $index + index;
      } else if (typeof index === 'function') {
        i = index($index);
      }

      return <div>{ i }</div>;
    },
    sortable: false
  },
  expand: {
    renderHeader: function(h, { column }) {
      return column.label || '';
    },
    renderCell: function(h, { row, store, isExpanded }) {
      const classes = ['el-table__expand-icon'];
      if (isExpanded) {
        classes.push('el-table__expand-icon--expanded');
      }
      const callback = function(e) {
        e.stopPropagation();
        store.toggleRowExpansion(row);
      };
      return (<div class={ classes }
        on-click={callback}>
        <i class='el-icon el-icon-arrow-right'></i>
      </div>);
    },
    sortable: false,
    resizable: false,
    className: 'el-table__expand-column'
  }
};

export function defaultRenderCell(h, { row, column, $index }) {
  const property = column.property;
  const emptyValuePlaceholder = column.emptyValuePlaceholder;
  const value = property && getPropByPath(row, property).v;
  if (column && column.formatter) {
    return column.formatter(row, column, value, $index);
  }
  return emptyValuePlaceholder && ['', undefined, null].includes(value) ? emptyValuePlaceholder : value;
}

export function treeCellPrefix(h, { row, treeNode, store }) {
  if (!treeNode) return null;
  const ele = [];
  const callback = function(e) {
    e.stopPropagation();
    store.loadOrToggle(row);
  };
  if (treeNode.indent) {
    ele.push(<span class="el-table__indent" style={{'padding-left': treeNode.indent + 'px'}}></span>);
  }
  if (typeof treeNode.expanded === 'boolean' && !treeNode.noLazyChildren) {
    const expandClasses = ['el-table__expand-icon', treeNode.expanded ? 'el-table__expand-icon--expanded' : ''];
    let iconClasses = ['el-icon-arrow-right'];
    if (treeNode.loading) {
      iconClasses = ['el-icon-loading'];
    }
    ele.push(<div class={ expandClasses }
      on-click={ callback }>
      <i class={ iconClasses }></i>
    </div>);
  } else {
    ele.push(<span class="el-table__placeholder"></span>);
  }
  return ele;
}
