import Vue from 'vue'
import VueRouter, {RouteConfig} from 'vue-router'
import {authService} from "@/services";
import Layout from "@/components/Layout";
import Home from "@/views/Home";
import Signin from '@/views/Signin'
import Signup from "@/views/Signup";
import Profile from "@/views/Profile"


/**
 * @type {Array<RouteConfig>}
 */
const routes = [
    {
        path: '/signin',
        name: 'signin',
        props: true,
        component: Signin
    },
    {
        path: '/signup',
        name: 'signup',
        component: Signup
    },
    {
        path: '/',
        redirect: "/home",
        component: Layout,
        props: router => ({
            user: authService.getCurrentUser()
        }),
        children: [
            {
                path: "/home",
                name: "home",
                component: Home,
            },
            {
                path: "/profile",
                name: "profile",
                component: Profile,
            },
        ]
    }
]

Vue.use(VueRouter)

const router = new VueRouter({
    routes
})

router.beforeEach((to, from, next) => {
    console.log("Indo para >>> ", to)
    switch (to.name) {
        case "signin":
        case "signup":
            next()
            break
        default:
            authService.isAuthenticated().then( _ => {
                next()
            }).catch( async reason => {
                await authService.signout()
                reason ? next({name: "signin", params: {reason}}) : next({name: "signin"})
            })
    }
})

export default router
