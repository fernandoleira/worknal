<template>
    <main class="p-3 flex-fill panels">
        <div class="container-fluid h-100">
            <div class="row h-100">
                <div class="helper p-2 col-lg-4">
                    <div class="vstack gap-3 h-100">
                        <JournalCalendar />
                        <JournalGoals />
                    </div>
                </div>
                <div class="entries p-2 col-lg-8">
                    <Transition name="page">
                        <JournalPage v-if="showPage" />
                    </Transition>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
import JournalCalendar from './JournalCalendar.vue';
import JournalGoals from './JournalGoals.vue';
import JournalPage from './JournalPage.vue';

export default {
    name: 'AppMain',
    components: {
        JournalCalendar,
        JournalGoals,
        JournalPage,
    },
    data() {
        return {
            showPage: true
        }
    }
}
</script>

<style>
.panels {
    padding: 0rem 1rem 1rem !important;
}

.panel {
    padding: 15px;
    background-color: rgb(255, 255, 255);
    border-radius: 5px;
    box-shadow: 0px 0px 0px 2px rgba(40, 180, 100, 0.5), 0px 0px 0px 2px rgba(40, 180, 100, 0.5);
    color: rgb(2, 2, 2);
}

.page-enter-active {}
.page-leave-active {}

.page-enter-from {}
.page-leave-to {}
</style>
