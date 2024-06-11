<script setup>
// const props = defineProps({
//   loadMore: Function 
// })
const emits = defineEmits(['loadMore'])
function loadingMore() {
  emits('loadMore')
}

</script>

<template>
    <div class=''>
      <!-- 分页按钮 -->
      <div class="page" v-if="true" @click="loadingMore">
        加载更多
      </div>
      <div class="tips" v-else>
        <div class="divider"></div>
        <div class="content">没有更多内容了</div>
        <div class="divider"></div>
      </div>
    </div>
</template>

<style scoped>
.page {
  text-align: center;
  background-color: var(--text-color2);
  width: 120px;
  height: 30px;
  line-height: 30px;
  border-radius: 50px;
  margin: 0 auto;
  margin-top: 20px;
  cursor: pointer;
  color:  var(--text-color1);

  &:hover {
      color: var(--text-color);
  }
}

.tips {
  text-align: center;
  color: var(--text-color1);
  display: flex;
  align-items: center;

  .divider {
    display: inline-block;
    width: 100%;
    background-color: var(--text-color1);
    height: 1px;
  }
  .content {
    display: inline-block;
    width: 300px;
    font-size: 14px;
  }
}
</style>
