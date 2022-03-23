<template>
	<div class="question">
		<DropdownSelect v-if="question.type == 'dropdown'" :id="id" :question="question"></DropdownSelect>
		<TrueFalse v-else-if="question.type == 'true_false'" :id="id" :question="question"></TrueFalse>
		<SelectMultiple v-else-if="question.type == 'select_multiple'" :id="id" :question="question"></SelectMultiple>
		<MultipleChoice v-else-if="question.type == 'multiple_choice'" :id="id" :question="question"></MultipleChoice>
		<div v-else class="error">Question Syntax error, question type: {{question.type}}</div>
	</div>
</template>

<script lang=ts>
import { Options, Vue } from "vue-class-component";
import DropdownSelect from "./DropdownSelect.vue"
import TrueFalse from "./TrueFalse.vue"
import SelectMultiple from "./SelectMultiple.vue"
import MultipleChoice from "./MultipleChoice.vue"
@Options({
	components: {
    DropdownSelect,
    TrueFalse,
    SelectMultiple,
		MultipleChoice
  },

	props: {
		question:Object,
		id:Number,
	}
})

export default class Question extends Vue {}

</script>

<style>

</style>