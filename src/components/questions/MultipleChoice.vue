<template>
	<span class="question multiplechoice">
		<p class="questiontext">
			{{question.question}}
		</p>
		<span v-for="option in question.options" :key="option">
			<input 
				:name="id"
				type="radio" 
				:value="option"
				:id="id + option"
				@change="toggleBox"
				v-model="question.answers[0]"
				required
			>
			<label :for="id + option">
				{{option}}
			</label>
		</span>
	</span>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { IQuestion } from "@/quiz";

@Options({
	props: {
		question:Object as unknown as IQuestion,
		id:Number
	}
})

export default class MultipleChoice extends Vue {
	// toggleBox(e:InputEvent) {
	// 	console.log(e);
	// 	let question = (this.$props as any).question;
	// 	let target = (e.target as HTMLInputElement);

	// 	if(target.checked) {
	// 		question.answers.push(target.value);
	// 	} else {
	// 		if(question.answers.includes(target.value)) {
	// 			let index = question.answers.indexOf(target.value)
	// 			question.answers.splice(index, 1);
	// 		}
	// 	}
	// }
}
</script>

<style scoped>
</style>