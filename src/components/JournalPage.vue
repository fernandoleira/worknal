<template>
    <div id="page" class="panel">
        <h2>{{ currentDate.toLocaleDateString('en-US', { month: 'long', weekday: 'long', day: 'numeric', year: 'numeric'
        }) }}</h2>
        <JournalEntry v-for="(entry, inx) in entries" :key="inx" :tm="entry.data.tm" :entry-text="entry.data.text"
            :id="inx" @entry-delete-clicked="deleteEntry(entry.id, inx)" />
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
import { collection, doc, getDocs, setDoc, deleteDoc } from 'firebase/firestore/lite';

import JournalEntry from './JournalEntry.vue';

export default {
    name: 'JournalPage',
    components: {
        JournalEntry,
    },
    data() {
        return {
            currentDate: new Date(),
            currentTime: this.getCurrentEntryTime(),
            entries: [],
            textareaHidden: true,
            newEntryText: "",
        }
    },
    methods: {
        getCurrentDateIdFormat() {
            return this.currentDate.toLocaleDateString('en-Gb').replaceAll('/', '')
        },
        getCurrentEntryTime() {
            const date = new Date();
            let hrzero = date.getHours() != 12 && date.getHours() % 12 < 10 ? '0' : '';
            let minzero = date.getMinutes() < 10 ? '0' : '';
            let ampm = date.getHours() > 12 ? 'PM' : 'AM';
            return `${hrzero}${date.getHours() % 12}:${minzero}${date.getMinutes()} ${ampm}`;
        },
        async getEntries(date = NaN) {
            if (!date) date = new Date();
            this.entries.length = 0;
            const entriesCol = collection(db, `/users/fernandoleira/pages/${date.toLocaleDateString('en-Gb').replaceAll('/', '')}/entries`);
            const entriesSnaps = await getDocs(entriesCol);
            this.entries = entriesSnaps.docs.map(doc => {
                return {
                    id: doc.id,
                    data: doc.data()
                }
            });
            if (process.env.VUE_APP_DEBUG) this.getDebugEntries();
        },
        async getDebugEntries() {
            const entriesCol = collection(db, `/users/fernandoleira/pages/debug/entries`);
            const entriesSnaps = await getDocs(entriesCol);
            this.entries = this.entries.concat(entriesSnaps.docs.map(doc => {
                return {
                    id: doc.id,
                    data: doc.data()
                }
            }));
        },
        async createEntry() {
            try {
                const newEntryData = {
                    text: this.newEntryText,
                    tm: this.getCurrentEntryTime(),
                };
                await setDoc(doc(db, `users/fernandoleira/pages/${this.getCurrentDateIdFormat()}`), {});
                await setDoc(doc(db, `users/fernandoleira/pages/${this.getCurrentDateIdFormat()}/entries`, 
                    this.getCurrentEntryTime().replace(':', '').replace(' ', '-')), newEntryData);
                this.entries.push({id: this.getCurrentDateIdFormat(), data: newEntryData});
            } catch (err) {
                console.log("There has been an error: ", err);
            }

            this.newEntryText = '';
            this.textareaHidden = true;
        },
        async deleteEntry(entry_id, inx) {
            try {
                await deleteDoc(doc(db, `users/fernandoleira/pages/${this.getCurrentDateIdFormat()}/entries`, entry_id));
                this.entries.splice(inx, 1)
            } catch (err) {
                console.log("There has been an error: ", err);
            }
        }
    },
    created() {
        setInterval(() => {
            this.currentTime = this.getCurrentEntryTime();
        }, 1000);
        this.getEntries();
    },
}
</script>

<style>
#page {
    height: 100%;
    overflow: auto;
}

.new-entry {
    padding: 10px 20px;
    width: 100%;
    border-top: 2px solid #aaa;
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