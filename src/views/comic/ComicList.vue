<template>
    <div @scroll.passive="onScroll">
        <div class="row">
            <div class="col">
                <h1>Comics</h1>
            </div>
            <form class="col-5 col-lg-auto mb-3 mb-lg-0 me-lg-3" @keydown.prevent.enter="onSearch">
                <input type="search" class="form-control" placeholder="Search..." v-model="search">
            </form>
        </div>
        <div class="row" v-for="comic of comics" :key="comic.id">
            <div class="card mb-4 mt-4 g-0 shadow-lg border-0">
                <div class="row g-0">
                    <div class="col-md-4">
                        <img :src="getImg(comic)" class="card-img-top h-100" alt="...">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <router-link :to="{name: 'comic-details', params: {comicId: comic.id}}"
                                         v-slot="{navigate}"
                                         custom
                            >
                                <h5 class="card-title" @click="navigate">{{ comic.title }}</h5>
                            </router-link>
                            <p class="card-text" v-html="comic.description"></p>
                        </div>
                    </div>
                </div>
                <div class="card-footer">
                    <div class="float-end">
                        <a class="btn p-0 m-0">
                            <i class="far fa-heart"></i>
                        </a>
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
        }
    },
    beforeMount() {
        this.isLoading = true
        comicService.list(this.offset)
            .then(resp => {
                this.isLoading = false
                this.isLastPage = resp.data.offset + resp.data.count === resp.data.total
                this.comics = resp.data.results
            })
    },
    mounted() {
        document.addEventListener('scroll', this.onScroll, {passive: true, capture: true})
    },
    beforeDestroy() {
        document.removeEventListener('scroll', this.onScroll)
    },
    methods: {
        getImg(it) {
            const im = it.thumbnail
            if (im) {
                return `${im.path}.${im.extension}`
            }
            return ""
        },
        onSearch() {
            this.isLoading = true
            this.search = this.search === "" ? undefined : this.search
            comicService.list(this.offset, this.search)
                .then(resp => {
                    this.isLastPage = resp.data.offset + resp.data.count === resp.data.total
                    this.comics = resp.data.results
                    this.isLoading = false
                })
        },
        onScroll() {
            let bottomOfWindow = document.body.scrollTop + document.body.offsetHeight > document.body.scrollHeight - 256
            if (bottomOfWindow && !this.isLoading && !this.isLastPage) {
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