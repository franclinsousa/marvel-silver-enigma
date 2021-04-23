<template>
    <div id="app">
        <router-view />
    </div>
</template>

<script>
import "bootstrap"
import "@fortawesome/fontawesome-free/js/all"

export default {
    name: "App",
}
</script>

<style lang="sass">
@import "~@fortawesome/fontawesome-free/scss/fontawesome"
@import "~bootstrap/scss/bootstrap"

</style>
