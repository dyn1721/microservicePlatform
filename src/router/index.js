import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'

import UserLayout from '@/layouts/UserLayout'
import BasicLayout from '@/layouts/BasicLayout'
import BlankLayout from '@/layouts/BlankLayout'

Vue.use(Router)

const router = new Router({
  routes: [
    // user
    {
      path: '/user',
      component: UserLayout,
      children: [
        { path: '/user', redirect: '/user/login' },
        { path: '/user/login', component: () => import('@/views/User/Login') },
        { path: '/user/register', component: () => import('@/views/User/Register') },
      ],
    },
    // app
    {
      path: '/',
      component: BasicLayout, //实现跨子层的组件
      children: [
        // dashboard
        { path: '/', redirect: '/user/login' },
        {
          path: '/dashboard',
          name: 'dashboard',
          component: BlankLayout,
          children: [
            { path: '/dashboard/analysis', name: 'analysis', component: () => import('@/views/Dashboard/Analysis') },
            // { path: '/dashboard/monitor', name: 'monitor', component: () => import('@/views/Dashboard/Analysis') },
            { path: '/dashboard/workplace', name: 'workplace', component: () => import('@/views/Dashboard/Workplace') },
          ]
        },
		{
		  path: '/business',
		  name: 'business',
		  component: BlankLayout,
		  children: [
		    { path: '/business/homework', name: 'homework', component: () => import('@/views/Business/Homework') },
		    // { path: '/dashboard/monitor', name: 'monitor', component: () => import('@/views/Dashboard/Analysis') },
		  ]
		},
        {
          path: '/system',
          name: 'system',
          component: BlankLayout,
          children: [
			{
			  path: '/system/journal',
			  name: 'journal',
			  component: () => import('@/views/System/Journal')
			},
			{
			  path: '/system/data',
			  name: 'data',
			  component: () => import('@/views/System/Data')
			},
            {
              path: '/system/role',
              name: 'role',
              component: () => import('@/views/System/Role')
            },

          ]
        },
      ]
    },

  ]
})

router.afterEach(() => {
  store.commit('global/UpdateBasicLayoutSpinning', false);
});

export default router
