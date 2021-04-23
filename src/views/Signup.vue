<template>
    <div id="signup" class="text-center">
        <main class="form-signin">
            <form autocomplete="off" class="needs-validation" novalidate>
                <i class="fas fa-fingerprint fa-10x"></i>
                <h1 class="h3 mb-3 fw-normal">Please sign up</h1>

                <div class="form-floating mb-3">
                    <input type="text" class="form-control" id="floatingInput" placeholder="username" aria-describedby="usernameHelpBlock"
                           v-model="username"
                           :class="{'is-invalid': !usernameIsValid}"
                           required
                           @input="validationUsername"
                    >
                    <label for="floatingInput">Username</label>
                    <div id="usernameHelpBlock" class="form-text">
                        <small>Must be 8-16 characters long, contain only letters and numbers.</small>
                    </div>
                    <div class="invalid-feedback"
                         v-for="it in errors.username" :key="it"
                    >
                        {{ it }}
                    </div>
                </div>
                <div class="form-floating mb-3">
                    <input type="password" class="form-control" id="floatingPassword" placeholder="password" aria-describedby="passwordHelpBlock"
                           v-model="password"
                           :class="{'is-invalid': !passwordIsValid}"
                           @input="validationPassword"
                           required
                    >
                    <label for="floatingPassword">Password</label>
                    <div id="passwordHelpBlock" class="form-text">
                        <small>Must be 8-20 characters long, contain letters, numbers and special characters.</small>
                    </div>
                    <div class="invalid-feedback"
                         v-for="it of errors.password" :key="it"
                    >
                        {{ it }}
                    </div>
                </div>

                <div class="p-3 float-end">
                    <router-link :to="{name: 'signin'}">or, Login!</router-link>
                </div>

                <button class="w-100 btn btn-lg btn-primary" type="submit" @click.prevent="signup"
                    :class="{
                        disabled: disableBtnSignup
                    }"
                >Create an Account</button>

            </form>
        </main>
    </div>
</template>

<script>
import {userService} from "@/services"
import Swal from "sweetalert2"


export default
/**
 * @type {ComponentOptions}
 */
{
    name: "Signup",
    data() {
        return {
            username: "",
            password: "",
            errors: {
                username: [],
                password: [],
            }
        }
    },
    mounted() {
    },
    computed: {
        disableBtnSignup: function () {
            return this.hasErrors || this.isEmptyFields
        },
        hasErrors: function() {
            return !(this.usernameIsValid && this.passwordIsValid)
        },
        isEmptyFields: function() {
            const a = (this.username.length < 1)
            const b = (this.password.length < 1)
            return a || b
        },
        usernameIsValid: function() {
            return this.errors.username.length === 0
        },
        passwordIsValid: function () {
            return this.errors.password.length === 0
        }
    },
    methods: {
        validationUsername() {
            this.errors.username = []

            if (this.username === "") return

            if (8 > this.username.length || this.username.length > 16) {
                this.errors.username.push("Must be 8-16 characters long!")
            }
            if(!/^[a-zA-Z0-9]*$/.test(this.username)) {
                this.errors.username.push("Must be contain only letters and numbers!")
            }
        },
        validationPassword() {
            this.errors.password = []

            if (this.password === "") return

            if (8 > this.password.length || this.password.length > 20) {
                this.errors.password.push("Must be 8-20 characters long!")
            }
            if(!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/.test(this.password)) {
                this.errors.password.push("Must be contain letters, numbers and special characters($*&@#)!")
            }
        },
        signup() {
            const user = {
                username: this.username,
                password: this.password,
            }
            userService.create(user)
                .then(_ => {
                    this.$router.push({name: "signin"})
                })
                .catch(err => {
                    Swal.fire({
                        text: err.message,
                        icon: "error",
                        showConfirmButton: false,
                        position: "center",
                        timer: 5000,
                    })
                })
        }
    }
}
</script>

<style lang="sass" scoped>
.form-signin
    width: 100%
    max-width: 330px
    padding: 15px
    margin: auto

#signup
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
