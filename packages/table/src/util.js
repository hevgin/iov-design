import { getValueByPath } from 'iov-design/src/utils/util';
import Big from 'big.js';

export const getCell = function(event) {
  let cell = event.target;

  while (cell && cell.tagName.toUpperCase() !== 'HTML') {
    if (cell.tagName.toUpperCase() === 'TD') {
      return cell;
    }
    cell = cell.parentNode;
  }

  return null;
};

const isObject = function(obj) {
  return obj !== null && typeof obj === 'object';
};

export const orderBy = function(array, sortKey, reverse, sortMethod, sortBy) {
  if (!sortKey && !sortMethod && (!sortBy || Array.isArray(sortBy) && !sortBy.length)) {
    return array;
  }
  if (typeof reverse === 'string') {
    reverse = reverse === 'descending' ? -1 : 1;
  } else {
    reverse = (reverse && reverse < 0) ? -1 : 1;
  }
  const getKey = sortMethod ? null : function(value, index) {
    if (sortBy) {
      if (!Array.isArray(sortBy)) {
        sortBy = [sortBy];
      }
      return sortBy.map(function(by) {
        if (typeof by === 'string') {
          return getValueByPath(value, by);
        } else {
          return by(value, index, array);
        }
      });
    }
    if (sortKey !== '$key') {
      if (isObject(value) && '$value' in value) value = value.$value;
    }
    return [isObject(value) ? getValueByPath(value, sortKey) : value];
  };
  const compare = function(a, b) {
    if (sortMethod) {
      return sortMethod(a.value, b.value);
    }
    for (let i = 0, len = a.key.length; i < len; i++) {
      if (a.key[i] < b.key[i]) {
        return -1;
      }
      if (a.key[i] > b.key[i]) {
        return 1;
      }
    }
    return 0;
  };
  return array.map(function(value, index) {
    return {
      value: value,
      index: index,
      key: getKey ? getKey(value, index) : null
    };
  }).sort(function(a, b) {
    let order = compare(a, b);
    if (!order) {
      // make stable https://en.wikipedia.org/wiki/Sorting_algorithm#Stability
      order = a.index - b.index;
    }
    return order * reverse;
  }).map(item => item.value);
};

export const getColumnById = function(table, columnId) {
  let column = null;
  table.columns.forEach(function(item) {
    if (item.id === columnId) {
      column = item;
    }
  });
  return column;
};

export const getColumnByKey = function(table, columnKey) {
  let column = null;
  for (let i = 0; i < table.columns.length; i++) {
    const item = table.columns[i];
    if (item.columnKey === columnKey) {
      column = item;
      break;
    }
  }
  return column;
};

export const getColumnByCell = function(table, cell) {
  const matches = (cell.className || '').match(/el-table_[^\s]+/gm);
  if (matches) {
    return getColumnById(table, matches[0]);
  }
  return null;
};

export const getRowIdentity = (row, rowKey) => {
  if (!row) throw new Error('row is required when get row identity');
  if (typeof rowKey === 'string') {
    if (rowKey.indexOf('.') < 0) {
      return row[rowKey];
    }
    let key = rowKey.split('.');
    let current = row;
    for (let i = 0; i < key.length; i++) {
      current = current[key[i]];
    }
    return current;
  } else if (typeof rowKey === 'function') {
    return rowKey.call(null, row);
  }
};

export const getKeysMap = function(array, rowKey) {
  const arrayMap = {};
  (array || []).forEach((row, index) => {
    arrayMap[getRowIdentity(row, rowKey)] = { row, index };
  });
  return arrayMap;
};

function hasOwn(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key);
}

export function mergeOptions(defaults, config) {
  const options = {};
  let key;
  for (key in defaults) {
    options[key] = defaults[key];
  }
  for (key in config) {
    if (hasOwn(config, key)) {
      const value = config[key];
      if (typeof value !== 'undefined') {
        options[key] = value;
      }
    }
  }
  return options;
}

export function parseWidth(width) {
  if (width !== undefined) {
    width = parseInt(width, 10);
    if (isNaN(width)) {
      width = null;
    }
  }
  return width;
}

export function parseMinWidth(minWidth) {
  if (typeof minWidth !== 'undefined') {
    minWidth = parseWidth(minWidth);
    if (isNaN(minWidth)) {
      minWidth = 80;
    }
  }
  return minWidth;
};

export function parseHeight(height) {
  if (typeof height === 'number') {
    return height;
  }
  if (typeof height === 'string') {
    if (/^\d+(?:px)?$/.test(height)) {
      return parseInt(height, 10);
    } else {
      return height;
    }
  }
  return null;
}

// https://github.com/reduxjs/redux/blob/master/src/compose.js
export function compose(...funcs) {
  if (funcs.length === 0) {
    return arg => arg;
  }
  if (funcs.length === 1) {
    return funcs[0];
  }
  return funcs.reduce((a, b) => (...args) => a(b(...args)));
}

export function toggleRowStatus(statusArr, row, newVal) {
  let changed = false;
  const index = statusArr.indexOf(row);
  const included = index !== -1;

  const addRow = () => {
    statusArr.push(row);
    changed = true;
  };
  const removeRow = () => {
    statusArr.splice(index, 1);
    changed = true;
  };

  if (typeof newVal === 'boolean') {
    if (newVal && !included) {
      addRow();
    } else if (!newVal && included) {
      removeRow();
    }
  } else {
    if (included) {
      removeRow();
    } else {
      addRow();
    }
  }
  return changed;
}

export function walkTreeNode(root, cb, childrenKey = 'children', lazyKey = 'hasChildren') {
  const isNil = (array) => !(Array.isArray(array) && array.length);

  function _walker(parent, children, level) {
    cb(parent, children, level);
    children.forEach(item => {
      if (item[lazyKey]) {
        cb(item, null, level + 1);
        return;
      }
      const children = item[childrenKey];
      if (!isNil(children)) {
        _walker(item, children, level + 1);
      }
    });
  }

  root.forEach(item => {
    if (item[lazyKey]) {
      cb(item, null, 0);
      return;
    }
    const children = item[childrenKey];
    if (!isNil(children)) {
      _walker(item, children, 0);
    }
  });
}

/**
 * 舍入模式名称到 big.js 常量的映射
 * big.js 原生支持 4 种舍入模式：
 *   - roundDown     = 0  向零方向（截断）
 *   - roundHalfUp   = 1  四舍五入（等距时远离零）—— big.js 默认
 *   - roundHalfEven = 2  银行家舍入（等距时向偶数）
 *   - roundUp       = 3  远离零方向
 * 扩展两种模式（基于符号映射到 big.js 原生模式）：
 *   - ceil          向正无穷方向（正数→roundUp，负数→roundDown）
 *   - floor         向负无穷方向（正数→roundDown，负数→roundUp）
 */
const ROUNDING_MODE_MAP = {
  roundDown: Big.roundDown,
  roundHalfUp: Big.roundHalfUp,
  roundHalfEven: Big.roundHalfEven,
  roundUp: Big.roundUp,
  ceil: Big.roundUp,
  floor: Big.roundDown
};

function resolveRoundingMode(mode, isNegative) {
  switch (mode) {
    case 'ceil':
      return isNegative ? Big.roundDown : Big.roundUp;
    case 'floor':
      return isNegative ? Big.roundUp : Big.roundDown;
    default:
      if (mode in ROUNDING_MODE_MAP) return ROUNDING_MODE_MAP[mode];
      return Big.roundHalfUp;
  }
}

/**
 * 格式化数字显示（基于 big.js，避免浮点精度丢失）
 * @param {*} value 原始值
 * @param {Object} options 格式化选项
 *   - thousandSeparator {Boolean|String} 千位分隔符，true=',' , false=不启用, 字符串=自定义
 *   - precision {Number|null} 保留小数位数，null=保持原精度
 *   - keepTrailingZero {Boolean} 是否保留小数末尾的 0
 *   - roundingMode {String|Number} 舍入模式，见 ROUNDING_MODE_MAP；默认 'roundHalfUp'
 * @returns {*} 格式化后的字符串；非数字原样返回
 */
export function formatNumber(value, options = {}) {
  const {
    thousandSeparator = true,
    precision = null,
    keepTrailingZero = true,
    roundingMode = 'roundHalfUp'
  } = options;

  if (value === null || value === undefined || value === '') {
    return value;
  }

  // big.js 接受 number / string / bigint；优先用字符串避免 0.1+0.2 类精度问题
  const raw = typeof value === 'number' ? String(value) : value;
  let big;
  try {
    big = new Big(raw);
  } catch (e) {
    return value;
  }

  const isNegative = big.lt(0);

  // 获取舍入后的字符串表示
  let numStr;
  if (precision !== null && precision !== undefined) {
    const rm = resolveRoundingMode(roundingMode, isNegative);
    numStr = big.toFixed(precision, rm);
  } else {
    numStr = big.toString();
    // big.js 在大数或极小数时会使用指数表示法，这里转换为普通表示
    if (numStr.indexOf('e') !== -1) {
      numStr = big.toFixed();
    }
  }

  let [intPart, decPart] = numStr.split('.');

  // 处理负号
  const hasNegativeSign = intPart.startsWith('-');
  if (hasNegativeSign) {
    intPart = intPart.substring(1);
  }

  // 应用千位分隔符
  if (thousandSeparator) {
    const sep = typeof thousandSeparator === 'string' ? thousandSeparator : ',';
    intPart = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, sep);
  }

  // 处理末尾的 0
  if (decPart && !keepTrailingZero) {
    decPart = decPart.replace(/0+$/, '');
  }

  let result = intPart;
  if (decPart) {
    result += '.' + decPart;
  }

  return (hasNegativeSign ? '-' : '') + result;
}

export const objectEquals = function(objectA, objectB) {
  // 取对象a和b的属性名
  let aProps = Object.getOwnPropertyNames(objectA);
  let bProps = Object.getOwnPropertyNames(objectB);
  // 判断属性名的length是否一致
  if (aProps.length !== bProps.length) {
    return false;
  }
  // 循环取出属性名，再判断属性值是否一致
  for (let i = 0; i < aProps.length; i++) {
    let propName = aProps[i];
    if (objectA[propName] !== objectB[propName]) {
      return false;
    }
  }
  return true;
};
