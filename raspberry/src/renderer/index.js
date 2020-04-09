"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = require("vue");
const App_vue_1 = require("./App.vue");
new vue_1.default({
    el: '#app-shell',
    render: h => h(App_vue_1.default)
});
