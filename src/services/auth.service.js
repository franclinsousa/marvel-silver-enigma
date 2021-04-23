import jwt from "jsonwebtoken"
import store from "@/store"
import api from "./api.service"


const endpoint = "/api/auth"

const authService = {
    /**
     * Sign In Application.
     * @param {Object} credentials
     * @return {Promise<Object>}
     */
    signin(credentials) {
        return api.post(`${endpoint}/token`, credentials)
            .then(function(res)  {
                const encoded = res.data.access_token
                const decoded = jwt.decode(encoded)
                store.dispatch("signin", {encoded, decoded})
                return decoded
            })
            .catch(err => Promise.reject(err.response.data))
    },
    /**
     * Sign Out Application.
     * @return {Promise<any>}
     */
    signout() {
        return store.dispatch("signout")
    },
    /**
     * Verify current user is authenticated with valid token.
     * @return {Promise<any>}
     */
    isAuthenticated() {
        return new Promise((resolve, reject) => {
            const token = store.getters.token
            if(token) {
                token.decoded.exp >= Date.now() / 1000 ? resolve() : reject("Sessão expirada!")
            } else {
                reject()
            }
        })
    },
    /**
     * Retrieve current user.
     * @return {Object}
     */
    getCurrentUser() {
        return {
            username: store.getters.token?.decoded.sub
        }
    }
}


export default authService
