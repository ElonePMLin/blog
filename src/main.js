import './assets/css/main.css'

import { createApp } from 'vue'
import App from './App.vue'
const app = createApp(App)

// 存储管理
import { createPinia } from 'pinia'
app.use(createPinia())

// 路由
import router from './router'
app.use(router)

// element+
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
app.use(ElementPlus)

// 自定义svg
import SvgIcon from '@/components/svg/SvgIcon.vue'
app.component('SvgIcon', SvgIcon)

// echarts引入全局
import * as echarts from 'echarts'
app.provide('echarts', echarts)

// 自定义分页器
import PaginatorLoading from '@/components/paginator/PaginatorLoading.vue'
app.component('PaginatorLoading', PaginatorLoading)

// 全局富文本编辑器
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
app.use(mavonEditor)

// 自定义loading
import LoadingScreen from '@/components/loading/LoadingScreen.vue'
app.component('LoadingScreen', LoadingScreen)

// 自定义并注册toast
import ToastView from './toast/ToastView.vue'
import toastPlugin from './toast/toastInstaller'
const toast = createApp(ToastView)
toast.component('SvgIcon', SvgIcon)  // toast的图标
app.use(toastPlugin, toast)

app.mount('#app')
