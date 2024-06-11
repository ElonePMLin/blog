import { createRouter, createWebHistory } from 'vue-router'
import HomeAnimation from '@/views/home/HomeAnimation.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: HomeAnimation,
      meta: {
        title: "blog管理系统"
      },
      children: [
        {
          path: '/',
          name: 'overview',
          component: () => import('@/views/home/HomeView.vue')
        },
        {
          path: '/article',
          name: 'article',
          component: () => import('@/views/article/ArticleView.vue')
        },
        {
          path: '/edit-article/:id(\\d+)*',
          name: 'edit-article',
          component: () => import('@/views/article/EditArticleView.vue')
        },
        {
          path: '/category',
          name: 'category',
          component: () => import('@/views/category/CategoryView.vue')
        },
        {
          path: '/tag',
          name: 'tag',
          component: () => import('@/views/tag/TagView.vue')
        },
        {
          path: '/config',
          name: 'config',
          component: () => import('@/views/config/ConfigView.vue')
        },
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/LoginView.vue')
    },
    {
      path: "/:404(.*)*",
      name: 'page_not_found',
      component: () => import('@/views/404/PageNotFound.vue')
    }
  ]
})

export default router
