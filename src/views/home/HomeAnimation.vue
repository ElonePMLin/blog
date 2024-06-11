<script setup>
import SideBar from '@/components/layout/SideBar.vue';
import HeaderBar from '@/components/layout/HeaderBar.vue';
import HeaderNavBar from '@/components/layout/HeaderNavBar.vue';
</script>

<template>
  <SideBar />
  <HeaderBar />
  <HeaderNavBar />
  
  <div class="router-wrapper">
    <div class="router-card">
      <RouterView :key="$route.fullPath" v-slot="{ Component }">
        <Transition name="homeAnimation" appear>
          <component :is="Component"></component>
        </Transition>
      </RouterView>
    </div>
  </div>
</template>

<style scoped>
.router-wrapper {

  @media (min-width: 1119px) {
    margin-left: 200px;
    height: calc(100vh - 70px);
    border: .1px dotted var(--text-color1);
    box-shadow: 0px 0px 10px -4px var(--text-color1);

    .router-card {
      margin: 8px 0px 0px 4px;
      height: calc(100vh - 79px);
      border: .1px dotted var(--text-color1);
      box-shadow: 0px 0px 10px -4px var(--text-color1);
      transform-origin: right;
    }  
  }
  
}

.homeAnimation-enter-active {
  animation: zoom-box .5s ease-in-out;
}

.homeAnimation-leave-active {
  transform-origin: right;
  animation: zoom-box 1s ease-out reverse;
}
@keyframes zoom-box {
  0% {
    border-radius: 100% 100% 0% 0%;
    transform: scale(0) translate(500%, 450%);
  }
  40% {
    border-radius: 100% 100% 0% 0%;
  }
  60% {
    border-radius: 100% 100% 0% 0%;
  }
  100% {
    transform: scale(1);
  }
}
</style>
