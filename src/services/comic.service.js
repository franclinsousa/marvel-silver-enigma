import api from "./api.service"


const prefix = "/api/comics"

const comicService = {

    list(offset, title) {
        return api.get(prefix, {
            params: {
                offset,
                title,
            }
        })
            .then(resp => resp.data)
    },

    get(id) {
        return api.get(`${prefix}/${id}`)
            .then(resp => resp.data)
    },

}


export default comicService
