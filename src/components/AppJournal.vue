<template>
    <main class="p-3 flex-fill panels">
        <div class="container-fluid h-100">
            <div class="row h-100">
                <div class="helper p-2 col-lg-4">
                    <div class="vstack gap-3 h-100">
                        <JournalCalendar />
                        <JournalGoalList />
                    </div>
                </div>
                <div class="entries p-2 col-lg-8">
                    <Transition :name="this.transitionName" @after-leave="this.pageShown = true">
                        <JournalPage v-show="pageShown" />
                    </Transition>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
import JournalCalendar from './JournalCalendar.vue';
import JournalGoalList from './JournalGoalList.vue';
import JournalPage from './JournalPage.vue';

export default {
    name: 'AppJournal',
    components: {
        JournalCalendar,
        JournalGoalList,
        JournalPage,
    },
    data() {
        return {
            transitionName: "enter-left",
            pageShown: true,
        }
    },
    mounted() {
        this.emitter.on('hide-page', isRight => {
            if (isRight) {
                this.transitionName = "enter-right";
            } else {
                this.transitionName = "enter-left";
            }
            this.pageShown = false;
        });
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

.enter-left-enter-active {
    animation: enter-from-left 0.2s;
}

.enter-left-leave-active {
    animation: leave-to-right 0.2s;
}

.enter-right-enter-active {
    animation: enter-from-right 0.2s;
}

.enter-right-leave-active {
    animation: leave-to-left 0.2s;
}

@keyframes enter-from-left {
    0% {
        transform: translateX(-25px);
        opacity: 0;
    }

    100% {
        transform: translateX(0px);
        opacity: 1;
    }
}

@keyframes enter-from-right {
    0% {
        transform: translateX(25px);
        opacity: 0;
    }

    100% {
        transform: translateX(0px);
        opacity: 1;
    }
}

@keyframes leave-to-right {
    0% {
        transform: translateX(0px);
        opacity: 1;
    }

    100% {
        transform: translateX(25px);
        opacity: 0;
    }
}

@keyframes leave-to-left {
    0% {
        transform: translateX(0px);
        opacity: 1;
    }

    100% {
        transform: translateX(-25px);
        opacity: 0;
    }
}
</style>
