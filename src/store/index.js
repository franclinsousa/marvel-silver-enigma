import Vue from 'vue'
import Vuex, {StoreOptions} from 'vuex'


Vue.use(Vuex)

export default new Vuex.Store(/** @type {StoreOptions} */ {
    state: {
        /**
         * @type {object}
         */
        token: JSON.parse(sessionStorage.getItem("token")) || null,
    },
    getters: {
        token: (state, getters, rootState, rootGetters) => state.token
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
    },
    actions: {
        signin: (injectee, payload) => {
            const {commit} = injectee
            commit("setToken", payload)
        },
        signout: (injectee, payload) => {
            const {commit} = injectee
            commit("setToken", null)
        },
    },
    modules: {}
})
