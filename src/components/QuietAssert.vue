<template>
<div>
		<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-headphones" width="128" height="128" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
			<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
			<rect x="4" y="13" rx="2" width="5" height="7"></rect>
			<rect x="15" y="13" rx="2" width="5" height="7"></rect>
			<path d="M4 15v-3a8 8 0 0 1 16 0v3"></path>
	</svg>
	<p>
		To ensure the results of this study are accurate, 
		please confirm that you take this test in a quiet 
		environement, with headphones on.
	</p>
	<button class="confirm" @click="callback">confirm</button>
</div>
</template>

<script lang="ts">

import { Vue, Options } from "vue-class-component";

@Options({
  props: {
    callback: Function,
  },
})

export default class QuietAssert extends Vue {

}

</script>

<style scoped>
p {
	font-size: 1.2rem;
	font-weight: 200;
	text-align: center;
}

div {
	display: flex;
	flex-direction: column;
	align-items: center;
	width:fit-content;
}

button {
	width: fit-content;
}
</style>