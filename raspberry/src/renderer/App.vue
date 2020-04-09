<template>
	<div>
		<Menu />
		<div>
			<h1>Leiwand</h1>
		</div>
	</div>
</template>

<script lang="ts">
	import Vue from 'vue';
	import Component from 'vue-class-component';
	import Menu from './components/content/Menu.vue';

	@Component({
		components: {
			Menu
		}
	})
	export default class App extends Vue {

	}
</script>

<style lang="scss" src="@css/main.scss"></style>
<style lang="scss">
	html, body {

	}
</style>
