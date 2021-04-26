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
            .then(async data => {
                /** @type {Array} */
                const favs = await api.get(`${prefix}/favorites`)
                data.data.results.forEach(it => {
                    it.favorite = favs.data.find(f => f.elementId === it.id)
                })
                return data
            })
    },

    get(id) {
        return api.get(`${prefix}/${id}`)
            .then(resp => resp.data)
    },

    favorites() {
        return api.get(`${prefix}/favorites`)
            .then(resp => resp.data)
            .then(async resp => {
                const favs = await api.get(`${prefix}/favorites`)
                return favs.data.map(fav => this.get(fav.elementId))
            })
    },

    favorite(comicId) {
        return api.patch(`${prefix}/${comicId}/favorite`)
            .then(resp => resp.data)
    },

    unfavorite(comicId) {
        return api.patch(`${prefix}/${comicId}/unfavorite`)
            .then(resp => resp.data)
    },

}


export default comicService
