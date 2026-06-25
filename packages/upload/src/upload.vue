<script>
import ajax from './ajax';
import UploadDragger from './upload-dragger.vue';

export default {
  inject: ['uploader'],
  components: {
    UploadDragger
  },
  props: {
    type: String,
    action: {
      type: String,
      required: true
    },
    name: {
      type: String,
      default: 'file'
    },
    data: Object,
    headers: Object,
    withCredentials: Boolean,
    multiple: Boolean,
    accept: String,
    onStart: Function,
    onProgress: Function,
    onSuccess: Function,
    onError: Function,
    beforeUpload: Function,
    drag: Boolean,
    size: String,
    onPreview: {
      type: Function,
      default: function() {}
    },
    onRemove: {
      type: Function,
      default: function() {}
    },
    fileList: Array,
    autoUpload: Boolean,
    listType: String,
    httpRequest: {
      type: Function,
      default: ajax
    },
    disabled: Boolean,
    limit: Number,
    onExceed: Function,
    actions: Array
  },

  data() {
    return {
      mouseover: false,
      reqs: {},
      // 记录当前"更新"操作要被替换的旧文件对象。
      // 点击更新按钮时由 handleClick 设置，在 handleChange 中消费后置空。
      replacingFile: null
    };
  },

  computed: {
    hideUploadInput() {
      return !this.showFileList &&
           this.listType === 'picture-card' &&
           this.limit === 1 &&
           this.fileList.length === 1;
    }
  },

  methods: {
    isImage(str) {
      return str.indexOf('image') !== -1;
    },
    handleChange(ev) {
      const files = ev.target.files;

      if (!files) return;

      // 更新场景：需在原位置替换文件
      // - 先记录旧文件在列表中的索引（用于新文件原位插入）
      // - 中断旧文件正在进行的上传请求（如有）
      // - 从列表中移除旧文件
      let replacingIndex = -1;
      if (this.replacingFile) {
        replacingIndex = this.fileList.indexOf(this.replacingFile);
        if (replacingIndex > -1) {
          this.abort(this.replacingFile);
          this.fileList.splice(replacingIndex, 1);
        }
        this.replacingFile = null;
      } else if (this.drag && this.limit === 1 || this.hideUploadInput) {
        // 单文件拖拽上传或隐藏上传框的单图场景：直接清空列表
        this.fileList.length = [];
      }
      // 传入 replacingIndex，让新文件插入到原位置而非追加到末尾
      this.uploadFiles(files, replacingIndex);
    },
    uploadFiles(files, replacingIndex) {
      if (this.limit && this.fileList.length + files.length > this.limit) {
        this.onExceed && this.onExceed(files, this.fileList);
        return;
      }

      let postFiles = Array.prototype.slice.call(files);
      if (!this.multiple) { postFiles = postFiles.slice(0, 1); }

      if (postFiles.length === 0) { return; }

      postFiles.forEach(rawFile => {
        // 将 replacingIndex 传给 onStart（即 ElUpload.handleStart），
        // 使新文件 splice 到原位置；replacingIndex 递增以支持多文件顺序替换
        this.onStart(rawFile, replacingIndex);
        if (replacingIndex > -1) { replacingIndex++; }
        if (this.autoUpload) this.upload(rawFile);
      });
    },
    upload(rawFile) {
      this.$refs.input.value = null;

      if (!this.beforeUpload) {
        return this.post(rawFile);
      }

      const before = this.beforeUpload(rawFile);
      if (before && before.then) {
        before.then(processedFile => {
          const fileType = Object.prototype.toString.call(processedFile);

          if (fileType === '[object File]' || fileType === '[object Blob]') {
            if (fileType === '[object Blob]') {
              processedFile = new File([processedFile], rawFile.name, {
                type: rawFile.type
              });
            }
            for (const p in rawFile) {
              if (rawFile.hasOwnProperty(p)) {
                processedFile[p] = rawFile[p];
              }
            }
            this.post(processedFile);
          } else {
            this.post(rawFile);
          }
        }, () => {
          this.onRemove(null, rawFile);
        });
      } else if (before !== false) {
        this.post(rawFile);
      } else {
        this.onRemove(null, rawFile);
      }
    },
    abort(file) {
      const { reqs } = this;
      if (file) {
        let uid = file;
        if (file.uid) uid = file.uid;
        if (reqs[uid]) {
          reqs[uid].abort();
        }
      } else {
        Object.keys(reqs).forEach((uid) => {
          if (reqs[uid]) reqs[uid].abort();
          delete reqs[uid];
        });
      }
    },
    post(rawFile) {
      const { uid } = rawFile;
      const options = {
        headers: this.headers,
        withCredentials: this.withCredentials,
        file: rawFile,
        data: this.data,
        filename: this.name,
        action: this.action,
        onProgress: e => {
          this.onProgress(e, rawFile);
        },
        onSuccess: res => {
          this.onSuccess(res, rawFile);
          delete this.reqs[uid];
        },
        onError: err => {
          this.onError(err, rawFile);
          delete this.reqs[uid];
        }
      };
      const req = this.httpRequest(options);
      this.reqs[uid] = req;
      if (req && req.then) {
        req.then(options.onSuccess, options.onError);
      }
    },
    handleClick(ev, file) {
      // force=true 表示绕过 limit 检查强制弹出文件选择框（用于"更新"操作）
      const force = ev === true;
      // file 存在表示本次为"更新"操作，记录要被替换的旧文件，
      // 供 handleChange 在选择新文件后移除旧文件并在原位插入新文件
      if (file) {
        this.replacingFile = file;
      }
      if (force || (!this.disabled && (this.fileList.length < this.limit || !this.limit)) || this.fileList.length === 0) {
        this.$refs.input.value = null;
        this.$refs.input.click();
      }
    },
    handleKeydown(e) {
      if (e.target !== e.currentTarget) return;
      if (e.keyCode === 13 || e.keyCode === 32) {
        this.handleClick();
      }
    }
  },

  render(h) {
    let {
      handleClick,
      drag,
      name,
      handleChange,
      multiple,
      accept,
      listType,
      uploadFiles,
      disabled,
      handleKeydown,
      size
    } = this;
    const data = {
      class: {
        'el-upload': true,
        'el-upload--drag': drag,
        [`el-upload--drag__${size}`]: drag,
        [`el-upload--${size}`]: !drag,
        'el-upload--picture-card': listType === 'picture-card',
        'el-upload--picture-card__no-border': this.hideUploadInput
      },
      on: {
        click: handleClick,
        keydown: handleKeydown
      }
    };
    data.class[`el-upload--${listType}`] = true;
    return (
      <div {...data} tabindex="0" >
        {
          drag
            ? <upload-dragger disabled={disabled} on-file={uploadFiles}>{this.$slots.default}{this.$slots.tip}</upload-dragger>
            : this.$slots.default
        }
        <input class="el-upload__input" type="file" ref="input" name={name} on-change={handleChange} multiple={multiple} accept={accept}></input>
      </div>
    );
  }
};
</script>
