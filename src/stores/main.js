import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useMainStore = defineStore('main', () => {
  let isMobile = ref(false)
  let navBar = ref(['概览'])
  const mainNav = ref(['overview', 'article', 'category', 'tag', 'config'])
  // const test = ref(null)

  function initWeb() {
    // 设置窗口是否mobile
    isMobile.value = window.innerWidth <= 1119 ? true : false;
    if (navBar.value.length < 2) {
      navBar.value = ['概览']
    } 
  }

  return { isMobile, navBar, mainNav, initWeb }
})
