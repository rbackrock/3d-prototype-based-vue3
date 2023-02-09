import Home from '@/views/home/index.vue'

const routes = [
  {
    path: '/',
    redirect: {
      name: 'Home'
    },
    children: [
      {
        path: '/home',
        name: 'Home',
        component: Home
      }
    ]
  }
]

export default routes