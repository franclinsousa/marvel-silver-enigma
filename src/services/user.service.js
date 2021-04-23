import api from "./api.service"


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
    }

}


export default userService
