import ElSvgIcon from './src/svg-icon.vue';

ElSvgIcon.install = function(Vue) {
  Vue.component(ElSvgIcon.name, ElSvgIcon);
};

export default ElSvgIcon;
