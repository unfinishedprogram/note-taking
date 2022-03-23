export type QuestionType = 'select_multiple' | 'dropdown' | 'true_false' | 'multiple_choice'

function shuffleArray(array:any[]) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
}

export interface IQuestion {
	type: QuestionType,
	question: string,
	options: string[],
	correct: string[],
	answers: string[]
}

function Question(type:QuestionType, question:string, options:string[], correct:string[]){
	return {
		type,
		question,
		options,
		correct,
		answers: type == "select_multiple" ? [] : [""]
	}
}

function multi(question:string, options:string[]){
	const correct = options[0];
	shuffleArray(options);
	return Question("multiple_choice", question, options, [correct])
}

export default class Quiz {
	answers: string[] = [];

	constructor(public questions : IQuestion[]) {
		console.log(window.navigator)
	}

	getQuestions() {
		return this.questions;
	}

	answer(questionId:number, answer:string) {
		if(this.questions[questionId].answers.includes(answer)){
			this.answers[questionId] = answer;
			return true;
		}
	}

}

export const quizInstance = new Quiz(
	[
	multi("How long have Jackson and Davies been friends?", ["40 Years", "20 Years", "10 Years", "5 Years"]),
	multi("What state do they live in?", ["Washington", "Minnesota", "Michigan", "Indiana"]),
	multi("What are their favourite pastimes?", ["Going for walks and gardening", "Playing chess and swimming", "Playing bingo and jogging", "Going to church and birdwatching"]),
	multi("Which Does Davies not grow?", ["Beets", "Carrots", "Peas", "Melons"]),
	multi("What do they do with their harvest?", ["Make jams and preserves", "Make pies and cakes", "Give it away to friends and family", "Donate it to chairty"]),
	multi("What relation do Liam and Robert have to each other?", ["Cousins", "Brothers", "Friends", "Classmates"]),
	multi("How old is Liam?", ["8 years old", "6 years old", "10 years old", "5 years old"]),
	multi("Who's car did they go in?", ["Aunt Sally", "Uncle Devin", "Liam's mother", "Liam's father"]),
	multi("Where did they go in the car?", ["Riding school", "The playground", "The mall", "Cooking school"]),
	multi("When did their lesson start?", ["3 o'clock", "2 o'clock", "1 o'clock", "Noon"]),
	multi("Who was Lucy Carson visiting?", ["Her brother", "Her nephiew", "Her sister", "Her mother"]),
	multi("Which state did she go visit?", ["Virginia", "Missouri", "Louisiana", "Connecticut"]),
	multi("Where was she going did when she got lost?", ["The art musium", "The gallary", "The bookstore", "The library"]),
	multi("Where did she leave the directions?", ["On her dresseer", "In her car", "In her brothers appartement", "On her couch"]),
	multi("How many blocks did she have to walk north?", ["5 blocks", "15 blocks", "2 Blocks", "1 Block"]),
	multi("What day of the week did the annual sale start on?", ["Tuesday", "Friday", "Monday", "Thursday"]),
	multi("How much were sporting goods marked down?", ["75%", "50%", "25%", "15%"]),
	multi("How many dollars were jackets reduced by?", ["30$", "50$", "60$", "100$"]),
	multi("What were the crowds of shoppers bumping into?", ["Each other", "Racks of cloths", "The employees", "Carts"]),
	multi("What did each employee receive after closing?", ["A bottle of champaign", "A bottle of wine", "A Gift card", "A sincere thank you"])
	]
)



