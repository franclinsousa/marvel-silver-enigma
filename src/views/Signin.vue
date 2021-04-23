<template>
    <div id="signin" class="text-center">
        <main class="form-signin">
            <form autocomplete="off">
                <i class="fas fa-fingerprint fa-10x"></i>
                <h1 class="h3 mb-3 fw-normal">Please sign in</h1>

                <div class="form-floating mb-3">
                    <input type="email" class="form-control" id="floatingInput" placeholder="Username"
                           v-model="credentials.username"
                    >
                    <label for="floatingInput">Username</label>
                </div>
                <div class="form-floating mb-3">
                    <input type="password" class="form-control" id="floatingPassword" placeholder="Password"
                           v-model="credentials.password"
                    >
                    <label for="floatingPassword">Password</label>
                </div>
                <div class="p-3 float-end">
                    <router-link :to="{name: 'signup'}">create account</router-link>
                </div>
                <button class="w-100 btn btn-lg btn-primary" type="submit" @click.prevent="signin">Sign in</button>

            </form>
        </main>
    </div>
</template>

<script>
import Swal from "sweetalert2"
import {authService} from "@/services"

export default
/**
 * @type {ComponentOptions}
 */
{
    name: "Signin",
    props: {
        reason: String,
    },
    data: () => ({
        credentials: {
            username: "",
            password: "",
        }
    }),
    mounted() {
        if(this.reason) Swal.fire(undefined, `${this.reason}`, "warning")
    },
    methods: {
        signin() {
            authService.signin(this.credentials)
                .then( _ => {
                    console.log(_)
                    this.$router.push({name: "home"})
                })
                .catch( err => {
                    Swal.fire({
                        text: err.message,
                        icon: "error",
                        showConfirmButton: false,
                        position: "center",
                        timer: 5000,
                    })
                })
        },
    },
}
</script>

<style lang="sass">
.form-signin
    width: 100%
    max-width: 330px
    padding: 15px
    margin: auto

#signin
    top: 0
    position: fixed
    display: flex
    align-items: center
    padding-top: 40px
    padding-bottom: 40px
    background-color: #f5f5f5
    width: 100%
    height: 100vh

</style>
