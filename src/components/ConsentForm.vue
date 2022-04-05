<template>
  <p>
    This study, conducted by David Hammett, Elvira Kliucharieva, Noah Labrecque
    and Sammy Péladeau (Dawson College), aims to understand the effects that
    note taking method has on the ability to remember details of a short story.
    <br />
    As part of this study, you will be asked to answer questions on details of 4 
    short stories. The total time to complete this study is about 15 to 20 minutes.
    <br />
    Some questions in this study may elicit unpleasant feelings. You do not need 
    to answer questions that you don't want to answer or that make you feel 
    uncomfortable.
    <br />
    The information you provide is for research purposes only. 
    Participation is voluntary. You can choose to end this study at any time. 
    Participation is confidential and anonymous; no identifying information will 
    be collected. If you have questions regarding this study, or wish to obtain 
    information about the results of the study please email:
    <br />
		<ul>
			<li><a href="mailto:david.hammett@dawsoncollege.qc.ca">david.hammett@dawsoncollege.qc.ca</a></li>
			<li><a href="mailto:elvira.kliucharieva@dawsoncollege.qc.ca">elvira.kliucharieva@dawsoncollege.qc.ca</a></li>
			<li><a href="mailto:noah.labrecque@dawsoncollege.qc.ca">noah.labrecque@dawsoncollege.qc.ca</a></li>
			<li><a href="mailto:sara.peladeau@dawsoncollege.qc.ca">sara.peladeau@dawsoncollege.qc.ca</a></li>
		</ul>
    If you have ethical concerns about this study, please email Dr. Hélène Nadeau at
    <a href="mailto:hnadeau@dawsoncollege.qc.a">hnadeau@dawsoncollege.qc.a</a> 
		<br>
  </p>
			<span id="confirm_container">
				<b>
			By pressing <i>continue</i> you CONSENT to participating in this research, and confirm have read this informed consent sheet.
		<br>
			If you do NOT consent to participating in this research, you may close the tab/window at any time and your information will not be recorded.
		</b>
	<button class="continue confirm" @click="callback">continue</button>
		</span>
			
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  props: {
    callback: Function,
  },
})
export default class ConsentForm extends Vue {}
</script>

<style scoped>
br {
  display: block;
  margin: 1rem;
  content: " ";
}

ul {
  padding-left: 0px;
  list-style: none;
  margin-left: 0px;
}


#confirm_container {
	display:flex;
	justify-content: space-between;
	align-items:flex-end;
}

</style>