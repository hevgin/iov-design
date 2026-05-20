import AvatarGroup from '../avatar/src/avatar-group.vue';

/* istanbul ignore next */
AvatarGroup.install = function(Vue) {
  Vue.component(AvatarGroup.name, AvatarGroup);
};

export default AvatarGroup;
