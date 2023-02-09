import {
  createRouter,
  createWebHashHistory
} from 'vue-router'
import routes from './routerTable'

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
