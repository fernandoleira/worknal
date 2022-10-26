<template>
    <div id="calendar" class="panel">
        <v-date-picker is-expanded v-model="selectedDate" :attributes='attrs'  
        :select-attribute="selectedAttr" />
    </div>
</template>

<script>
import { db } from '../plugins/firebase';
import { collection, getDocs } from 'firebase/firestore/lite';

export default {
    name: 'JournalCalendar',
    methods: {
        async getPageDates() {
            const pageRef = collection(db, '/users/fernandoleira/pages');
            const pageSnaps = await getDocs(pageRef);
            return pageSnaps.docs.map(doc => {
                if (doc.id !== "debug") {
                    return new Date(doc.id.substring(2, 4) + '/' + doc.id.substring(0, 2) + '/' + doc.id.substring(4, 8));
                }
            }).filter(doc => doc !== undefined);
        },
    },
    watch: {
        selectedDate(date) {
            this.emitter.emit('new-date-selected', {
                date: date, 
                hasEntries: this.datesWithEntries.has(date.toDateString())
            });
        }
    },
    data() {
        let tmp = new Date()

        return {
            todayDate: tmp,
            selectedDate: tmp,
            attrs: [{
                key: 'today',
                highlight: {
                    contentClass: 'highlight-today',
                },
                dates: tmp,
            }],
            selectedAttr: {
                highlight: {
                    contentClass: 'highlight-active',
                },
            },
            datesWithEntries: new Map()
        }
    },
    created() {
        this.getPageDates().then(value => {
            value.forEach(date => {
                // Add date into datesWithEntries object so it can be use
                // later to check if there are entries with this date.
                this.datesWithEntries.set(date.toDateString(), true);

                if (date.toDateString() !== this.todayDate.toDateString()) {
                    // Push a new style attribute for this date
                    this.attrs.push(
                        {
                            dot: {
                                style: {
                                    backgroundColor: '#28b463',
                                }
                            },
                            dates: date,
                        }
                    )
                }
            })
        })
        .catch(err => {
            console.log("There has been an error: ", err);
        });
    }
}
</script>

<style>
.vc-container {
    border: none;
}

.highlight-today {
    color: rgb(40, 180, 100);
    font-weight: bold;
    border: 2px solid rgb(40, 180, 100);
}

.highlight-today:hover {
    opacity: 0.8;
    color: rgb(40, 180, 100);
    font-weight: bold;
    border: 2px solid rgb(40, 180, 100);
}

.highlight-active {
    color: rgb(255, 255, 255);
    font-weight: bold;
    background-color: rgb(40, 180, 100);
}

.highlight-active:focus {
    color: rgb(255, 255, 255);
    font-weight: bold;
    background-color: rgb(40, 180, 100);
}
</style>
