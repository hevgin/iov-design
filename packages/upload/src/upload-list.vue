<template>
  <ul
    tag="ul"
    :class="[
      'el-upload-list',
      'el-upload-list--' + listType,
      { 'is-disabled': disabled, 'is-sortable': sortable && listType === 'picture-card' }
    ]"
    name="el-list"
  >
    <li
      v-for="file in files"
      :class="[
        'el-upload-list__item',
        'el-upload-list__item-' + size,
        'is-' + file.status,
        focusing ? 'focusing' : '',
        { 'is-dragging': dragState.draggingFile && dragState.draggingFile.uid === file.uid }
      ]"
      :key="file.uid"
      tabindex="0"
      :draggable="sortable && listType === 'picture-card' && file.status === 'success' && !disabled"
      @focus="focusing = true"
      @blur="focusing = false"
      @click="focusing = false"
      @dragstart="handleDragStart($event, file)"
      @dragover="handleDragOver($event, file)"
      @dragleave="handleDragLeave($event, file)"
      @drop="handleDrop($event, file)"
      @dragend="handleDragEnd($event, file)"
    >
      <slot :file="file">
        <div class="el-upload-list__file">
          <div class="el-upload-list__item-name" @click="onPreview(file)">
            <span v-if="['picture'].includes(listType)  || ['picture-card'].includes(listType) && file.status === 'success'" class="el-upload-list__item-thumbnail">
              <el-image :src="file[fileUrlAlias]" :preview-src-list="handlePreview ? [] : [file[fileUrlAlias]]" fit="contain">
                <i slot="placeholder" class="el-image__placeholder"></i>
                <i slot="error" class="el-image__error"></i>
              </el-image>
            </span>
            <i v-else-if="['text'].includes(listType)" class="el-upload-list__icon" :style="iconStyle(file.name || file[fileNameAlias])"></i>
            <div v-if="['text', 'picture'].includes(listType)" class="el-upload-list__name">
              <span class="file-name">{{file.name || file[fileNameAlias]}}</span>
            </div>
          </div>
          <div v-if="['text', 'picture'].includes(listType)" class="el-upload-list__item-status-label">
            <el-progress
              v-if="file.status === 'uploading'"
              :percentage="file.percentage"
              :width="14"
              :stroke-width="7"
              :show-text="false"
              type="circle"
              stroke-linecap="butt"
              class="el-upload-progress"
            />
            <i v-else-if="file.status === 'success'" class="el-upload-success iov-icon-success"></i>
          </div>
          <div v-else-if="['picture-card'].includes(listType) && file.status === 'uploading'"  class="el-upload-list__item-status-label">
            <el-progress
              :percentage="file.percentage"
              :stroke-width="2"
              :show-text="false"
              type="line"
              color="#3F57FF"
              define-back-color="#F2F3F5"
              class="el-upload-progress"
            />
            <span class="el-upload-progress__text">上传中</span>
          </div>
        </div>
        <i class="iov-icon-delete" v-if="!disabled && ['text', 'picture'].includes(listType)" @click.stop="$emit('remove', file)"></i>
        <span class="el-upload-list__item-actions" v-if="listType === 'picture-card' && file.status === 'success' && actions.length > 0">
          <i v-if="handlePreview && actions.includes('preview')" @click.stop="onPreview(file)" class="el-upload-list__item-preview iov-icon-eye"></i>
          <i v-if="!disabled && actions.includes('update')" class="el-upload-list__item-update iov-icon-update" @click.stop="onUpdate"></i>
          <i v-if="!disabled && actions.includes('remove')" class="el-upload-list__item-delete iov-icon-delete" @click.stop="$emit('remove', file)"></i>
        </span>
      </slot>
    </li>
  </ul>
</template>
<script>
  import ElProgress from 'iov-design/packages/progress';
  import { iconStyle } from './utils';
  export default {
    name: 'ElUploadList',
    data() {
      return {
        focusing: false,
        iconStyle,
        dragState: {
          draggingFile: null,
          dropFile: null
        }
      };
    },
    components: { ElProgress },

    props: {
      files: {
        type: Array,
        default() {
          return [];
        }
      },
      fileNameAlias: {
        type: String,
        default: 'name'
      },
      fileUrlAlias: {
        type: String,
        default: 'url'
      },
      disabled: {
        type: Boolean,
        default: false
      },
      size: String,
      handlePreview: null,
      listType: String,
      actions: Array,
      sortable: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      parsePercentage(val) {
        return parseInt(val, 10);
      },
      onPreview(file) {
        this.handlePreview && this.handlePreview(file);
      },
      onUpdate() {
        this.$parent.$refs['upload-inner'].handleClick();
      },
      handleDragStart(event, file) {
        if (!this.sortable || this.disabled) return;
        this.dragState.draggingFile = file;
        event.dataTransfer.effectAllowed = 'move';
        try {
          event.dataTransfer.setData('text/plain', file.uid);
        } catch (e) {}
        this.$emit('drag-start', file, event);
      },
      handleDragOver(event, file) {
        if (!this.sortable || this.disabled) return;
        event.preventDefault();
        const { draggingFile } = this.dragState;
        if (!draggingFile || draggingFile.uid === file.uid) return;
        event.dataTransfer.dropEffect = 'move';
        this.dragState.dropFile = file;
      },
      handleDragLeave(event, file) {
        if (!this.sortable || this.disabled) return;
        if (this.dragState.dropFile && this.dragState.dropFile.uid === file.uid) {
          this.dragState.dropFile = null;
        }
      },
      handleDrop(event, file) {
        if (!this.sortable || this.disabled) return;
        event.preventDefault();
        const { draggingFile } = this.dragState;
        if (!draggingFile || draggingFile.uid === file.uid) return;
        const oldIndex = this.files.findIndex(f => f.uid === draggingFile.uid);
        const newIndex = this.files.findIndex(f => f.uid === file.uid);
        if (oldIndex !== -1 && newIndex !== -1) {
          this.$emit('sort', { oldIndex, newIndex, file: draggingFile, targetFile: file });
        }
        this.dragState.draggingFile = null;
        this.dragState.dropFile = null;
      },
      handleDragEnd(event, file) {
        if (!this.sortable || this.disabled) return;
        this.dragState.draggingFile = null;
        this.dragState.dropFile = null;
        this.$emit('drag-end', file, event);
      }
    }
  };
</script>
