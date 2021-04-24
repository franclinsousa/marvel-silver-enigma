<template>
    <div id="page-profile">
        <h1>Account</h1>
        <div class="mt-5">
            <form class="row g-3 mx-auto"
                  autocomplete="off"
                  novalidate
            >
                <div class="col-md-6 mb-1">
                    <label class="form-label" for="form-username">Username</label>
                    <input id="form-username" class="form-control" type="text"
                           v-model="user.username"
                           readonly
                    >
                </div>
                <div class="col-md-6"></div>
                <div class="col-md-6 mb-1">
                    <label class="form-label" for="form-name">Name</label>
                    <input id="form-name" class="form-control" type="text" placeholder="type your name"
                           v-model="user.name"
                    >
                </div>
                <div class="col-md-6 mb-1">
                    <label class="form-label" for="form-email">Email</label>
                    <input id="form-email" class="form-control" type="email" placeholder="type your email"
                           v-model="user.email"
                    >
                </div>
                <div class="col-12 text-end">
                    <button class="btn btn-primary px-4"
                            :class="{
                                disabled: !hasChanged
                            }"
                            @click="onSave"
                    >Save</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import {authService, userService} from "@/services"
import Swal from "sweetalert2";


export default {
    name: "Profile",
    data() {
        return {
            user: {
                username: "",
                name: "",
                email: "",
            },
        }
    },
    mounted() {
        this.user = {...authService.getCurrentUser()}
    },
    computed: {
        hasChanged: function() {
            const currUser = authService.getCurrentUser()
            return this.user?.name !== currUser?.name || this.user.email !== currUser.email
        },
    },
    methods: {
        onSave() {
            Swal.fire({
                icon: undefined,
                text: "Processing...",
                showConfirmButton: false,
                allowEnterKey: false,
                allowEscapeKey: false,
                allowOutsideClick: false,
            })
            userService.edit(this.user)
            .then(userEdited => {
                Swal.fire({
                    icon: "success",
                    text: "Changes saved!",
                    timer: 2500,
                    showConfirmButton: false,

                })
                this.user = {...userEdited}
            })
            .catch(err => {
                Swal.fire({
                    title: "Error",
                    icon: "error",
                    text: err.message
                })
            })
        },
    },
}
</script>

<style lang="sass" scoped>

form
    max-width: 85%

</style>
