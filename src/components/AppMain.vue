<template>
    <main>
        <div class="container-fluid">
            <div class="row">
                <div class="helper col-lg-4">
                    <div class="vstack gap-3">
                        <JournalCalendar />
                        <JournalGoals />
                    </div>
                </div>
                <div class="entries col-lg-8">
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
main {
    padding-top: 15px;
    padding-bottom: 15px;
    background-color: orange;
}

.panel {
    position: relative;
    padding: 25px;
    background-color: white;
    border-radius: 15px;
    box-shadow: 2px 2px 8px #555;
}

.goals {
    height: 100%;
}
</style>
