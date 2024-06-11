<script setup>
import { useMainStore } from '@/stores/main';
import { storeToRefs } from 'pinia'
const main = useMainStore();
const { isMobile, mainNav } = storeToRefs(main); 

import { Picture as IconPicture } from '@element-plus/icons-vue';

import { ref } from 'vue';
const menusItems = ref([
  {menus: '概览', url: '/', icon: 'dashboard', top: '29px'},
  {menus: '文章', url: '/article', icon: 'article', top: '94px'},
  {menus: '分类', url: '/category', icon: 'category', top: '160px'},
  {menus: '标签', url: '/tag', icon: 'tag', top: '225px'},
  {menus: '配置', url: '/config', icon: 'config', top: '290px'},
])

import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()

const menusDiv = ref(null)
const activeDiv = ref(null)
// const activeTop = ref({
//   '/': 0, 
//   '/article': 1, '/edit-article': 1 ,
//   '/category': 2, '/tag': 3, '/config': 4
// })
const activeTop = ref({
  'overview': 0, 
  'article': 1, 'edit-article': 1,
  'category': 2, 'tag': 3, 'config': 4
})

import { onMounted } from 'vue'
function changeActive() {
  // console.log(route);
  // const currPath = route.fullPath
  const currPath = route.name
  const idx = activeTop.value[currPath]

  let { navBar } = storeToRefs(main)

  navBar.value =  [menusItems.value[idx].menus]

  if (activeDiv.value) {
    const offset = 65 * idx
    activeDiv.value.style.transform = "translateY(" + offset + "px)"
    activeDiv.value.style.opacity = 1
  }
}

// const mainNav = ref(['overview', 'article', 'category', 'tag', 'config'])
router.afterEach((to) => {
  if (mainNav.value.includes(to.name)) {
    changeActive()
  }
})

onMounted(() => {
  // 初始化选择样式
  changeActive()
  
  window.addEventListener('resize', () => {
      isMobile.value = window.innerWidth < 1119 ? true : false;
      if (mainNav.value.includes(route.name)) {
        changeActive()
      }
  });
})
</script>

<template>
  <div class="sidebar-wrapper" v-if="!isMobile">
    <el-image v-loading="true" element-loading-background="rgba(235, 235, 235, 0)" class="logo" src="" fit="contain">
      <template #error>
        <div style="background-color: var(--bg-color);">
          <el-icon style="width: 100%; height: 70px; font-size: 50px;"><icon-picture/></el-icon>
        </div>
      </template>
    </el-image>

    <nav>
      <div class="active-item" ref="activeDiv">
        <div class="active-top"></div>
        <div class="active-front-side">
          <div class="front"></div>
          <div class="side"></div>
        </div>
      </div>
      <div class="menus-item" v-for="(item, idx) in menusItems" :key="idx" ref="menusDiv">
        <RouterLink :to="item.url">
          <div>
            <span><SvgIcon class="menus-icon" :svgName="item.icon" /></span>
            <span>{{ item.menus }}</span>
          </div>
        </RouterLink>
      </div>
    </nav>
  </div>
</template>

<style scoped>
.sidebar-wrapper {
  position: fixed;
  height: 100%;
  width: 200px;
  box-shadow: -6px 0px 10px 1px var(--text-color1);
  background-color: var(--sidebar-bg-color);

  .logo {
    width: 100%;
    height: 70px;
  }

  nav {
    position: relative;
    width: 100%;
    height: calc(100% - 70px);
    padding: 30px 15px 100px 35px;

    .menus-item {
      padding: 25px 0px 15px 0px;
      font-size: 20px;

      &:hover {
        .menus-icon {
          animation: menus-active 1s linear infinite alternate;
        }
      }

      .menus-icon {
        width: 50px;
        transform: scale(1.4);
        transition: .8s ease-out;
      }
    }

    /* 长方体样式 */
    .active-item {
      top: 29px;
      position: absolute;
      width: 164px;
      height: 55px;
      transition: .5s ease-out;
      /* 65px * i */
      transform: translateY(-39px);
      opacity: 0;

      .active-top {
        width: 160px;
        height: 16px;
        border: 1px solid black;
        transform: skew(-28deg, 0deg);
        background-color: var(--text-color1);
        border-radius: 3px 3px 0px 0px;
        box-shadow: 0px 0px 10px 1px var(--text-color1);
      }
      .active-front-side {
        /* width: 164px; */
        display: flex;

        .front {
          border: 1px solid black;
          width: 160px;
          height: 45px;
          margin-left: -4px;
          background-color: var(--text-color1);
          opacity: .8;
          border-radius: 0px 0px 3px 3px;
          box-shadow: 0px 5px 10px 3px var(--text-color1);
        }
        .side {
          width: 9px;
          border: 1px solid black;
          transform: skew(0deg, -62deg);
          margin-top: -10px;
          margin-bottom: 8px;
          background-color: var(--text-color1);
          border-radius: 0px 3px 3px 3px;
          box-shadow: 0px 0px 10px 1px var(--text-color1);
        }
      }
    }
  }
}

@keyframes menus-active {
  from {
    transform: scale(1.8) rotate(-30deg);
  } to {
    transform: scale(1.8) rotate(0deg);
  }
}
</style>
