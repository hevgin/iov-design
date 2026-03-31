<style>
  .page-component__scroll {
    height: calc(100% - 80px);
    margin-top: 80px;

    > .el-scrollbar__wrap {
      overflow-x: auto;
    }
  }

  .page-component {
    box-sizing: border-box;
    height: 100%;

    &.page-container {
      padding: 0;
    }

    .page-component__nav {
      width: 280px;
      position: fixed;
      top: 0;
      left: 0;
      bottom: 0;
      margin-top: 80px;
      padding-top: 48px;
      padding-left: 48px;
      transition: padding-top .3s;
      z-index: 10; /* 保证左侧导航不被遮挡 */
      box-sizing: border-box;

      > .el-scrollbar__wrap {
        height: 100%;
        overflow-x: auto;
      }

      &.is-extended {
        padding-top: 0;
      }
    }

    /* 新增：中间+右侧容器 */
    .page-component__main {
      display: flex;
      margin-left: 240px; /* 给左侧导航留空间 */
    }

    /* 调整原有内容区样式 */
    .page-component__content {
      width: calc(100% - 640px);
      margin: 0 auto;
      flex: 1; /* 占满剩余空间 */
      padding: 0 30px 100px 30px; /* 调整左右padding，留出右侧锚点空间 */
      box-sizing: border-box;
    }

    /* 新增：右侧锚点导航样式 */
    .page-component__anchor-nav {
      width: 200px;
      height: calc(100vh - 80px);
      position: fixed;
      top: 80px;
      right: 0;
      padding: 48px;
      flex-shrink: 0; /* 固定宽度，不收缩 */
      border-left: 1px solid #e6e6e6;
      padding: 20px 0;

      .anchor-nav__wrapper {
        position: sticky;
        top: 20px;
        padding: 0 10px;
      }

      .anchor-nav__title {
        font-size: 14px;
        font-weight: 600;
        color: #606266;
        margin-bottom: 15px;
        padding-left: 10px;
      }

      .anchor-nav__list {
        list-style: none;
        padding: 0;
        margin: 0;
      }

      .anchor-nav__item {
        padding: 4px 0;
        line-height: 22px;
        cursor: pointer;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        border-radius: 4px;
        transition: all 0.2s;
      }

      /* 不同层级锚点的缩进 */
      .anchor-level-2 {
        padding-left: 10px;
        font-weight: 500;
      }

      .anchor-level-3 {
        padding-left: 20px;
        font-size: 12px;
        color: #909399;
      }

      .anchor-level-4 {
        padding-left: 30px;
        font-size: 12px;
        color: #909399;
      }

      /* 高亮当前锚点 */
      .anchor-nav__item.is-active {
        color: #409eff;
        background-color: #f5f7fa;
      }

      .anchor-nav__item:hover {
        color: #409eff;
      }
    }

    .content {
      padding-top: 50px;
      max-width: 900px; /* 限制内容宽度，提升阅读体验 */

      > {
        h3 {
          margin: 55px 0 20px;
        }

        table {
          border-collapse: collapse;
          width: 100%;
          background-color: #fff;
          font-size: 14px;
          margin-bottom: 45px;
          line-height: 1.5em;

          strong {
            font-weight: normal;
          }

          td, th {
            border-bottom: 1px solid #dcdfe6;
            padding: 15px;
            max-width: 250px;
          }

          th {
            text-align: left;
            white-space: nowrap;
            color: #909399;
            font-weight: normal;
          }

          td {
            color: #606266;
          }

          th:first-child, td:first-child {
            padding-left: 10px;
          }
        }

        ul:not(.timeline) {
          margin: 10px 0;
          padding: 0 0 0 20px;
          font-size: 14px;
          color: #5e6d82;
          line-height: 2em;
        }
      }
    }
  }

  /* 适配移动端：隐藏右侧锚点导航 */
  @media (max-width: 768px) {
    .page-component {
      .page-component__nav {
        width: 100%;
        position: static;
        margin-top: 0;
      }
      .side-nav {
        padding-top: 0;
        padding-left: 50px;
      }
      /* 移动端隐藏右侧锚点 */
      .page-component__anchor-nav {
        display: none;
      }
      .page-component__main {
        margin-left: 0;
      }
      .page-component__content {
        padding-left: 10px;
        padding-right: 10px;
      }
      .content {
        padding-top: 0;
        max-width: 100%;
      }
      .content > table {
        overflow: auto;
        display: block;
      }
    }
  }
</style>
<template>
  <el-scrollbar class="page-component__scroll" ref="componentScrollBar">
  <div class="page-container page-component">
    <el-scrollbar class="page-component__nav">
      <side-nav :data="navsData[lang]" :base="`/${ lang }/component`"></side-nav>
    </el-scrollbar>
    <div class="page-component__content">
      <router-view class="content"></router-view>
      <footer-nav></footer-nav>
    </div>
    <!-- 新增：右侧锚点导航 -->
    <el-scrollbar class="page-component__anchor-nav" v-if="anchorList.length > 0">
      <div class="anchor-nav__wrapper">
        <div class="anchor-nav__title">目录</div>
        <ul class="anchor-nav__list">
          <li
            v-for="item in anchorList"
            :key="item.id"
            :class="[
              'anchor-nav__item',
              `anchor-level-${item.level}`,
              { 'is-active': activeAnchorId === item.id }
            ]"
            @click="scrollToAnchor(item.id)"
          >
            {{ item.text }}
          </li>
        </ul>
      </div>
    </el-scrollbar>
    <el-backtop
      v-if="showBackToTop"
      target=".page-component__scroll .el-scrollbar__wrap"
      :right="100"
      :bottom="150"
    ></el-backtop>
  </div>
  </el-scrollbar>
</template>
<script>
  import bus from '../../bus';
  import navsData from '../../nav.config.json';
  import throttle from 'throttle-debounce/throttle';

  export default {
    data() {
      return {
        lang: this.$route.meta.lang,
        navsData,
        scrollTop: 0,
        showHeader: true,
        componentScrollBar: null,
        componentScrollBoxElement: null,
        anchorList: [], // 锚点列表（id/level/text）
        activeAnchorId: '', // 当前高亮的锚点id
        navFaded: false // 原有bus监听的变量，补充初始化
      };
    },
    watch: {
      '$route.path'() {
        // 触发伪滚动条更新
        this.componentScrollBox.scrollTop = 0;
        this.$nextTick(() => {
          this.componentScrollBar.update();
          this.extractAnchors();
          this.activeAnchorId = '';
        });
      }
    },
    methods: {
      renderAnchorHref() {
        if (/changelog/g.test(location.href)) return;
        const anchors = document.querySelectorAll('h2 a,h3 a,h4 a,h5 a');
        const basePath = location.href.split('#').splice(0, 2).join('#');

        [].slice.call(anchors).forEach(a => {
          const href = a.getAttribute('href');
          a.href = basePath + href;
        });
      },

      goAnchor() {
        if (location.href.match(/#/g).length > 1) {
          const anchor = location.href.match(/#[^#]+$/g);
          if (!anchor) return;
          const elm = document.querySelector(anchor[0]);
          if (!elm) return;

          setTimeout(_ => {
            this.componentScrollBox.scrollTop = elm.offsetTop - 20;
            this.activeAnchorId = anchor[0].slice(1);
          }, 50);
        }
      },

      handleScroll() {
        const scrollTop = this.componentScrollBox.scrollTop;
        if (this.showHeader !== this.scrollTop > scrollTop) {
          this.showHeader = this.scrollTop > scrollTop;
        }
        if (scrollTop === 0) {
          this.showHeader = true;
        }
        if (!this.navFaded) {
          bus.$emit('fadeNav');
        }
        this.scrollTop = scrollTop;
        this.highlightActiveAnchor(scrollTop);
      },
      extractAnchors() {
        if (/changelog/g.test(location.href)) return;
        this.anchorList = [];
        const headingElements = document.querySelectorAll('.content h3[id], .content h4[id]');
        headingElements.forEach(el => {
          const text = el.textContent.replace(/[^a-zA-Z0-9\u4e00-\u9fa5_\-\. ]/g, '').trim()
          this.anchorList.push({
            id: el.id,
            level: parseInt(el.tagName.slice(1)),
            text
          });
        });
      },
      scrollToAnchor(anchorId) {
        const targetEl = document.getElementById(anchorId);
        if (!targetEl || !this.componentScrollBox) return;
        this.componentScrollBox.scrollTop = targetEl.offsetTop - 20;
        this.activeAnchorId = anchorId;
        window.history.replaceState(null, '', `#${anchorId}`);
      },
      highlightActiveAnchor(scrollTop) {
        if (this.anchorList.length === 0) return;
        for (let i = this.anchorList.length - 1; i >= 0; i--) {
          const item = this.anchorList[i];
          const targetEl = document.getElementById(item.id);
          if (!targetEl) continue;
          if (scrollTop >= targetEl.offsetTop - 30) {
            this.activeAnchorId = item.id;
            break;
          }
        }
      }
    },
    computed: {
      showBackToTop() {
        return !this.$route.path.match(/backtop/);
      }
    },
    created() {
      bus.$on('navFade', val => {
        this.navFaded = val;
      });
    },
    mounted() {
      this.componentScrollBar = this.$refs.componentScrollBar;
      this.componentScrollBox = this.componentScrollBar.$el.querySelector('.el-scrollbar__wrap');
      this.throttledScrollHandler = throttle(300, this.handleScroll);
      this.componentScrollBox.addEventListener('scroll', this.throttledScrollHandler);
      this.renderAnchorHref();
      this.goAnchor();
      this.$nextTick(() => {
        this.extractAnchors();
      });
      document.body.classList.add('is-component');
    },
    destroyed() {
      document.body.classList.remove('is-component');
    },
    beforeDestroy() {
      this.componentScrollBox.removeEventListener('scroll', this.throttledScrollHandler);
    },
    beforeRouteUpdate(to, from, next) {
      next();
      setTimeout(() => {
        const toPath = to.path;
        const fromPath = from.path;
        if (toPath === fromPath && to.hash) {
          this.goAnchor();
        }
        if (toPath !== fromPath) {
          document.documentElement.scrollTop = document.body.scrollTop = 0;
          this.renderAnchorHref();
          this.$nextTick(() => {
            this.extractAnchors();
            this.activeAnchorId = '';
          });
        }
      }, 100);
    }
  };
</script>
