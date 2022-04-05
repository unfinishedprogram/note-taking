<template>
	<div v-if="readInstructions">
		<div v-if="showDigits || ended" class="digits">
			{{digits}}
		</div>
		<input v-if="!showDigits || ended" class="input_digits" type="text" v-model="inputDigits" @input="validateInput()" ref="numinput">
		<div v-if="ended" class="digits">
			Result: {{digits.length}}
			<br>
			<button class="confirm" @click="() => this.continue()">
				Continue
			</button>
		</div>
		<div class="heart_container">
				{{lives < 1 ? "🖤" : "❤️"}}
				{{lives < 2 ? "🖤" : "❤️"}}
				{{lives < 3 ? "🖤" : "❤️"}}
		</div>
	</div>
	<div v-else>
		<p>
The next part of the test is designed to measure your working memory. 
<br>
Its intent is to eliminate discrepancies between participants' ability to avoid corrupting with the results.
<br>
The task will involve you repeating a series of numbers, with an increasing number of digits.
<br>
At each step in the procedure, you will be presented with a number for short period of time.
once your viewing time has expired a text box will appear.
<br>
Please type in the number you saw and press enter to submit your answer.
If you get it right a digit will be added to the number, and you will be asked to repeat the previous steps.
<br>
You have three chances to get the right number, if you get it wrong the number of digits will not increase.
<br>
The number of chances you have left is denoted by the three hearts below.
<br>
The procedure ends once you fail to enter the correct number 3 times.
		</p>
		<span id="button_container">
			<i>By pressing <b>continue</b>, you <b>confirm</b> that you have read and understood the above task</i>
			<button class="confirm" @click="() => continueClicked()">
				Continue
			</button>
		</span>

		
	</div>
</template>

<script lang="ts">
import metadata from "@/metadata";
import { Options, Vue } from "vue-class-component";

@Options({
	props:{
		callback:Function
	}
})

export default class DigitSpan extends Vue {
	showDigits = false;
	digits = "";
	inputDigits = "";
	ended = false;

	readInstructions = false;

	startTime = 0;
	lives = 3;

	continueClicked() {
		this.readInstructions = true;
		this.startTime = Date.now();
		this.showNumber();
	}

	validateInput() {
		this.inputDigits = this.inputDigits.replace(/[^\d]/, '');
	}

	continue() {
		metadata.digit_span_time_taken = Date.now() - this.startTime;
		metadata.digit_span_score = this.digits.length;

		(this.$props as any).callback();
	}

	showInput() {
		this.showDigits = false;
		this.inputDigits = "";

		// Must wait for element to be rendered to focus
		setTimeout(() => (this.$refs.numinput as any).focus())
		
		const enterPress = (e: KeyboardEvent) => {
			if(e.key == "Enter") {
				removeEventListener("keydown", enterPress);
				if(this.inputDigits != this.digits) {
					if(--this.lives == 0){
						this.ended = true;
					} else {
						this.showNumber();
					}
				} else {
					this.showNumber();
				}
			}
		}

		addEventListener("keydown", enterPress);
	}

	showNumber() {
		this.digits += Math.floor(Math.random()*10);
		this.showDigits = true;
		setTimeout(this.showInput.bind(this), 2000);
	}
}

</script>

<style scoped>

.input_digits {
	padding: 0.5rem;
	font-size: xx-large;
	letter-spacing: 0.1rem;
	border: none;
	box-shadow: 0px 0px 2px 2px rgba(0, 0, 0, 0.25) inset;
	font-weight:500;
}

.digits {
	user-select: none;
	font-size: 3rem;
	text-align: center;
	padding: 1rem;
	letter-spacing: 0.5rem;
}

.input_digits:focus {
	outline:none !important;
}

.heart_container {
	display: flex;
	justify-content: center;
	font-size: 2rem;
	user-select: none;
}

#button_container {
	display: flex;
	justify-content: space-between;
}
</style>