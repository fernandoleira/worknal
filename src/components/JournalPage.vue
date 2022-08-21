<template>
    <div id="page" class="panel">
        <div class="new-entry">
            <span>{{ getCurrentEntryTime() }}</span>
        </div>
        <img alt="Vue logo" src="../assets/img/logo.png">
        <HelloWorld msg="Welcome to Your Vue.js App" />
    </div>
</template>

<script>
import HelloWorld from './HelloWorld.vue';

export default {
    name: 'JournalPage',
    components: {
        HelloWorld,
    },
    data() {
        return {
            todays_date: new Date()
        }
    },
    methods: {
        getCurrentEntryTime() {
            const date = new Date();
            let hrzero = date.getHours() % 12 < 10 ? '0' : '';
            let minzero = date.getMinutes() < 10 ? '0' : '';
            let ampm = date.getHours() > 12 ? 'PM' : 'AM';
            return `${hrzero}${date.getHours() % 12}:${minzero}${date.getMinutes()} ${ampm}`;
        },
    },
}
</script>

<style>
</style>