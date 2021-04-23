const path = require("path")


/**
 * @type {import('@vue/cli-service').ProjectOptions}
 */
module.exports = {
    publicPath: "/",
    chainWebpack: config => {
        config.resolve.alias
            .set("vue$", "vue/dist/vue.esm.js")
            .set("@", path.join(__dirname, "src"))
    },
    css: {
        loaderOptions: {
            css: {
                sourceMap: process.env.NODE_ENV !== "production",
            },
            scss: {
            },
            sass: {
            },
        },
    },
}
