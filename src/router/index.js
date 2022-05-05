import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home'
import Login from '@/views/Login'
import Signup from '@/views/Signup'


const routerHistory = createWebHistory()

const router = createRouter({
    history: routerHistory,
    routes: [
        {
            path: '/',
            component: Home
        },
        {
            name: 'login',
            path: '/login',
            component: Login
        },
        {
            name:'signup',
            path: '/signup',
            component: Signup
        }

    ],
})

export default router