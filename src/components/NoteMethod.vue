<template>
<div>
	<p v-if="noteMethod == 'unassigned'">
		fetching method...
	</p>

	<div v-else>
		Your note taking method is: 
		<b>{{noteMethod}}</b>
		
		<img v-if="noteMethod == 'typed'" src="../assets/typing.svg" alt="">
		<img v-if="noteMethod == 'written'" src="../assets/written.svg" alt="">
		<img v-if="noteMethod == 'none'" src="../assets/none.svg" alt="">

		<button class="confirm" @click="callback">confirm</button>
	</div>
</div>
</template>

<script lang="ts">

import metadata from "@/metadata";
import { getNoteMethod } from "@/networking";
import { Vue, Options } from "vue-class-component";

@Options({
  props: {
    callback: Function,
  },
})

export default class NoteMethod extends Vue {
	noteMethod?: "written" | "none" | "typed" | "unassigned" = "unassigned";

	mounted() {
		console.log("mounted ")
		setTimeout(() => [
			getNoteMethod().then((res: any) => {
			this.noteMethod = res;
			metadata.note_method = res;
			console.log(res)
		})
		], 500)
	}
}

</script>

<style scoped>
p {
	font-size: 1.2rem;
	font-weight: 200;
	text-align: center;
}

div {
	display: flex;
	flex-direction: column;
	align-items: center;
	width:fit-content;
}

button {
	width: fit-content;
}

b {
	font-size: 1.2rem;
	margin:0.5rem;
}
</style>