import metadata, { getUUID } from "./metadata";

export async function sendResults(questions:any){
	
	await fetch(`/api/senddata`, {
		method:"POST",
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			"id":getUUID(),
			"metadata":metadata,
			"questions":questions
		})
	})
}
