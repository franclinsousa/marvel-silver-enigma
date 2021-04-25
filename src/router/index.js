import Vue from 'vue'
import VueRouter, {RouteConfig} from 'vue-router'
import {authService} from "@/services"
import Layout from "@/components/Layout"
import Signin from '@/views/Signin'
import Signup from "@/views/Signup"
import Account from "@/views/Account"
import Comic from "@/views/comic/Comic"
import ComicList from "@/views/comic/ComicList"
import ComicDetails from "@/views/comic/ComicDetails"


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
        redirect: "/comics",
        component: Layout,
        props: router => ({
            user: authService.getCurrentUser()
        }),
        children: [
            {
                path: "/comics",
                name: "home",
                component: Comic,
                children: [
                    {
                        path: "/comics",
                        name: "comics",
                        component: ComicList,
                    },
                    {
                        path: "/comics/:comicId",
                        name: "comic-details",
                        props: true,
                        component: ComicDetails,
                    },
                ],
            },
            {
                path: "/account",
                name: "account",
                component: Account,
            },
        ]
    }
]

Vue.use(VueRouter)

const router = new VueRouter({
    routes
})

router.beforeEach((to, from, next) => {
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
