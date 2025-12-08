<template>
  <ul
    tag="ul"
    :class="[
      'el-upload-list',
      'el-upload-list--' + listType,
      { 'is-disabled': disabled }
    ]"
    name="el-list"
  >
    <li
      v-for="file in files"
      :class="['el-upload-list__item', 'el-upload-list__item-' + size, 'is-' + file.status, focusing ? 'focusing' : '']"
      :key="file.uid"
      tabindex="0"
      @focus="focusing = true"
      @blur="focusing = false"
      @click="focusing = false"
    >
      <slot :file="file">
        <div class="el-upload-list__file">
          <div v-if="file.status === 'success'" class="el-upload-list__item-name" @click="handleClick(file)">
            <span class="el-upload-list__item-thumbnail">
              <el-image :src="file[fileUrlAlias]" :preview-src-list="handlePreview ? [] : [file[fileUrlAlias]]" fit="contain">
                <i slot="placeholder" class="el-image__placeholder"></i>
                <i slot="error" class="el-image__error"></i>
              </el-image>
            </span>
          </div>
          <div v-if="file.status === 'uploading'" class="el-upload-list__item-status-label">
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
        <span class="el-upload-list__item-actions" v-if="file.status === 'success'">
          <i v-if="handlePreview" @click.stop="handlePreview(file)" class="el-upload-list__item-preview iov-icon-eye"></i>
          <i v-if="!disabled" class="el-upload-list__item-delete iov-icon-delete" @click.stop="$emit('remove', file)"></i>
          <i v-if="!disabled" class="el-upload-list__item-update iov-icon-update"></i>
        </span>
      </slot>
    </li>
  </ul>
</template>
<script>
  import ElProgress from 'iov-design/packages/progress';
  import { iconStyle } from './utils';

  export default {
    name: 'ElUploadPicture',
    data() {
      return {
        focusing: false,
        iconStyle
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
      handlePreview: Function,
      listType: String
    },
    methods: {
      parsePercentage(val) {
        return parseInt(val, 10);
      },
      handleClick(file) {
        this.handlePreview && this.handlePreview(file);
      }
    }
  };
</script>
