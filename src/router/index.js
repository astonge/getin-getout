import { createRouter, createWebHistory } from 'vue-router'
import firebase from 'firebase/app'
import 'firebase/auth'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import("../views/Home.vue"),
        },
        {
            path: '/list',
            name: 'list',
            component: () => import("../views/Main.vue"),
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/login',
            name: 'login',
            component: () => import("../views/Login.vue"),
        },
        {
            path: '/register',
            name: 'register',
            component: () => import("../views/Register.vue"),
        }
    ]
})

router.beforeEach(async (to, from, next) => {    
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    if (requiresAuth && !await firebase.getCurrentUser()) {
        next('login')
    } else {
        next()
    }
})

export default router