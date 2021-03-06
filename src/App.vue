<template>
  <ThankYou v-if="metadata.submitted_quiz"></ThankYou>
  <ConsentForm v-else-if="!acceptedConsent" :callback="() => consentCallback()"></ConsentForm>
  <QuietAssert v-else-if="!quietConfirmed" :callback="() => quietCallback()"></QuietAssert>
  <NoteMethod v-else-if="!assignedMethod" :callback="() => assignMethodCallback()"></NoteMethod>
  <AudioPlayer v-else-if="!audioEnded" :callback="() => audioEndCallback()"></AudioPlayer>
  <DigitSpan v-else-if="!digitEnded" :callback="() => digitEndCallback()"></DigitSpan>
  <QuestionForm v-else :quiz="quiz"></QuestionForm>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import ConsentForm from './components/ConsentForm.vue';
import AudioPlayer from './components/AudioPlayer.vue';
import QuestionForm from './components/QuestionForm.vue';
import ThankYou from './components/ThankYou.vue';
import DigitSpan from './components/DigitSpan.vue';
import QuietAssert from "./components/QuietAssert.vue";
import NoteMethod from "./components/NoteMethod.vue";

import { quizInstance } from "@/quiz"
import metadata from './metadata';

@Options({
  components: {
    ConsentForm,
    AudioPlayer,
    QuestionForm,
    ThankYou,
    DigitSpan,
    QuietAssert,
    NoteMethod
  }
})

export default class App extends Vue {
  acceptedConsent = false;
  playingAudio = false;
  audioEnded = false;
  digitEnded = false;
  quietConfirmed = false;
  assignedMethod = false;

  metadata = metadata;

  stepIndex = 0;

  quiz = quizInstance;

  assignMethodCallback() {
    this.assignedMethod = true;
  }

  consentCallback() {
    this.acceptedConsent = true;
  }

  digitEndCallback() {
    this.digitEnded = true
  }

  audioEndCallback() {
    this.audioEnded = true;
  }
  quietCallback() {
    this.quietConfirmed = true;
  }
}

</script>

<style>

body {
  background-color: #E1E2E1;
  display: flex;
  margin:0px;
  min-height: 100vh;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}

button.confirm {
  --bg-color: rgb(79, 135, 255);
  background-color: var(--bg-color);
  color: white;
  text-shadow: 0px 0px 2px rgba(0, 0, 0, 0.25);
  padding: 0.75rem;
  letter-spacing: .5px;
  cursor:pointer;
  font-size: 16px;
  border: none;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
  border-radius: 0.2rem;
  transition: border-color 0.5s, box-shadow 0.5s, background-color 0.25s;
}

button.confirm:hover {
  background-color: rgb(99, 148, 255);
  box-shadow: 0px 0px 5px rgba(79, 135, 255, 0.5);
}

input, select {
  font-size: 14px;
}

#app {
  font-family:  Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background-color: #F5F5F6;
  max-width: 900px;
  border-radius: 0.25rem;
  padding: 2rem;
  box-shadow: 0px 10px 15px rgba(0, 0, 0, 0.2);
  font-size: 14px;
}
</style>
