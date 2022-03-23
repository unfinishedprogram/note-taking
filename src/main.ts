import { createApp } from 'vue'
import App from './App.vue'
import { createUUID } from './metadata';

if(!localStorage.getItem("uuid")){
	localStorage.setItem("uuid", createUUID());
}

createApp(App).mount('#app')
