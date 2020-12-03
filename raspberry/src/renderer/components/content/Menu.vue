<template>
	<div class="menu">
		<div class="menu__statusbar d-flex justify-content-between" ref="statusbar">
			<span>14:41</span>
			<StatusBar/>
		</div>
		<div class="menu__overlay" ref="overlay">
			<div class="menu__content">
				<div class="d-flex justify-content-between align-items-end">
					<h1>14:47</h1>
					<StatusBar/>
				</div>
				<div class="m-4 bg-white">
					<h1>Hallo ihr bitches</h1>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
	import Vue from "vue";
	import Component from "vue-class-component";
	import anime from "animejs";
	import StatusBar from "./StatusBar.vue";

	@Component({
		components: {StatusBar}
	})
	export default class Menu extends Vue {
		private readonly ANIMATION_DURATION = 2500;

		private _overlayAnimation: anime.AnimeInstance | undefined;
		private _pointerStartY: number = 0;
		private _isMenuExpanded: boolean = false;

		private _onPointerDownEvent: (e: PointerEvent) => void = () => {
		};
		private _onPointerMoveEvent: (e: PointerEvent) => void = () => {
		};
		private _onPointerEndEvent: (e: PointerEvent) => void = () => {
		};

		public created() {
			this._onPointerDownEvent = this._onPointerDown.bind(this);
			this._onPointerMoveEvent = this._onPointerMove.bind(this);
			this._onPointerEndEvent = this._onPointerEnd.bind(this);
		}

		public mounted() {
			if (this.$refs.overlay instanceof HTMLElement) {
				this._overlayAnimation = anime({
					targets: this.$refs.overlay,
					opacity: 1,
					duration: this.ANIMATION_DURATION,
					autoplay: false,
					begin: () => {
						(this.$refs.overlay as HTMLElement).style.display = 'block';
					},
					complete: () => {
						this._isMenuExpanded = this._overlayAnimation?.reversed ?? false;
						this._overlayAnimation?.reverse();
					}
				});

				if (this.$refs.statusbar instanceof HTMLElement) {
					this.$refs.statusbar.addEventListener('pointerdown', this._onPointerDownEvent);
				}
				if (this.$refs.overlay instanceof HTMLElement) {
					this.$refs.overlay.addEventListener('pointerdown', this._onPointerDownEvent);
				}
			}
		}

		private _onPointerDown(event: PointerEvent) {
			event.preventDefault();
			if (event.isPrimary) {
				this._pointerStartY = event.clientY;
				document.addEventListener('pointermove', this._onPointerMoveEvent);
				document.addEventListener('pointerup', this._onPointerEndEvent);
			}
		}

		private _onPointerMove(event: PointerEvent) {
			event.preventDefault();
			if (event.isPrimary) {
				let progress = Math.min(Math.abs((event.clientY - this._pointerStartY) * 1.4), this.ANIMATION_DURATION);
				if (this._isMenuExpanded) {
					progress = this.ANIMATION_DURATION - progress;
				}
				this._overlayAnimation?.seek(progress);
			}
		}

		private _onPointerEnd(event: PointerEvent) {
			event.preventDefault();

			if (!event.isPrimary) {
				return;
			}

			document.removeEventListener('pointermove', this._onPointerMoveEvent);
			document.removeEventListener('pointerup', this._onPointerEndEvent);

			const progress = Math.min(Math.max((event.clientY - this._pointerStartY) * 1.4, 0), this.ANIMATION_DURATION);
			this._isMenuExpanded = (progress >= this.ANIMATION_DURATION / 2) !== this._isMenuExpanded;
			if (this._isMenuExpanded) {
				console.log("Reversing, bitches");
				this._overlayAnimation?.reverse();
			}
			this._overlayAnimation?.play();
		}
	}
</script>

<style lang="scss">
	.menu {
		&__overlay {
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background: fade-out(#000, .4);
			display: none;
			opacity: 0;
		}

		&__content {
			display: none;
		}
	}
</style>
