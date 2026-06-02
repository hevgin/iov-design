<script>
import ElUpload from 'iov-design/packages/upload';
import ElSvgIcon from 'iov-design/packages/svg-icon';

export default {
  name: 'ElAvatar',

  inject: {
    avatarGroup: {
      default: null
    }
  },

  components: {
    ElUpload,
    ElSvgIcon
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
    },
    uploadMode: {
      type: Boolean,
      default: false
    },
    uploadType: {
      type: String,
      default: 'overlay',
      validator(val) {
        return ['overlay', 'button'].includes(val);
      }
    },
    action: String,
    headers: Object,
    data: Object,
    accept: String,
    beforeUpload: Function,
    httpRequest: Function,
    onSuccess: Function,
    onError: Function
  },

  data() {
    return {
      isImageExist: true,
      avatarUrl: this.src
    };
  },

  watch: {
    src(val) {
      this.avatarUrl = val;
    }
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
    handleError(e) {
      this.isImageExist = false;
      this.$emit('error', e);
    },
    renderAvatar() {
      const { icon, avatarUrl, alt, isImageExist, srcSet, fit } = this;

      if (isImageExist && avatarUrl) {
        return <img
          class="el-avatar--img"
          src={avatarUrl}
          onError={this.handleError}
          alt={alt}
          srcSet={srcSet}
          style={{ 'object-fit': fit }}/>;
      }

      if (icon) {
        return (<i class={icon} />);
      }

      return this.$slots.default || <el-svg-icon class="el-avatar__load-fail" icon-class="img-fail" />;
    },
    handleUploadSuccess(response, file) {
      const url = response.url || (response.data && response.data.url) || URL.createObjectURL(file.raw);
      this.avatarUrl = url;
      this.isImageExist = true;
      this.onSuccess && this.onSuccess(response, file);
    },
    handleUploadError(err, file) {
      this.onError && this.onError(err, file);
    },
    handleBeforeUpload(file) {
      if (this.beforeUpload) {
        return this.beforeUpload(file);
      }
      return true;
    }
  },

  render() {
    const { avatarClass, effectiveSize, backgroundColor, color, fontSize, uploadMode, action, headers, data, accept, httpRequest, uploadType } = this;

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

    const avatarContent = (
      <span class="el-avatar__inner">
        {this.renderAvatar()}
      </span>
    );

    if (!uploadMode || !action) {
      return (
        <span class={ avatarClass } style={ mergedStyle }>
          {avatarContent}
        </span>
      );
    }

    const uploadProps = {
      props: {
        action,
        headers,
        data,
        accept,
        showFileList: false,
        httpRequest,
        'before-upload': this.handleBeforeUpload,
        'on-success': this.handleUploadSuccess,
        'on-error': this.handleUploadError
      }
    };

    return (
      <ElUpload class={ [`el-avatar--upload is-upload is-upload-${uploadType}`] } {...uploadProps}>
        <span class={ avatarClass } style={ mergedStyle }>
          {avatarContent}
        </span>
        {uploadMode && uploadType === 'overlay' && <span class="el-avatar--upload-mask">
          <i class="iov-icon-update"></i>
        </span>}
        {uploadMode && uploadType === 'button' && <span class="el-avatar--upload-btn">
          <i class="iov-icon-update"></i>
        </span>}
      </ElUpload>
    );
  }

};
</script>
