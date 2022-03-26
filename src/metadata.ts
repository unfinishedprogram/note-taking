export interface IMetadata {
	// All times are in milisecoonds
	accepted_consent?:boolean;
	time_listening?:number;
	time_paused?:number;
	time_taking_quiz?:number;

	user_agent:string;

	digit_span_time_taken?:number;
	digit_span_score?:number;

	meta_created?:number;
	started_quiz?:number;
	submitted_quiz?:number;
	started_audio?:number;
	ended_audio?:number;
	times_paused?:number;
	uuid:string;
	logs: MetaLog[];
}

type logType = "info" | "warning" | "error";

interface MetaLog {
	type: logType;
	message:string;
}

export function createUUID() {
	const S4 = () => (((Math.random()+1)*0x10000)|0).toString(16).substring(1)
	const uuid = `${S4()}${S4()}`
	return uuid;
}

export function getUUID() {
	return localStorage.getItem("uuid")
}

export function hasUUID() {
	return !!getUUID();
}

export function assignUUID() {
	if(hasUUID()) return getUUID()!;
	const uuid = createUUID();
	localStorage.setItem("uuid", uuid);
	return uuid;
}

export function metaLog(message:string, type:logType) {
	metadata.logs.push({type, message})
}

function loadMetaData():IMetadata {
	const localMeta = localStorage.getItem("metadata");
	if(localMeta){
		return JSON.parse(localMeta);
	} else {
		return {
			uuid:assignUUID(),
			user_agent: navigator.userAgent,
			meta_created:Date.now(),
			logs:[],
		}
	}
}

export function saveMeta(){
	localStorage.setItem("metadata", JSON.stringify(metadata));
}

const metadata:IMetadata = loadMetaData();

export default metadata;