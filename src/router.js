import { createWebHistory, createRouter } from 'vue-router'

import HomeView from './pages/HomeView.vue'
import ContactView from './pages/ContactView.vue'
import PjShow from './pages/PjShow.vue'

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: HomeView },
    { path: '/contact', component: ContactView },
    { path: '/pj/:id', name: 'pj.show', component: PjShow, props: true },
  ],
})