<template>
	<div class="statusbar d-flex">
		<span class="mdi mdi-wifi"></span>
		<span class="mdi mdi-swap-vertical"></span>
		<span class="mdi mdi-check-circle-outline"></span>
	</div>
</template>

<script lang="ts">
	import Vue from 'vue';
	import Component from "vue-class-component";

	@Component
	export default class StatusBar extends Vue {

	}
</script>

<style lang="scss">
	.statusbar {

	}
</style>
