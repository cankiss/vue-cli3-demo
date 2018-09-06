import Vue from 'vue'
import Router from 'vue-router'
import MyPages from '@/views/my'
import SignIn from '@/views/signIn'
import Login from '@/views/login'
import NotFound from '@/views/404'
import Token from '@/views/token'

import { local } from '@/utils/storage'

Vue.use(Router)

const needLogin = value =>
    value.map(item => Object.assign(item, {
        meta: {
            requiresAuth: true
        }
    }));

const router = new Router({
    mode: 'history',
    routes: [...needLogin(MyPages), ...SignIn, {
        path: '/',
        component: Token
    }, {
        name: 'login',
        path: '/login',
        component: Login
    }, {
        path: '*',
        component: NotFound
    }]
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        !local.get('_token') ? next({
            path: '/login',
            query: {
                redirect: to.fullPath
            }
        }) : next()
    } else {
        next()
    }
})

export default router