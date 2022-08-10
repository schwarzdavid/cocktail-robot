const {defineConfig} = require('@vue/cli-service');

module.exports = defineConfig({
    transpileDependencies: true,

    pluginOptions: {
        vuetify: {
            customVariables: [
                '@/assets/scss/variables.scss'
            ]
        }
    },

    css: {
        loaderOptions: {
            scss: {
                additionalData: '@import "~@/assets/scss/inject.scss";'
            }
        }
    }
});
