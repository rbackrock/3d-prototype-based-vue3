import Home from '@/views/home/HomeView.vue'

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