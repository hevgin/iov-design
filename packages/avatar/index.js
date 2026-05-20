import Avatar from './src/main';
import AvatarGroup from './src/avatar-group';

/* istanbul ignore next */
Avatar.install = function(Vue) {
  Vue.component(Avatar.name, Avatar);
  Vue.component(AvatarGroup.name, AvatarGroup);
};

Avatar.Group = AvatarGroup;

export default Avatar;
export { AvatarGroup };
