<template>
    <div id="page" class="panel">
        <h2>{{ page_date }}</h2>
        <JournalEntry v-for="(entry, inx) in entries" :key="inx" :tm="entry.tm" :entry-text="entry.text" :id="inx" />
        <div class="entry new-entry" :class="{ firstEntry: !this.entries.length }">
            <div class="entry-nav d-flex justify-content-between">
                <span>{{ current_time }}</span>
                <button class="btn" @click="textarea_hidden = !textarea_hidden">
                    <i class="fa fa-plus" v-if="textarea_hidden"></i>
                    <i class="fa fa-times" v-else></i>
                </button>
            </div>
            <textarea :hidden="textarea_hidden"></textarea>
        </div>
    </div>
</template>

<script>
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore/lite';

import JournalEntry from './JournalEntry.vue';

export default {
    name: 'JournalPage',
    components: {
        JournalEntry,
    },
    data() {
        return {
            page_date: new Date().toDateString(),
            current_time: this.getCurrentEntryTime(),
            entries: [],
            textarea_hidden: true,
        }
    },
    methods: {
        async getEntries() {
            const entriesCol = collection(db, '/users/fernandoleira/pages/23082022/entries');
            const entriesSnaps = await getDocs(entriesCol);
            this.entries = entriesSnaps.docs.map(doc => doc.data());
        },
        getCurrentEntryTime() {
            const date = new Date();
            let hrzero = date.getHours() != 12 && date.getHours() % 12 < 10 ? '0' : '';
            let minzero = date.getMinutes() < 10 ? '0' : '';
            let ampm = date.getHours() > 12 ? 'PM' : 'AM';
            return `${hrzero}${date.getHours() % 12}:${minzero}${date.getMinutes()} ${ampm}`;
        },
    },
    created() {
        setInterval(() => {
            this.current_time = this.getCurrentEntryTime();
        }, 1000)
        this.getEntries()
    },
}
</script>

<style>
#page {
    height: 100%;
}

.entry {
    padding: 10px 20px;
    width: 100%;
    border-top: 2px solid #888;
}

.entry-nav {
    width: 100%;
}

.entry-nav span {
    display: flex;
    align-items: center;
    font-size: 1.8em;
}

.entry-nav button {
    padding: 0px 12px;
    font-size: 1em;
    color: #222;
    border: 2px solid #222;
}

.entry p {
    margin-top: 10px;
    width: 100%;
    text-align: left;
}

.new-entry {
    padding: 10px 20px;
    width: 100%;
    border-top: 2px solid #888;
}

.new-entry button {
    padding: 0px 12px;
    font-size: 1.5em;
    color: #222;
    border: none;
}

.new-entry textarea {
    margin-top: 10px;
    width: 100%;
}

.firstEntry {
    border: 0px;
}
</style>