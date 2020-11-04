import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

export default new VueRouter({
  routes:[
    {
      path:'/company',
      name:'company',
      component:() => import('../pages/company/index'),
      children:[
        {
          path:'manage',
          name:'manage',
          component: () => import('../pages/company/manage/Manage'),
          children:[
            {
              path:'mainpage',
              name:'mainPage',
              component: () => import('../pages/company/manage/MainPage'),
            },
          ],
          redirect:{name: 'mainPage'}
        },
      ],
       redirect:{name: 'manage'}
    },
    {
      path:'/position',
      name:'position',
      component:() => import('../pages/position/position')
    },
    {
      path:'/amap',
      name:'amap',
      component:() => import('../pages/position/AMap')
    },
    {
      path:'/login',
      name:'login',
      component:() => import('../pages/login/Login')
    },
    {
      path:'/error',
      name:'error',
      component:() => import('../pages/error/Error')
    },
    {
      path:'/',
      redirect:{name:'login'}
    },
    {
      path:'*',
      redirect:{name:'error'}
    },
  ]
})
