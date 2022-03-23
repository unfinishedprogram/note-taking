<template>
	<span class="question truefalse">
		<p class="questiontext">
			{{question.question}}
		</p>
		<span>
			<input required type="radio" :id="`true${id}`" :name="`question${id}`" v-model="question.answers[0]" value="true">
			<label :for="`true${id}`">True</label>
		</span>
		<span>
			<input required type="radio" :id="`false${id}`" :name="`question${id}`" v-model="question.answers[0]" value="false">
			<label :for="`false${id}`">False</label>
		</span>
	</span>	
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { IQuestion } from "@/quiz";

@Options({
	props: {
		question: Object as unknown as IQuestion,
		id:Number,
	}
})

export default class TrueFalse extends Vue {}
</script>

<style scoped>
</style>