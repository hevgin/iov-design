<script>
export default {
  name: 'ElAvatar',

  props: {
    size: {
      type: [Number, String],
      validator(val) {
        if (typeof val === 'string') {
          return ['large', 'medium', 'small', 'mini'].includes(val);
        }
        return typeof val === 'number';
      }
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
    avatarClass() {
      const { size, icon, shape, backgroundColor, color, fontSize } = this;
      let classList = ['el-avatar'];

      if (size && typeof size === 'string') {
        classList.push(`el-avatar--${size}`);
      }

      if (icon) {
        classList.push('el-avatar--icon');
      }

      if (shape) {
        classList.push(`el-avatar--${shape}`);
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
    const { avatarClass, size, backgroundColor, color, fontSize } = this;

    const sizeStyle = typeof size === 'number' ? {
      height: `${size}px`,
      width: `${size}px`,
      lineHeight: `${size}px`
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
