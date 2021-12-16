import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/test',
    name: 'Test',
    component: () => import('../views/Test.vue')
  },
  {
    path: '/test-event',
    component: () => import('../views/TestEvent.vue')
  },
  {
    path: '/test-computed',
    component: () => import('../views/TestComputed.vue')
  },
  {
    path: '/test-condition',
    component: () => import('../views/TestCondition.vue')
  },
  {
    path: '/test-loop',
    component: () => import('../views/TestLoop.vue')
  },
  {
    path: '/test-mixin',
    component: () => import('../views/TestMixin.vue')
  },
  {
    path: '/test-bootstrap',
    component: () => import('../views/TestBootstrap.vue')
  },
  {
    path: '/test-comp',
    component: () => import('../views/comp') // 호출되는 파일이 index.vue인 경우에는 파일명을 생략할 수 있다.
  },
  {
    path: '/test-family/props',
    component: () => import('../views/family/props/Parent.vue')
  },
  {
    path: '/test-family/emit',
    component: () => import('../views/family/emit/Parent.vue')
  },
  {
    path: '/test-family/event-bus',
    component: () => import('../views/family/eventBus/Parent.vue')
  },
  {
    path: '/test-user/list',
    component: () => import('../views/user/UserList.vue')
  },
  {
    path: '/test-user/info',
    component: () => import('../views/user/UserInfo.vue')
  },
  {
    path: '/test-socket',
    component: () => import('../views/TestSocket.vue')
  },
  {
    path: '*', // NotFound 설정을 위한 path('*')는 반드시 맨 하단에 위치 해야 한다.
    component: () => import('../components/NotFound.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
