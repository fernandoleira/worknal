<template>
    <div class="panel page">
        <h3>{{ currentDate.toLocaleDateString('en-US', {
                month: 'long', weekday: 'long', day: 'numeric', year: 'numeric'
            })
        }}</h3>
        <JournalEntry v-for="(entry, inx) in entries" :key="inx" :tm="entry.data.tm" :entry-text="entry.data.text"
            :id="inx" @entry-delete-clicked="deleteEntry(entry.id, inx)" />
        <JournalNewEntry :current-time="currentTime" @new-entry="newEntry => createEntry(newEntry)" />
    </div>
</template>

<script>
import { db } from '../plugins/firebase';
import { collection, doc, getDocs, setDoc, deleteDoc, updateDoc } from 'firebase/firestore/lite';

import JournalEntry from './JournalEntry.vue';
import JournalNewEntry from './JournalNewEntry.vue';

export default {
    name: 'JournalPage',
    components: {
        JournalEntry,
        JournalNewEntry
    },
    methods: {
        // Returns the current date in an id format to be used in the database.
        getCurrentDateIdFormat() {
            return this.currentDate.toLocaleDateString('en-Gb').replaceAll('/', '');
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
            const entriesCol = collection(db, `/users/fernandoleira/pages/${date.toLocaleDateString('en-Gb').replaceAll('/', '')}/entries`);
            const entriesSnaps = await getDocs(entriesCol);
            this.entries = entriesSnaps.docs.map(doc => {
                return {
                    id: doc.id,
                    data: doc.data()
                }
            });
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
        async createEntry(newEntryData) {
            try {
                await setDoc(doc(db, `users/fernandoleira/pages/${this.getCurrentDateIdFormat()}`), {});
                await setDoc(doc(db, `users/fernandoleira/pages/${this.getCurrentDateIdFormat()}/entries`, 
                    newEntryData.tm.replace(':', '').replace(' ', '-')), newEntryData);
                this.entries.push({id: this.getCurrentDateIdFormat(), data: newEntryData});
            } catch (err) {
                console.log("There has been an error: ", err);
            }
        },
        async updateEntry(entryId, entryData, inx) {
            try {
                await updateDoc(
                    doc(db, `users/fernandoleira/pages/${this.getCurrentDateIdFormat()}/entries`, entryId), 
                    entryData
                );
                this.entries[inx].data = entryData;
            } catch(err) {
                console.log("There has been an error: ", err);
            }
        },
        async deleteEntry(entryId, inx) {
            try {
                await deleteDoc(doc(db, `users/fernandoleira/pages/${this.getCurrentDateIdFormat()}/entries`, entryId));
                this.entries.splice(inx, 1)
            } catch (err) {
                console.log("There has been an error: ", err);
            }
        }
    },
    watch: {
        currentDate(date) {
            this.getEntries(date)
        }
    },
    data() {
        return {
            currentDate: new Date(),
            currentTime: this.getCurrentEntryTime(),
            entries: [],
            hasEntries: false
        }
    },
    created() {
        setInterval(() => {
            this.currentTime = this.getCurrentEntryTime();
        }, 1000);
        this.getEntries();
        if (process.env.VUE_APP_DEBUG) {
            this.getDebugEntries();
        }
        if (this.entries.length > 0) {
            this.hasEntries = true;
        }
    },
    mounted() {
        this.emitter.on('new-date-selected', e => {
            this.currentDate = e.date;
            this.hasEntries = e.hasEntries;
            this.emitter.emit('hide-page', e.date < this.currentDate);
        });
        this.emitter.on('page-hidden', () => {
            if (this.hasEntries) {
                this.getEntries(this.currentDate);
            } else {
                this.entries = [];
            }
            this.emitter.emit('date-changed');
        })
    }
}
</script>

<style>
.page {
    height: 100%;
    overflow: auto;
}
</style>