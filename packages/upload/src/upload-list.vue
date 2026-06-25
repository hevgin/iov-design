<template>
  <transition-group
    tag="ul"
    :class="[
      'el-upload-list',
      'el-upload-list--' + listType,
      { 'is-disabled': disabled,
      'is-sortable': sortable && listType === 'picture-card',
      'is-sortable-dragging': dragState.isDragging
     }
    ]"
    name="upload-sort"
  >
    <li
      v-for="file in files"
      :class="[
        'el-upload-list__item',
        'el-upload-list__item-' + size,
        'is-' + file.status,
        focusing ? 'focusing' : '',
        { 'is-dragging': dragState.isDragging && dragState.draggingFile && dragState.draggingFile.uid === file.uid }
      ]"
      :key="file.uid"
      :data-uid="file.uid"
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
          <i v-if="!disabled && actions.includes('update')" class="el-upload-list__item-update iov-icon-update" @click.stop="onUpdate(file)"></i>
          <i v-if="!disabled && actions.includes('remove')" class="el-upload-list__item-delete iov-icon-delete" @click.stop="$emit('remove', file)"></i>
        </span>
      </slot>
    </li>
  </transition-group>
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
          isDragging: false,
          startX: 0,
          swapCount: 0,
          itemWidth: 0
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
      // "更新"操作：调用 upload-inner 的 handleClick 强制弹出文件选择框，
      // 并传入当前 file 标记为待替换文件，使新文件上传后替换原位置
      onUpdate(file) {
        this.$parent.$refs['upload-inner'].handleClick(true, file);
      },
      findLiByUid(uid) {
        return this.$el.querySelector(`[data-uid="${uid}"]`);
      },
      handleDragStart(event, file) {
        if (!this.sortable || this.disabled) return;
        this.dragState.draggingFile = file;
        this.dragState.isDragging = false;
        this.dragState.startX = event.clientX;
        this.dragState.swapCount = 0;
        const dragEl = this.findLiByUid(file.uid);
        if (dragEl) {
          this.dragState.itemWidth = dragEl.getBoundingClientRect().width;
        }
        event.dataTransfer.effectAllowed = 'move';
        try {
          event.dataTransfer.setData('text/plain', '');
        } catch (e) {}
        requestAnimationFrame(() => {
          this.dragState.isDragging = true;
        });
        this.$emit('drag-start', file, event);
      },
      handleDragOver(event, file) {
        if (!this.sortable || this.disabled) return;
        event.preventDefault();
        const { draggingFile, startX, itemWidth } = this.dragState;
        if (!draggingFile || draggingFile.uid === file.uid) return;
        event.dataTransfer.dropEffect = 'move';

        const dragIndex = this.files.findIndex(f => f.uid === draggingFile.uid);
        if (dragIndex === -1) return;

        const deltaX = event.clientX - startX;
        const halfWidth = itemWidth / 2;
        const targetSwapCount = Math.trunc(deltaX / halfWidth);

        if (targetSwapCount === this.dragState.swapCount) return;

        const diff = targetSwapCount - this.dragState.swapCount;
        const direction = diff > 0 ? 1 : -1;
        let currentIndex = dragIndex;
        let actualSwaps = 0;

        for (let i = 0; i < Math.abs(diff); i++) {
          const targetIndex = currentIndex + direction;
          if (targetIndex < 0 || targetIndex >= this.files.length) break;
          const targetFile = this.files[targetIndex];
          this.$emit('swap', { dragFile: draggingFile, dropFile: targetFile });
          currentIndex = targetIndex;
          actualSwaps++;
        }

        this.dragState.swapCount += actualSwaps * direction;
      },
      handleDragLeave(event, file) {
        if (!this.sortable || this.disabled) return;
      },
      handleDrop(event, file) {
        if (!this.sortable || this.disabled) return;
        event.preventDefault();
      },
      handleDragEnd(event, file) {
        if (!this.sortable || this.disabled) return;
        const { draggingFile, swapCount } = this.dragState;
        if (draggingFile && swapCount !== 0) {
          const currentIndex = this.files.findIndex(f => f.uid === draggingFile.uid);
          if (currentIndex !== -1) {
            const oldIndex = currentIndex - swapCount;
            this.$emit('sort', {
              oldIndex,
              newIndex: currentIndex,
              file: draggingFile,
              targetFile: this.files[oldIndex],
              files: this.files
            });
          }
        }
        this.dragState.draggingFile = null;
        this.dragState.isDragging = false;
        this.dragState.swapCount = 0;
        this.$emit('drag-end', file, event);
      }
    }
  };
</script>
