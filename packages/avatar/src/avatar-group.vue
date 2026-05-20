<script>
import ElPopover from 'iov-design/packages/popover';

export default {
  name: 'ElAvatarGroup',

  componentName: 'ElAvatarGroup',

  provide() {
    return {
      avatarGroup: this
    };
  },

  components: {
    ElPopover
  },

  props: {
    size: {
      type: [Number, String],
      default: 'medium'
    },
    max: {
      type: Number,
      default: 0
    },
    overlap: {
      type: Number,
      default: null
    },
    shape: {
      type: String,
      default: 'circle',
      validator(val) {
        return ['circle', 'square'].includes(val);
      }
    },
    hoverExpand: {
      type: Boolean,
      default: true
    }
  },

  computed: {
    avatarVnodes() {
      const slot = this.$slots.default || [];
      return slot.filter(vnode => vnode.componentOptions);
    },
    visibleVnodes() {
      if (this.max > 0) {
        return this.avatarVnodes.slice(0, this.max);
      }
      return this.avatarVnodes;
    },
    hiddenVnodes() {
      if (this.max > 0) {
        return this.avatarVnodes.slice(this.max);
      }
      return [];
    },
    hiddenCount() {
      return this.hiddenVnodes.length;
    },
    groupClass() {
      const classes = ['el-avatar-group'];
      if (this.size) {
        classes.push(`el-avatar-group--${this.size}`);
      }
      if (this.shape === 'square') {
        classes.push('el-avatar-group--square');
      }
      if (this.overlap !== null) {
        classes.push('el-avatar-group--custom-overlap');
      }
      return classes;
    },
    customStyle() {
      const style = {};
      if (this.overlap !== null) {
        style['--avatar-overlap'] = `${this.overlap}px`;
      }
      return style;
    },
    moreClass() {
      const classes = ['el-avatar', 'el-avatar-group__more'];
      if (this.size && typeof this.size === 'string') {
        classes.push(`el-avatar--${this.size}`);
      }
      if (this.shape) {
        classes.push(`el-avatar--${this.shape}`);
      }
      return classes;
    },
    moreStyle() {
      const style = {};
      if (typeof this.size === 'number') {
        style.width = `${this.size}px`;
        style.height = `${this.size}px`;
        style.lineHeight = `${this.size}px`;
      }
      return style;
    }
  },

  render() {
    const children = [...this.visibleVnodes];

    if (this.hiddenCount > 0) {
      const moreNode = (
        <span class={this.moreClass} style={this.moreStyle}>
          +{this.hiddenCount}
        </span>
      );

      if (this.hoverExpand) {
        children.push(
          <el-popover
            trigger="hover"
            placement="top"
            popper-class="el-avatar-group__popover"
          >
            <div class="el-avatar-group__popover-content">
              {this.hiddenVnodes}
            </div>
            <template slot="reference">
              {moreNode}
            </template>
          </el-popover>
        );
      } else {
        children.push(moreNode);
      }
    }

    return (
      <div class={this.groupClass} style={this.customStyle}>
        {children}
      </div>
    );
  }
};
</script>
