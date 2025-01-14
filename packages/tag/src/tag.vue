<script>
  export default {
    name: 'ElTag',
    props: {
      text: String,
      closable: Boolean,
      type: String,
      hit: Boolean,
      dot: Boolean,
      disableTransitions: Boolean,
      color: String,
      size: String,
      icon: String,
      effect: {
        type: String,
        default: 'light',
        validator(val) {
          return ['dark', 'light', 'plain'].indexOf(val) !== -1;
        }
      }
    },
    methods: {
      handleClose(event) {
        event.stopPropagation();
        this.$emit('close', event);
      },
      handleClick(event) {
        this.$emit('click', event);
      }
    },
    computed: {
      tagSize() {
        return this.size || (this.$ELEMENT || {}).size;
      }
    },
    render(h) {
      const { type, tagSize, hit, dot, effect } = this;
      const classes = [
        'el-tag',
        type ? `el-tag--${type}` : '',
        tagSize ? `el-tag--${tagSize}` : '',
        effect ? `el-tag--${effect}` : '',
        hit && 'is-hit',
        dot && 'is-dot'
      ];
      const tagEl = (
        <span
          class={ classes }
          style={{ backgroundColor: this.color }}
          on-click={ this.handleClick }>
          <span class="el-tag__inner">
            { this.icon && <i class={`${this.icon} el-tag-icon`}></i> }
            <span class="el-tag__text">{ this.$slots.default }</span>
            {
              this.closable && <i class="el-tag__close iov-icon-close" on-click={ this.handleClose }></i>
            }
          </span>
        </span>
      );

      return this.disableTransitions ? tagEl : <transition name="el-zoom-in-center">{ tagEl }</transition>;
    }
  };
</script>
