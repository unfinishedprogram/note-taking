<template>
  <div class="questionForm">
    <form ref="form">
      <Question v-for="(question, id) in quiz.questions" :key='id' :id='id' :question='question'></Question>
      <button class="submit confirm" @click="doSubmit">submit</button>
    </form>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

import Question from "./questions/Question.vue"
import Quiz from "@/quiz"
import {sendResults} from "@/networking"
import metadata, {getUUID, saveMeta} from "@/metadata"

@Options({
  components: { Question },
  props: {
    msg: String,
    quiz: Quiz
  }
})

export default class QuestionForm extends Vue {
  msg!: string;

  async doSubmit(e:any) {
    e.preventDefault()

    let form = (this.$refs.form as HTMLFormElement);
    
    if(!form.checkValidity()) {
      form.reportValidity();
      return false;
    }
    const questions = (this.$props as any).quiz.getQuestions();
    metadata.submitted_quiz = Date.now();
    metadata.time_taking_quiz = metadata.submitted_quiz - metadata.started_quiz!;
    saveMeta();
    await sendResults(questions);
    location.reload();
  }
  mounted() {
    metadata.started_quiz = Date.now();
  }
}

</script>

<style>
.question {
	display: flex;
  flex-direction: column;
}

.question > * {
  margin: 0.5rem;
}

.question > span {
  margin-left: 1rem;
}

.question > .questiontext {
  border-bottom: 1px solid currentColor;
  padding: 0.25rem;
}

.questionForm > form {
  display: grid;
  row-gap: 1rem;
}

hr {
  border: none;
  display: block;
  border-top: 1px solid currentColor;
  width: 100%;
}

</style>

function sendResults(questions: any) {
  throw new Error('Function not implemented.');
}

function sendResults(questions: any) {
  throw new Error('Function not implemented.');
}

function sendResults(questions: any) {
  throw new Error('Function not implemented.');
}
