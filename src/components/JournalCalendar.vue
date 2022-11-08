<template>
    <div id="calendar" class="panel">
        <v-date-picker is-expanded v-model="selectedDate" :attributes='attrs' :select-attribute="selectedAttr" />
    </div>
</template>

<script>
import { db } from '../plugins/pocketbase';

export default {
    name: 'JournalCalendar',
    methods: {
        async getPageDates() {
            const pageVals = await db.records.getFullList('pages', 200, {
                '$autoCancel': false
            });

            return pageVals.map(page => {
                if (page.date !== "debug") {
                    return new Date(page.date.substring(2, 4) + '/' + page.date.substring(0, 2) + '/' + page.date.substring(4, 8));
                }
            }).filter(page => page !== undefined);
        },
    },
    watch: {
        selectedDate(date) {
            if (date != null) {
                this.emitter.emit('new-date-selected', {
                    date: date,
                    hasEntries: this.datesWithEntries.has(date.toDateString())
                });
            }
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
    async created() {
        try {
            const pageDates = await this.getPageDates();
            pageDates.forEach(date => {
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
            });
        } catch (err) {
            console.log("There has been an error: ", err);
        }
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
