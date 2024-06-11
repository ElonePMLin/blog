<script setup>
const props = defineProps(['svgName'])
const svgId = `#icon-${props.svgName}`
</script>

<template>
  <svg class="svg-icon" aria-hidden="true">
    <use :xlink:href="svgId"></use>
  </svg>
</template>

<style scoped>
.svg-icon {
  width: 1rem;
  height: 1rem;
}
</style>
