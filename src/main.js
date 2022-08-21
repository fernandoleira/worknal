import {createApp} from 'vue'
import VCalendar from 'v-calendar'
import 'v-calendar/dist/style.css'

import App from './App.vue'


// Create the Vue app
createApp(App)
.use(VCalendar, {
    componentPrefix: 'v',
})
.mount('#app')
