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
                    <JournalPage />
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
  }
}
</script>

<style>
.panels {
    padding: 0rem 1rem 1rem !important;
}

.panel {
    padding: 15px;
    background-color: white;
    border-radius: 5px;
    box-shadow: 0px 0px 0px 2px rgba(40, 180, 100, 0.5), 0px 0px 0px 2px rgba(40, 180, 100, 0.5);
    color: #222;
}
</style>
