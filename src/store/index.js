import Vue from 'vue'
import Vuex, {StoreOptions} from 'vuex'


Vue.use(Vuex)

export default new Vuex.Store(/** @type {StoreOptions} */ {
    state: {
        /**
         * @type {object}
         */
        token: JSON.parse(sessionStorage.getItem("token")) || null,
        user: JSON.parse(sessionStorage.getItem("user")) || null,
    },
    getters: {
        token: (state, getters, rootState, rootGetters) => state.token,
        user: (state, getters, rootState, rootGetters) => state.user,
    },
    mutations: {
        setToken: (state, payload) => {
            state.token = payload
            if (payload) {
                sessionStorage.setItem("token", JSON.stringify(payload))
            } else {
                sessionStorage.removeItem("token")
            }
        },
        setUser: (state, payload) => {
            state.user = payload
            if (payload) {
                sessionStorage.setItem("user", JSON.stringify(payload))
            } else {
                sessionStorage.removeItem("user")
            }
        },
    },
    actions: {
        signin: (injectee, payload) => {
            const {commit} = injectee
            commit("setToken", payload)
        },
        setCurrentUser: (injectee, payload) => {
            const {commit} = injectee
            commit("setUser", payload)
        },
        signout: (injectee, payload) => {
            const {commit} = injectee
            commit("setToken", null)
            commit("setUser", null)
        },
    },
    modules: {}
})
