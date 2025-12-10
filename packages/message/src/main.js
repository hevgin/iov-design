import Vue from 'vue';
import Main from './main.vue';
import { PopupManager } from 'iov-design/src/utils/popup';
import { isVNode } from 'iov-design/src/utils/vdom';
import { isObject } from 'iov-design/src/utils/types';
let MessageConstructor = Vue.extend(Main);

let instance;
let instances = [];
let seed = 1;

const Message = function(options) {
  if (Vue.prototype.$isServer) return;
  options = options || {};
  if (typeof options === 'string') {
    options = {
      grouping: true,
      message: options
    };
  } else {
    options = {
      grouping: true,
      ...options
    };
  }
  // ========== grouping 逻辑 ==========
  if (options.grouping) {
    const last = instances[instances.length - 1];

    // 字符串形式时
    const messageStr = typeof options === 'string'
      ? options
      : options.message;

    if (last && !last.closed && last.message === messageStr) {
      last.repeatNum++;
      return last; // 直接返回，不创建新 toast
    }
  }
  // =================================================
  let userOnClose = options.onClose;
  let id = 'message_' + seed++;

  options.onClose = function() {
    Message.close(id, userOnClose);
  };
  instance = new MessageConstructor({
    data: options
  });
  instance.id = id;
  if (isVNode(instance.message)) {
    instance.$slots.default = [instance.message];
    instance.message = null;
  }
  instance.$mount();
  document.body.appendChild(instance.$el);
  let verticalOffset = options.offset || 46;
  instances.forEach(item => {
    verticalOffset += item.$el.offsetHeight + 16;
  });
  instance.verticalOffset = verticalOffset;
  instance.visible = true;
  instance.$el.style.zIndex = PopupManager.nextZIndex();
  instances.push(instance);
  return instance;
};

['success', 'warning', 'info', 'error'].forEach(type => {
  Message[type] = (options) => {
    if (isObject(options) && !isVNode(options)) {
      return Message({
        grouping: true,
        ...options,
        type
      });
    }
    return Message({
      grouping: true,
      type,
      message: options
    });
  };
});

Message.close = function(id, userOnClose) {
  let len = instances.length;
  let index = -1;
  let removedHeight;
  for (let i = 0; i < len; i++) {
    if (id === instances[i].id) {
      removedHeight = instances[i].$el.offsetHeight;
      index = i;
      if (typeof userOnClose === 'function') {
        userOnClose(instances[i]);
      }
      instances.splice(i, 1);
      break;
    }
  }
  if (len <= 1 || index === -1 || index > instances.length - 1) return;
  for (let i = index; i < len - 1 ; i++) {
    let dom = instances[i].$el;
    dom.style['top'] =
      parseInt(dom.style['top'], 10) - removedHeight - 16 + 'px';
  }
};

Message.closeAll = function() {
  for (let i = instances.length - 1; i >= 0; i--) {
    instances[i].close();
  }
};

export default Message;
