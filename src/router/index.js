import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Part1 from '../pages/Page1/Part1.vue'
import Part3 from '@/pages/Page3/Part3.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/part1',
      name: 'part1',
      component: Part1
    },
    {
      path: '/part2',
      name: 'part2',
      component: () => import('../pages/Page2/Part2.vue')
    },
    {
      path: '/part3',
      name: 'part3',
      component: Part3
    }
  ]
})

export default router
