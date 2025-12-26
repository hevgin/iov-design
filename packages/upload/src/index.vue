<script>
import UploadList from './upload-list';
import UploadFile from './upload-file';
import UploadPicture from './upload-picture';
import Upload from './upload';
import ElProgress from 'iov-design/packages/progress';
import Migrating from 'iov-design/src/mixins/migrating';

function noop() {}

export default {
  name: 'ElUpload',

  mixins: [Migrating],

  components: {
    ElProgress,
    UploadList,
    UploadFile,
    UploadPicture,
    Upload
  },

  provide() {
    return {
      uploader: this
    };
  },

  inject: {
    elForm: {
      default: ''
    }
  },

  props: {
    action: {
      type: String,
      required: true
    },
    headers: {
      type: Object,
      default() {
        return {};
      }
    },
    data: Object,
    multiple: Boolean,
    name: {
      type: String,
      default: 'file'
    },
    drag: Boolean,
    dragger: Boolean,
    withCredentials: Boolean,
    showFileList: {
      type: Boolean,
      default: true
    },
    accept: String,
    type: {
      type: String,
      default: 'select'
    },
    beforeUpload: Function,
    beforeRemove: Function,
    onRemove: {
      type: Function,
      default: noop
    },
    onChange: {
      type: Function,
      default: noop
    },
    onPreview: {
      type: Function
    },
    onSuccess: {
      type: Function,
      default: noop
    },
    onProgress: {
      type: Function,
      default: noop
    },
    onError: {
      type: Function,
      default: noop
    },
    fileList: {
      type: Array,
      default() {
        return [];
      }
    },
    fileNameAlias: {
      type: String,
      name: 'name'
    },
    fileUrlAlias: {
      type: String,
      name: 'url'
    },
    autoUpload: {
      type: Boolean,
      default: true
    },
    listType: {
      type: String,
      default: 'text' // text,picture,picture-card
    },
    httpRequest: Function,
    disabled: Boolean,
    limit: Number,
    onExceed: {
      type: Function,
      default: noop
    },
    background: Boolean,
    size: {
      type: String,
      default: 'medium'
    },
    actions: {
      type: Array,
      default() {
        return ['preview', 'update', 'remove'];
      }
    }
  },

  data() {
    return {
      uploadFiles: [],
      dragOver: false,
      draging: false,
      tempIndex: 1
    };
  },

  computed: {
    uploadDisabled() {
      return this.disabled || (this.elForm || {}).disabled;
    }
  },

  watch: {
    listType(type) {
      if (type === 'picture-card' || type === 'picture') {
        this.uploadFiles = this.uploadFiles.map(file => {
          if (!file.url && file.raw) {
            try {
              file.url = URL.createObjectURL(file.raw);
            } catch (err) {
              console.error('[Element Error][Upload]', err);
            }
          }
          return file;
        });
      }
    },
    fileList: {
      immediate: true,
      handler(fileList) {
        this.uploadFiles = fileList.map(item => {
          item.uid = item.uid || (Date.now() + this.tempIndex++);
          item.status = item.status || 'success';
          return item;
        });
      }
    }
  },

  methods: {
    handleStart(rawFile) {
      rawFile.uid = Date.now() + this.tempIndex++;
      let file = {
        status: 'ready',
        name: rawFile.name,
        size: rawFile.size,
        percentage: 0,
        uid: rawFile.uid,
        raw: rawFile
      };

      if (this.listType === 'picture-card' || this.listType === 'picture') {
        try {
          file.url = URL.createObjectURL(rawFile);
        } catch (err) {
          console.error('[Element Error][Upload]', err);
          return;
        }
      }

      this.uploadFiles.push(file);
      this.onChange(file, this.uploadFiles);
    },
    handleProgress(ev, rawFile) {
      const file = this.getFile(rawFile);
      this.onProgress(ev, file, this.uploadFiles);
      file.status = 'uploading';
      file.percentage = ev.percent || 0;
    },
    handleSuccess(res, rawFile) {
      const file = this.getFile(rawFile);

      if (file) {
        file.status = 'success';
        file.response = res;

        this.onSuccess(res, file, this.uploadFiles);
        this.onChange(file, this.uploadFiles);
      }
    },
    handleError(err, rawFile) {
      const file = this.getFile(rawFile);
      const fileList = this.uploadFiles;

      file.status = 'fail';

      fileList.splice(fileList.indexOf(file), 1);

      this.onError(err, file, this.uploadFiles);
      this.onChange(file, this.uploadFiles);
    },
    handleRemove(file, raw) {
      if (raw) {
        file = this.getFile(raw);
      }
      let doRemove = () => {
        this.abort(file);
        let fileList = this.uploadFiles;
        fileList.splice(fileList.indexOf(file), 1);
        this.onRemove(file, fileList);
      };

      if (!this.beforeRemove) {
        doRemove();
      } else if (typeof this.beforeRemove === 'function') {
        const before = this.beforeRemove(file, this.uploadFiles);
        if (before && before.then) {
          before.then(() => {
            doRemove();
          }, noop);
        } else if (before !== false) {
          doRemove();
        }
      }
    },
    getFile(rawFile) {
      let fileList = this.uploadFiles;
      let target;
      fileList.every(item => {
        target = rawFile.uid === item.uid ? item : null;
        return !target;
      });
      return target;
    },
    abort(file) {
      this.$refs['upload-inner'].abort(file);
    },
    clearFiles() {
      this.uploadFiles = [];
    },
    submit() {
      this.uploadFiles
        .filter(file => file.status === 'ready')
        .forEach(file => {
          this.$refs['upload-inner'].upload(file.raw);
        });
    },
    getMigratingConfig() {
      return {
        props: {
          'default-file-list': 'default-file-list is renamed to file-list.',
          'show-upload-list': 'show-upload-list is renamed to show-file-list.',
          'thumbnail-mode': 'thumbnail-mode has been deprecated, you can implement the same effect according to this case: http://element.eleme.io/#/zh-CN/component/upload#yong-hu-tou-xiang-shang-chuan'
        }
      };
    }
  },

  beforeDestroy() {
    this.uploadFiles.forEach(file => {
      if (file.url && file.url.indexOf('blob:') === 0) {
        URL.revokeObjectURL(file.url);
      }
    });
  },

  render(h) {
    let uploadList;
    let uploadFile = (
      <UploadFile
        fileNameAlias={this.fileNameAlias}
        fileUrlAlias={this.fileUrlAlias}
        disabled={this.uploadDisabled}
        listType={this.listType}
        files={this.uploadFiles}
        width={this.width}
        height={this.height}
        size={this.size}
        on-remove={this.handleRemove}
        handlePreview={this.onPreview}>
        {
          (props) => {
            if (this.$scopedSlots.file) {
              return this.$scopedSlots.file({
                file: props.file
              });
            }
          }
        }
      </UploadFile>
    );
    let uploadPicture = (
      <UploadPicture
        fileNameAlias={this.fileNameAlias}
        fileUrlAlias={this.fileUrlAlias}
        disabled={this.uploadDisabled}
        listType={this.listType}
        files={this.uploadFiles}
        size={this.size}
        on-remove={this.handleRemove}
        actions={this.actions}
        handlePreview={this.onPreview}>
        {
          (props) => {
            if (this.$scopedSlots.file) {
              return this.$scopedSlots.file({
                file: props.file
              });
            }
          }
        }
      </UploadPicture>
    );
    if (this.showFileList) {
      uploadList = (
        <UploadList
          fileNameAlias={this.fileNameAlias}
          fileUrlAlias={this.fileUrlAlias}
          disabled={this.uploadDisabled}
          listType={this.listType}
          files={this.uploadFiles}
          size={this.size}
          on-remove={this.handleRemove}
          actions={this.actions}
          handlePreview={this.onPreview}>
          {
            (props) => {
              if (this.$scopedSlots.file) {
                return this.$scopedSlots.file({
                  file: props.file
                });
              }
            }
          }
        </UploadList>
      );
    }

    const uploadData = {
      props: {
        type: this.type,
        drag: this.drag,
        size: this.size,
        action: this.action,
        multiple: this.multiple,
        'before-upload': this.beforeUpload,
        'with-credentials': this.withCredentials,
        headers: this.headers,
        name: this.name,
        data: this.data,
        accept: this.accept,
        fileList: this.uploadFiles,
        showFileList: this.showFileList,
        autoUpload: this.autoUpload,
        listType: this.listType,
        disabled: this.uploadDisabled,
        limit: this.limit,
        'on-exceed': this.onExceed,
        'on-start': this.handleStart,
        'on-progress': this.handleProgress,
        'on-success': this.handleSuccess,
        'on-error': this.handleError,
        'on-preview': this.onPreview,
        'on-remove': this.handleRemove,
        'http-request': this.httpRequest,
        actions: this.actions
      },
      ref: 'upload-inner'
    };

    const hideUploadInput = !this.showFileList && this.listType === 'picture-card' && this.limit === 1;
    let slotDefault = this.$slots.default;
    if (this.drag) {
      // 拖动文件上传
      if (this.limit === 1 && !this.showFileList) {
        slotDefault = this.uploadFiles.length > 0
          ? uploadFile
          : [this.$slots.default, this.$slots.tip];
      } else {
        slotDefault = [this.$slots.default, this.$slots.tip];
      }
    } else if (hideUploadInput) {
      // 单个图片上传(不显示图片墙)
      slotDefault = [ uploadPicture, this.$slots.default];
    } else {
      slotDefault = this.$slots.default;
    }

    const trigger = this.$slots.trigger || slotDefault;
    const uploadComponent = <upload {...uploadData}>{trigger}</upload>;
    return (
      <div class={{ 'el-upload--wrap': true, 'el-upload-bg': this.background }}>
        { this.listType === 'picture-card' ? uploadList : ''}
        {
          this.$slots.trigger
            ? [uploadComponent, this.$slots.default]
            : uploadComponent
        }
        { !this.drag && this.$slots.tip }
        { this.listType !== 'picture-card' ? uploadList : ''}
      </div>
    );
  }
};
</script>
