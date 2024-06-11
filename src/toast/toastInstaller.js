const toastPlugin = {
  install(Vue, toastVue) {
    Vue.provide('toast', toastVue.mount('#toast'))
  }
}

export default toastPlugin;