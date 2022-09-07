<template>
    <div id="page" class="panel">
        <h2>{{ pageDate }}</h2>
        <JournalEntry v-for="(entry, inx) in entries" :key="inx" :tm="entry.tm" :entry-text="entry.text" :id="inx" />
        <div class="entry new-entry" :class="{ firstEntry: !this.entries.length }">
            <div class="entry-nav d-flex justify-content-between">
                <span>{{ currentTime }}</span>
                <button class="btn" @click="textareaHidden = !textareaHidden">
                    <i class="fa fa-plus" v-if="textareaHidden"></i>
                    <i class="fa fa-times" v-else></i>
                </button>
            </div>
            <textarea v-model="newEntryText" :hidden="textareaHidden" @focusout="createEntry()"></textarea>
        </div>
    </div>
</template>

<script>
import { db } from '../firebase';
import { collection, doc, getDocs, setDoc } from 'firebase/firestore/lite';

import JournalEntry from './JournalEntry.vue';

export default {
    name: 'JournalPage',
    components: {
        JournalEntry,
    },
    data() {
        return {
            pageDate: new Date().toDateString(),
            currentTime: this.getCurrentEntryTime(),
            entries: [],
            textareaHidden: true,
            newEntryText: "",
        }
    },
    methods: {
        async getEntries(date=NaN) {
            if (!date) date = new Date();
            const entriesCol = collection(db, `/users/fernandoleira/pages/${date.toLocaleDateString('en-Gb').replaceAll('/', '')}/entries`);
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
        async createEntry() {
            try {
                const newEntry = {
                    text: this.newEntryText,
                    tm: this.getCurrentEntryTime(),
                };
                await setDoc(doc(db, 'users/fernandoleira/pages/23082022/entries', this.getCurrentEntryTime().replace(':', '').replace(' ', '-')), newEntry);
                this.entries.push(newEntry);
            } catch (err) {
                console.log("There has been an error: ", err);
            }

            this.newEntryText = '';
            this.textareaHidden = true;
        },
    },
    created() {
        setInterval(() => {
            this.currentTime = this.getCurrentEntryTime();
        }, 1000)
        this.getEntries(new Date(2022, 7, 23))
    },
}
</script>

<style>
#page {
    height: 100%;
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