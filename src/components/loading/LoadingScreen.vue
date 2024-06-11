<script setup>
const props = defineProps(['isLoading', 'isHeight'])
</script>

<template>
  <div :style="{ height: props.isHeight ? props.isHeight :'auto' }" v-if="props.isLoading" class="loading-wrapper">
    <SvgIcon svgName="loading"></SvgIcon>
  </div>
</template>

<style scoped>
.loading-wrapper {
  z-index: 999;
  position: absolute;
  width: 100%;
  height: 100%;
  text-align: center;
  line-height: 100%;
  
  svg {
    width: 4rem;
    height: auto;
  }
}
</style>