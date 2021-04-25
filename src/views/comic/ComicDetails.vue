<template>
    <div>
        <div class="row">
            <div class="col-md-3 h-25">
                <img class="img-fluid shadow rounded-2" :src="getImage" alt="">
            </div>
            <div class="col-md-9">
                <div class="row">
                    <div class="col-12">
                        <div class="h3">{{ comic.title }}</div>
                        <div class="text-body" v-html="comic.description"></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row mt-4">
            <div class="col">
                <div class="title">Characters</div>
                <ul>
                    <li v-for="it of comic.characters.items" :key="it.name">
                        {{ it.name }}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import {comicService} from "@/services"
export default {
    name: "ComicDetails",
    props: {
        comicId: String,
        comicProp: Object,
    },
    data() {
        return {
            comic: {
                title: "",
                description: "",
                images: [],
                characters: {
                    items: []
                }
            },
        }
    },
    computed: {
        getImage: function () {
            const img = this.comic.images[0]
            if (img) {
                return `${img.path}.${img.extension}`
            }
            return ""
        }
    },
    beforeMount() {
        comicService.get(this.comicId)
        .then(resp => {
            this.comic = resp.data.results[0]
        })
    },
    methods: {
    },

}
</script>

<style scoped>

</style>