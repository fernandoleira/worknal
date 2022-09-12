<template>
    <div id="calendar" class="panel">
        <v-calendar is-expanded :attributes='attrs' />
    </div>
</template>

<script>
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore/lite';

export default {
    name: 'JournalCalendar',
    data() {
        return {
            todayDate: new Date(),
            attrs: [

            ],
        }
    },
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
    mounted() {
        this.attrs.push({
            key: 'today',
            highlight: {
                contentClass: 'highlight-today'
            },
            dates: this.todayDate,
        });
        this.getPageDates().then(value => {
            value.forEach(date => {
                if (date.toDateString()  !== this.todayDate.toDateString() )
                    this.attrs.push(
                        {
                            dot: {
                                style: {
                                    backgroundColor: "#28b463",
                                }
                            },
                            dates: date,
                        }
                    )
            })
        })
            .catch(err => {
                console.log(err);
            });
    },
}
</script>

<style>
.vc-container {
    border: none;
}

.highlight-today {
    color: #fff;
    font-weight: bold;
    background-color: #28b463;
}

.highlight-today:hover {
    opacity: 0.8;
    color: #fff;
    font-weight: bold;
    background-color: #28b463;
}
</style>
