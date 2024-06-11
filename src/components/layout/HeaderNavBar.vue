<script setup>
import { useMainStore } from '@/stores/main';
import { storeToRefs } from 'pinia';
const main = useMainStore();
const { isMobile } = storeToRefs(main);


</script>

<template>
  <div v-if="isMobile" class="header-nav-bar-wrapper">
    <div class="header-nav-bar">
      <div class="nav">
        <SvgIcon svgName="dashboard"/>
        <RouterLink to="/">概览</RouterLink>
      </div>
      <div class="nav">
        <SvgIcon svgName="article"/>
        <RouterLink to="/article">文章</RouterLink>
      </div>
      <div class="nav">
        <SvgIcon svgName="category"/>
        <RouterLink to="/category">分类</RouterLink>
      </div>
      <div class="nav">
        <SvgIcon svgName="tag"/>
        <RouterLink to="/tag">标签</RouterLink>
      </div>
      <div class="nav">
        <SvgIcon svgName="config"/>
        <RouterLink to="/config">配置</RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.header-nav-bar-wrapper {
  height: 30px;

  .header-nav-bar {
    padding: 2px 10px 2px 10px;
    height: 100%;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    box-shadow: 0px 3px 10px -8px;

    .nav {
      padding: 0px 10px 0px 10px;

      svg {
        vertical-align: middle;
        margin-right: 3px;
      }
    }
  }
}
</style>
