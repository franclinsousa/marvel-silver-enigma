import api from "./api.service"
import store from "@/store"


const endpoint = "/api/users"

const userService = {

    /**
     * Create new user.
     * @param {Object} user
     * @return {Promise<Object>}
     */
    create(user) {
        return api.post(`${endpoint}`, user)
            .catch(err => {
                return Promise.reject(err.response.data)
            })
    },

    /**
     * Get current user.
     * @return {Promise<Object>}
     */
    me() {
        return api.get(`${endpoint}/me`)
            .then(res => res.data)
            .catch(err => {
                return Promise.reject(err.response.data)
            })
    },

    /**
     * Edit user. Not edit password.
     * @param {Object} user
     */
    edit(user) {
        return api.put(`${endpoint}/me`, user)
            .then( resp => {
                store.dispatch("setCurrentUser", resp.data)
                return resp.data
            })
            .catch(err => Promise.reject(err.response.data))
    }
}


export default userService
