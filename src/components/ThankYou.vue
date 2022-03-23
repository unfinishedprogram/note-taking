<template>
  <p>
		Thank you for your participation
  </p>
	<button @click="clearStorage">reset</button>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";

// @Options({})
export default class ThankYou extends Vue {
	clearStorage() {
		window.localStorage.clear();
		location.reload();
	}
}

</script>

<style scoped>
p {
	font-size: larger;
	font-weight: 200;
	text-align: center;
}
</style>