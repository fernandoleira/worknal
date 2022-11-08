<template>
    <div class="panel page">
        <h3>{{ currentDate.toLocaleDateString('en-US', {
                month: 'long', weekday: 'long', day: 'numeric', year: 'numeric'
            })
        }}</h3>
        <JournalEntry v-for="(entry, inx) in entries" :key="inx" :tm="entry.tm" :entry-text="entry.text"
            :id="inx" @entry-delete-clicked="deleteEntry(entry.id, inx)" />
        <JournalNewEntry :current-time="currentTime" @new-entry="newEntry => createEntry(newEntry)" />
    </div>
</template>

<script>
import { db } from '../plugins/pocketbase';

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
            try {
                const pageVals = await db.records.getList('pages', 1, 25, {
                    filter: `date = "${date.toLocaleDateString('en-Gb').replaceAll('/', '')}"`,
                    sort: 'date',
                    expand: 'entries',
                    '$autoCancel': false
                });

                return pageVals.items.map(page => {
                    return page["@expand"].entries
                })[0];
            } catch (err) {
                console.log('There was an error: ', err);
            }
        },
        async getDebugEntries() {
            try {
                const debugPageVals = await db.records.getList('pages', 1, 25, {
                    filter: `date = "debug"`,
                    sort: 'date',
                    expand: 'entries',
                    '$autoCancel': false
                });

                return debugPageVals.items.map(page => {
                    return page["@expand"].entries
                })[0];
            } catch (err) {
                console.log('There was an error: ', err);
            }
        },
        async createEntry(newEntryData) {
            try {
                const newEntry = await db.records.create('entries', newEntryData);
                let entryPage = await db.records.getList('pages', 1, 1, {
                    filter: `date = "${this.getCurrentDateIdFormat()}"`
                });

                if (entryPage.items.length === 0) {
                    entryPage = await db.records.create('pages', {
                        date: this.getCurrentDateIdFormat()
                    });
                } else {
                    entryPage = entryPage.items[0];
                }

                let entryPageEntries = entryPage.entries;
                entryPageEntries.push(newEntry.id);
                db.records.update('pages', entryPage.id, {
                    entries: entryPageEntries
                });

                this.entries.push(newEntry);
            } catch (err) {
                console.log("There has been an error: ", err);
            }
            this.emitter.emit('new-goal-added');
        },
        async updateEntry(entryId, entryData, inx) {
            try {
                await db.records.update('entries', entryId, entryData);
                this.entries[inx].data = entryData;
            } catch (err) {
                console.log("There has been an error: ", err);
            }
        },
        async deleteEntry(entryId, inx) {
            try {
                await db.records.delete('entries', entryId);
                this.entries.splice(inx, 1)
            } catch (err) {
                console.log("There has been an error: ", err);
            }
        }
    },
    data() {
        return {
            currentDate: new Date(),
            currentTime: this.getCurrentEntryTime(),
            entries: [],
            lastTransition: {}
        }
    },
    async created() {
        setInterval(() => {
            this.currentTime = this.getCurrentEntryTime();
        }, 1000);

        this.entries = await this.getEntries();
        if (process.env.VUE_APP_DEBUG) {
            this.entries = this.entries.concat(await this.getDebugEntries());
            this.entries.sort((entryA, entryB) => entryA.tm > entryB.tm)
        }
        this.emitter.on('new-date-selected', async e => {
            this.emitter.emit('hide-page', e.date > this.currentDate);
            this.currentDate = e.date;
            this.entries = [];
            if (e.hasEntries) {
                this.entries = await this.getEntries(this.currentDate);
            }
        });
    }
}
</script>

<style>
.page {
    height: 100%;
    overflow: auto;
}
</style>