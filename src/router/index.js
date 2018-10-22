import Vue from 'vue'
import Router from 'vue-router'
import Mobile from '@/components/Mobile'
import Admin from '@/components/Admin'
import Screen from '@/components/Screen'
import Dice from '@/components/Dice'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Mobile',
      component: Mobile
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin
    },
    {
      path: '/screen',
      name: 'Screen',
      component: Screen
    },
  ]
})
