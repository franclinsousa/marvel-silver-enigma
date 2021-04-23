import axios from "axios"
import {env} from "@/config"


const httpClient = axios.create({
    baseURL: env.api.baseURL
})


export default httpClient
