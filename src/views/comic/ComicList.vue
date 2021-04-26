<template>
    <div @scroll.passive="onScroll">
        <div class="row">
            <div class="col-4">
                <h1>Comics</h1>
            </div>
            <div class="col-3">
                <div class="form-check form-switch">
                    <input class="form-check-input" type="checkbox" id="flexSwitchCheckChecked"
                           @change="showOnlyFavorite"
                           v-model="onlyFavorite"
                    >
                    <label class="form-check-label" for="flexSwitchCheckChecked">Show only favorite</label>
                </div>
            </div>
            <form class="col-5" @keydown.prevent.enter="onSearch">
                <input type="search" class="form-control" placeholder="Search..." v-model="search">
            </form>
        </div>
        <div class="row row-cols-1 row-cols-md-4 g-4">
            <div class="col" v-for="comic of comics" :key="comic.id">
                <div class="card shadow mb-4 mt-4 g-0 border-0 bg-dark text-white">
                    <router-link :to="{name: 'comic-details', params: {comicId: comic.id}}"
                                 v-slot="{navigate}"
                                 custom
                    >
                        <img :src="getImg(comic)" class="card-img h-100" :alt="comic.title" @click="navigate">
                    </router-link>
                    <div class="card-footer">
                        <div class="float-start">
                            {{ comic.title }}
                        </div>
                        <div class="float-end">
                            <a class="btn p-0 m-0" @click="favorite(comic.id)">
                                <i :id="`icon-${comic.id}`"
                                   :favorite="comic.favorite"
                                   :class="{
                                        'fas fa-heart text-danger': comic.favorite,
                                        'far fa-heart text-danger': !comic.favorite,
                                   }"
                                   ></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="d-flex justify-content-center" v-if="isLoading">
            <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
        <div class="d-flex justify-content-center my-5" v-if="isLastPage">
            No more comics...
        </div>
        <div class="d-flex justify-content-center my-5" v-if="searchNotFound">
            No results found...
        </div>
    </div>
</template>

<script>
import {comicService} from "@/services";

export default {
    name: "ComicList",
    data() {
        return {
            comics: [],
            offset: 0,
            search: undefined,
            isLoading: false,
            isLastPage: false,
            onlyFavorite: false,
            searchNotFound: false,
        }
    },
    beforeMount() {
        this.listing()
    },
    mounted() {
        document.addEventListener('scroll', this.onScroll, {passive: true, capture: true})
    },
    beforeDestroy() {
        document.removeEventListener('scroll', this.onScroll, {passive: true, capture: true})
    },
    methods: {
        favorite(comicId){
            const comicIcon = document.getElementById(`icon-${comicId}`)
            const isFavorite = comicIcon.getAttribute("favorite")
            if(isFavorite) {
                comicService.unfavorite(comicId).then(csFav => {
                    comicIcon.classList = "far fa-heart text-danger"
                    comicIcon.removeAttribute("favorite")
                })
            } else {
                comicService.favorite(comicId).then(csFav => {
                    comicIcon.classList = "fas fa-heart text-danger"
                    comicIcon.setAttribute("favorite", "true")
                })
            }
        },
        showOnlyFavorite() {
            if(!this.onlyFavorite){
                this.listing()
                return
            }
            this.isLoading = true
            comicService.favorites()
                .then(resp => {
                    this.comics = []
                    resp.forEach(_ => {
                        _.then(comic => {
                            const _ = comic.data.results[0]
                            _.favorite = true
                            this.comics.push(_)
                        })
                    })
                    this.isLoading = false
                })
        },
        getImg(it) {
            const im = it.thumbnail
            if (im) {
                return `${im.path}.${im.extension}`
            }
            return ""
        },
        listing() {
            this.isLoading = true
            comicService.list(this.offset)
                .then(resp => {
                    this.isLoading = false
                    this.isLastPage = resp.data.offset + resp.data.count === resp.data.total
                    this.comics = resp.data.results
                })
        },
        onSearch() {
            this.isLoading = true
            this.onlyFavorite = false
            this.search = this.search === "" ? undefined : this.search
            comicService.list(this.offset, this.search)
                .then(resp => {
                    this.comics = resp.data.results
                    this.isLastPage = resp.data.offset + resp.data.count === resp.data.total && this.comics.length > 0
                    this.searchNotFound = this.comics.length < 1
                    this.isLoading = false
                })
        },
        onScroll() {
            let bottomOfWindow = document.body.scrollTop + document.body.offsetHeight > document.body.scrollHeight - 256
            if (bottomOfWindow && !this.isLoading && !this.isLastPage && !this.onlyFavorite) {
                this.isLoading = true
                this.offset = this.offset + 20
                comicService.list(this.offset, this.search)
                    .then(resp => {
                        this.isLastPage = resp.data.offset + resp.data.count === resp.data.total
                        for(const it of resp.data.results) {
                            this.comics.push(it)
                        }
                        this.isLoading = false
                    })
            }
        },
    }
}
</script>

<style lang="sass" scoped>
img
    object-fit: cover
</style>