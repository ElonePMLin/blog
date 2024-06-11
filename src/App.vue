<template>
  <RouterView></RouterView>
</template>

<script setup>
import { onMounted } from 'vue';
import { useMainStore } from './stores/main';
const main = useMainStore();

onMounted(() => {
  main.initWeb();  // 初始化页面

})

</script>

<style scoped>

</style>
