import Vue from 'vue'
import VueRouter from 'vue-router'
import ItemProfile from '../components/ItemProfile.vue'
import Items from '../components/Items.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Items
  },
  {
    path: '/about',
    name: 'About',
  },
  {
    path: '/itemprofile/:itemId',
    name: 'ItemProfile',
    component: ItemProfile
  }



]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
