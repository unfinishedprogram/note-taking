<template>
	<span class="question dropdown">
		<p class="questiontext">
			{{question.question}}
		</p>
		<select required="true" v-model="question.answers[0]">
			<option v-for="option in question.options" :value="option" :key="option">{{option}}</option>
		</select>
	</span>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
	props: {
		question:Object,
		id:Number,
	}
})

export default class ConsentForm extends Vue {}
</script>

<style scoped>

select {
	width: fit-content;
	padding: 0.25rem;
	border: none;
}

select > option{
	padding: 0.25rem;
}

select:focus {
	outline: none;
}

</style>