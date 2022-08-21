<template>
    <main class="p-3 flex-fill">
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
.panel {
    padding: 15px;
    background-color: white;
    border: 2px solid #222;
    border-radius: 15px;
    box-shadow: 2px 2px 8px #555;
    color: #222;
}
</style>
