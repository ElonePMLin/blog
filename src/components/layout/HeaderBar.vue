<script setup>
import { useMainStore } from '@/stores/main';
import { storeToRefs } from 'pinia';
const main = useMainStore();
const { navBar, mainNav } = storeToRefs(main);

import { ref } from 'vue';
const changeNavMain = ref(false);

import { useRouter } from 'vue-router';
const router = useRouter();
router.afterEach((to) => {
  if (mainNav.value.includes(to.name)) {
    changeNavMain.value = true
    setTimeout(() => {
      changeNavMain.value = false
    }, 1);  
  }
})

const isLight = ref(true);
import { onMounted } from 'vue';
onMounted(() => {
  const theme = sessionStorage.getItem('theme')
  isLight.value = theme ? (theme == 'light' ? true : false) : true
  document.documentElement.dataset.theme = isLight.value ? 'light' : 'dark'
})
const changeTheme = () => {
  const changeTo = isLight.value ? 'light' : 'dark'
  sessionStorage.setItem('theme', changeTo)
  document.documentElement.dataset.theme = changeTo
}

</script>

<template>
  <div class="header-wrapper">
    <div class="nav-title">
      <div class="nav-main" v-if="!changeNavMain">{{ navBar[0] }}</div>
      <div style="float: left;" v-for="item, idx in navBar.slice(1)" :key="idx">
        <span class="nav-con"> - </span>
        <div style="text-overflow: ellipsis; overflow: hidden; width: 160px;"
          :style="idx == navBar.length - 2 ? 'color: var(--text-color)' : ''" class="nav-sub"
        >
          {{ item }}
        </div>
      </div>
      
    </div>

    <div class="option">
      <div class="switch-theme">
        <el-switch v-model="isLight" @click="changeTheme"
        style="--el-switch-on-color: rgba(235, 235, 235, 0.6); --el-switch-off-color: rgba(60, 60, 60, 0.702);">
          <template #active-action>
            <span class="custom-active-action">
              <SvgIcon class="sun theme-svg" svgName="sun" />
            </span>
          </template>
          <template #inactive-action>
            <span class="custom-inactive-action">
              <SvgIcon class="moon theme-svg" svgName="moon" />
            </span>
          </template>
        </el-switch>
      </div>
      
    </div>
  </div>
</template>

<style scoped>
.header-wrapper {
  /* border: 1px solid black; */
  box-shadow: 0px -4px 5px 1px var(--text-color1);
  height: 70px;
  background-color: var(--header-bg-color);
  min-width: 340px;

  /* @media (min-width: 1119px) { */
    margin-left: 200px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    .nav-title {
      height: 70px;
      width: auto;
      line-height: 70px;
      padding-left: 20px;
      font-size: 24px;

      .nav-main {
        float: left;
        animation: nav-main-title 1s ease-out;
        color: var(--text-color1);
      }
      .nav-con {
        padding: 0 10px;
      }
      .nav-sub {
        float: right;
        font-size: 20px;
        color: var(--text-color1);
        animation: nav-sub-title 1s ease-out;
      }
    }
    .option {
      height: 70px;
      /* width: 200px; */

      .switch-theme {
        float: right;
        height: 70px;
        width: 40px;
        margin: 0px 15px;
        line-height: 70px;

        .theme-svg {
          vertical-align: -2.5px;
        }
      }
    }
    
  /* } */

  @media (max-width: 1118px) {
    margin-left: 0px;
  }
}
@keyframes nav-main-title {
  from {
    transform: translateX(-100px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
@keyframes nav-sub-title {
  from {
    transform: translateX(100px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
</style>
