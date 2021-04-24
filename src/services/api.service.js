import axios from "axios"
import {env} from "@/config"
import store from "@/store"


const httpClient = axios.create({
    baseURL: env.api.baseURL
})

httpClient.interceptors.request.use(req => {
    const {encoded} = store.getters.token
    if(encoded) {
        req.headers["Authorization"] = `Bearer ${encoded}`
    }
    return req
})


export default httpClient
