<template>
  <div v-if="showDigits || ended" class="digits">
		{{digits}}
	</div>
	<input v-if="!showDigits || ended" class="input_digits" type="text" v-model="inputDigits" @input="validateInput()" ref="numinput">
	<div v-if="ended" class="digits">
		Game Over
	</div>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";

export default class DigitSpan extends Vue {
	showDigits = false;
	digits = "";
	inputDigits = "";
	ended = false;

	validateInput() {
		this.inputDigits = this.inputDigits.replace(/[^\d]/, '');
	}

	showInput() {
		this.showDigits = false;
		this.inputDigits = "";
		setTimeout(() => (this.$refs.numinput as any).focus())
		
		// (this.$refs.numinput as any).focus();
		const enterPress = (e: KeyboardEvent) => {
			if(e.key == "Enter") {
				removeEventListener("keydown", enterPress);
				if(this.inputDigits != this.digits) {
					this.ended = true;
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

	mounted() {
		this.showNumber();
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
</style>