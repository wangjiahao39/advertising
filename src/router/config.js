import React,{Component} from 'react';
//import Home from '@/pages/home'
//import Plan from '@/pages/plan'
import Unit from '@/pages/unit'
import Idea from '@/pages/idea'
import Tools from '@/pages/tools'
import Account from '@/pages/account'
import Customer from '@/pages/customer'
import Loadable from './loadable'
import Login from '@/pages/login/login'
import Index from '@/pages/index/index'
import {Redirect} from 'react-router-dom'

let router = {
    routes: [
        {
            path:'/',
            exact:true,
            component:()=><Redirect from="/" to="/index/home"/>
        },
        {
            path: '/login',
            component: Login,
            exact:true
        },
        {
            path: '/index',
            component: Index,
            children: [
                {
                    path: '/index/home',
                    component: Loadable(()=>import(/*webpackChunkName:'home'*/'@/pages/home'))
                },
                {
                    path: '/index/plan',
                    component: Loadable(()=>import(/*webpackChunkName:'plan'*/'@/pages/plan'))
                },
                {
                    path: '/index/unit',
                    component: Unit
                },
                {
                    path: '/index/idea',
                    component: Idea
                },
                {
                    path: '/index/tools',
                    component: Tools
                    // children:[
                    //     {
                    //         path:'/tools/account',
                    //         component:Account
                    //     },
                    //     {
                    //         path:'/tools/customer',
                    //         component:Customer
                    //     }
                    // ]
                },
                {
                    path: '/index/account',
                    component: Account
                },
                {
                    path: '/index/customer',
                    component: Customer
                }
            ]
        }
    ]
}
let { routes } = router
export { routes }
export default router