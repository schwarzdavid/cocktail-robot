"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = require("vue");
const vue_class_component_1 = require("vue-class-component");
const anime_es_1 = require("animejs/lib/anime.es");
const StatusBar_vue_1 = require("./StatusBar.vue");
let Menu = class Menu extends vue_1.default {
    constructor() {
        super(...arguments);
        this.ANIMATION_DURATION = 500;
        this._pointerStartY = 0;
    }
    mounted() {
        if (this.$refs.overlay instanceof HTMLElement) {
            this._overlayAnimation = anime_es_1.default({
                target: this.$refs.overlay
            });
            if (this.$refs.statusbar instanceof HTMLElement) {
                this.$refs.statusbar.addEventListener('pointerdown', this._onPointerDown.bind(this));
                this.$refs.statusbar.addEventListener('pointermove', this._onPointerMove.bind(this));
                this.$refs.statusbar.addEventListener('ponterup', this._onPointerUp.bind(this));
            }
        }
    }
    _onPointerDown(event) {
        event.preventDefault();
        if (event.isPrimary) {
            this._pointerStartY = event.clientY;
        }
    }
    _onPointerMove(event) {
        event.preventDefault();
        if (event.isPrimary) {
            const progress = Math.min(Math.max(event.clientY - this._pointerStartY, 0), this.ANIMATION_DURATION);
            this._overlayAnimation.seek(progress);
        }
    }
    _onPointerUp(event) {
        event.preventDefault();
    }
};
Menu = __decorate([
    vue_class_component_1.default({
        components: { StatusBar: StatusBar_vue_1.default }
    })
], Menu);
exports.default = Menu;
