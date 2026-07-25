<template>
  <ul
    :class="[
      'el-upload-list',
      'el-upload-list--' + listType,
      { 'is-disabled': disabled }
    ]"
  >
    <li
      v-for="file in files"
      :class="['el-upload-list__item', 'is-' + file.status, focusing ? 'focusing' : '']"
      :key="file.uid"
      tabindex="0"
      @focus="focusing = true"
      @blur="focusing = false"
      @click="focusing = false"
    >
      <slot :file="file">
        <div class="el-upload-list__file">
          <div v-if="file.status === 'success'" class="el-upload-list__item-name">
            <span v-if="['picture-card', 'picture'].includes(listType)" class="el-upload-list__item-thumbnail">
              <el-image :src="file[fileUrlAlias]" :preview-src-list="[file[fileUrlAlias]]" fit="contain">
                <i slot="placeholder" class="el-image__placeholder"></i>
                <i slot="error" class="el-image__error"></i>
              </el-image>
            </span>
            <i v-else-if="['text'].includes(listType)" class="el-upload-list__icon" :style="iconStyle(file[fileNameAlias])"></i>
            <div class="el-upload-list__name">
              <span class="file-name">{{file[fileNameAlias]}}</span>
            </div>
            <el-button v-if="size === 'medium'" class="el-upload__btn" round size="small" @click.stop="handleReupload(file)">重新上传</el-button>
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
            <span class="el-upload-progress__text">文件上传中</span>
          </div>
        </div>
        <i class="el-upload__remove iov-icon-close-mini" v-if="!disabled" @click.stop="$emit('remove', file)"></i>
      </slot>
    </li>
  </ul>
</template>
<script>
  import ElProgress from 'iov-design/packages/progress';
  import { iconStyle } from './utils';
  export default {
    name: 'ElUploadFile',
    data() {
      return {
        focusing: false,
        iconStyle
      };
    },
    components: { ElProgress },

    inject: {
      uploader: {
        default: ''
      }
    },

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
      width: String,
      height: String,
      handlePreview: Function,
      listType: String
    },
    methods: {
      parsePercentage(val) {
        return parseInt(val, 10);
      },
      handleClick(file) {
        this.handlePreview && this.handlePreview(file);
      },
      handleReupload(file) {
        this.uploader && this.uploader.$refs['upload-inner'].handleClick(true, file);
      }
    }
  };
</script>
