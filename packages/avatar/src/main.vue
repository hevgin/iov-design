<script>
export default {
  name: 'ElAvatar',

  inject: {
    avatarGroup: {
      default: null
    }
  },

  props: {
    size: {
      type: [Number, String],
      default: 'medium'
    },
    shape: {
      type: String,
      default: 'circle',
      validator(val) {
        return ['circle', 'square'].includes(val);
      }
    },
    icon: String,
    src: String,
    alt: String,
    srcSet: String,
    error: Function,
    fit: {
      type: String,
      default: 'cover'
    },
    backgroundColor: String,
    color: String,
    fontSize: {
      type: [Number, String],
      validator(val) {
        if (typeof val === 'string') {
          return /^\d+(px|em|rem|%)$/.test(val);
        }
        return typeof val === 'number';
      }
    }
  },

  data() {
    return {
      isImageExist: true
    };
  },

  computed: {
    effectiveSize() {
      if (this.avatarGroup && this.avatarGroup.size !== undefined) return this.avatarGroup.size;
      return this.size;
    },
    effectiveShape() {
      if (this.shape !== 'circle') return this.shape;
      if (this.avatarGroup && this.avatarGroup.shape && this.avatarGroup.shape !== 'circle') return this.avatarGroup.shape;
      return this.shape;
    },
    avatarClass() {
      const { effectiveSize, icon, effectiveShape, backgroundColor, color, fontSize } = this;
      let classList = ['el-avatar'];

      if (effectiveSize && typeof effectiveSize === 'string') {
        classList.push(`el-avatar--${effectiveSize}`);
      }

      if (icon) {
        classList.push('el-avatar--icon');
      }

      if (effectiveShape) {
        classList.push(`el-avatar--${effectiveShape}`);
      }

      if (backgroundColor) {
        classList.push('el-avatar--custom-bg');
      }

      if (color) {
        classList.push('el-avatar--custom-color');
      }

      if (fontSize) {
        classList.push('el-avatar--custom-font-size');
      }

      return classList.join(' ');
    }
  },

  methods: {
    handleError() {
      const { error } = this;
      const errorFlag = error ? error() : undefined;
      if (errorFlag !== false) {
        this.isImageExist = false;
      }
    },
    renderAvatar() {
      const { icon, src, alt, isImageExist, srcSet, fit } = this;

      if (isImageExist && src) {
        return <img
          src={src}
          onError={this.handleError}
          alt={alt}
          srcSet={srcSet}
          style={{ 'object-fit': fit }}/>;
      }

      if (icon) {
        return (<i class={icon} />);
      }

      return this.$slots.default;
    }
  },

  render() {
    const { avatarClass, effectiveSize, backgroundColor, color, fontSize } = this;

    const sizeStyle = typeof effectiveSize === 'number' ? {
      height: `${effectiveSize}px`,
      width: `${effectiveSize}px`,
      lineHeight: `${effectiveSize}px`
    } : {};

    const customStyle = {
      background: backgroundColor || undefined,
      color: color || undefined,
      fontSize: fontSize ? (typeof fontSize === 'number' ? `${fontSize}px` : fontSize) : undefined
    };

    const mergedStyle = { ...sizeStyle, ...customStyle };

    return (
      <span class={ avatarClass } style={ mergedStyle }>
        {
          this.renderAvatar()
        }
      </span>
    );
  }

};
</script>
