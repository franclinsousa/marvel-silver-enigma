<template>
    <div class="">
        <nav class="navbar navbar-expand-md navbar-light bg-white fixed-top border-bottom mb-3 p-3">
            <div class="container">
                <router-link class="navbar-brand text-capitalize" :to="$route">{{ $route.name }}</router-link>
                <button class="navbar-toggler collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="navbar-collapse collapse" id="navbarCollapse" style="">
                    <ul class="navbar-nav me-auto mb-2 mb-md-0">
                        <li class="nav-item">
                            <router-link class="nav-link" :to="{name: 'comics'}" active-class="text-primary">Comics</router-link>
                        </li>
                    </ul>
                    <ul class="navbar-nav">
                        <li class="nav-item dropdown">
                            <a href="#" class="nav-link dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                                <img :src="`https://www.gravatar.com/avatar/${hashForAvatar}?d=monsterid`" alt="mdo" width="32" height="32" class="rounded-circle d-none d-sm-none d-md-inline">
                                <small class="d-sm-inline d-md-none text-uppercase">{{ username }}</small>
                            </a>
                            <ul class="dropdown-menu text-small dropdown-menu-end" aria-labelledby="dropdownUser1">
                                <li><router-link class="dropdown-item" :to="{name: 'account'}" active-class="active">Account</router-link></li>
                                <li><hr class="dropdown-divider d-md-block d-sm-none"></li>
                                <li><button class="btn dropdown-item" @click="signout">Sign out</button></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        <main class="container">
            <router-view />
        </main>
    </div>
</template>

<script>
import crypto from "crypto"
import {authService} from "@/services"

export default {
    name: "Layout",
    props: {
        user: {
            type: Object,
            default: () => ({})
        }
    },
    computed: {
        hashForAvatar: function () {
            return this.user?.email && crypto.createHash("md5").update(this.user.email).digest("hex")
        },
        username: function() {
            return this.user?.username || "more"
        },
    },
    methods: {
        signout() {
            authService.signout()
                .then( _ => {
                    this.$router.push({name: "signin"})
                })
        }
    },
}
</script>

<style lang="sass">

main.container
    padding-top: 32px


*::-webkit-scrollbar
    width: 8px
    height: 8px
    position: fixed

*::-webkit-scrollbar-track
    background: transparent

*::-webkit-scrollbar-thumb
    background-color: rgba(0, 0, 0, 0.55)
    border-radius: 32px

*::-webkit-resizer,
*::-webkit-scrollbar-button,
*::-webkit-scrollbar-corner
    display: none

html
    overflow: hidden

body
    top: 81px
    bottom: 0
    position: absolute
    overflow: auto
    width: 100%
@media (max-width: 768px)
    body
        top: 73px !important


</style>