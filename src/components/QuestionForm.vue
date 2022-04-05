<template>
  <div class="questionForm">
    <div class="explain" v-if="!descriptionRead">
      <p>
        The following is a multiple choice quiz. 
        Each question has only one correct response.
      </p>
      <button class="confirm submit" @click="descriptionReadCallback">continue</button>
    </div>

    <form ref="form" v-if="descriptionRead">
      <div v-if="questionIndex < quiz.questions.length">
        <b>Question #{{questionIndex+1}}</b>
        <Question :question="quiz.questions[questionIndex]" :id="questionIndex"></Question>
        <button :disabled="!quiz.questions[questionIndex].answers[0]" class="submit confirm" @click="nextQuestion">next question</button>
      </div>
      <button v-else class="submit confirm" @click="doSubmit">submit</button>
    </form>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Question from "./questions/Question.vue"
import Quiz from "@/quiz"
import {sendResults} from "@/networking"
import metadata, { saveMeta } from "@/metadata"

@Options({
  components: { Question },
  props: {
    msg: String,
    quiz: Quiz
  }
})

export default class QuestionForm extends Vue {
  msg!: string;
  questionIndex:number = 0;
  descriptionRead:boolean = false;

  nextQuestion (e:Event) {
    e.preventDefault();
    this.questionIndex++;
  }

  descriptionReadCallback(e:Event) {
    e.preventDefault();
    this.descriptionRead = true;
  }

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

button:disabled {
  background-color: #aaa !important;
  cursor:not-allowed !important;
}

.question > * {
  margin: 0.5rem;
}
button {
  float:right;
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
