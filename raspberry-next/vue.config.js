const {defineConfig} = require('@vue/cli-service');

module.exports = defineConfig({
    transpileDependencies: true,

    pluginOptions: {
        vuetify: {
            customVariables: [
                '@/assets/scss/variables.scss'
            ]
        },
    },
});
