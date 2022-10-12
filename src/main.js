import { createApp } from 'vue';
import mitt from 'mitt';
import VCalendar from 'v-calendar';
import 'v-calendar/dist/style.css';

import App from './App.vue';

// Create the Vue app
const app = createApp(App);

// Create the app global event emitter
const emitter = mitt();

// Mount app with configs
app.config.globalProperties.emitter = emitter;
app.use(VCalendar, {
    componentPrefix: 'v',
}).mount('#app');
