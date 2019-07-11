import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'
import Desktop from './views/Desktop.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/desktop',
      name: 'desktop',
      component: Desktop
    }
  ]
})
