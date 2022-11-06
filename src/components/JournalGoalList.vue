<template>
    <div id="goals" class="panel h-100">
        <h3>Goals</h3>
        <JournalGoal v-for="(goal, inx) in goals" :key="inx" :inx="inx" :goal="goal"
            @toggle-goal="goal => toggleGoalCompleted(goal.id, goal.completed)"
            @delete-goal="goal => deleteGoal(goal.id, inx)" />
        <JournalNewGoal @new-goal-created="newGoalData => createGoal(newGoalData)" />
    </div>
</template>

<script>
//import { db } from '../plugins/firebase';
import { db } from '../plugins/pocketbase';

import JournalGoal from './JournalGoal.vue';
import JournalNewGoal from './JournalNewGoal.vue';

export default {
    name: 'JournalGoalList',
    components: {
        JournalNewGoal,
        JournalGoal
    },
    methods: {
        // Read all the goals stored in firestore for the user
        async getGoals() {
            try{
                this.goals = await db.records.getFullList('goals', 200, {
                    sort: 'created'
                });
            } catch (err) {
                console.log("There has been an error: ", err);
            }
        },
        // Create a new Journal Goal and push it to firestore
        async createGoal(newGoalData) {
            try {
                const newGoal = await db.records.create('goals', newGoalData);
                this.goals.push(newGoal);
            } catch (err) {
                console.log("There has been an error: ", err);
            }
        },
        // Delete a Journal Goal
        async deleteGoal(id, inx) {
            try {
                await db.records.delete('goals', id);
                this.goals.splice(inx, 1)
            } catch (err) {
                console.log("There has been an error: ", err);
            }
        },
        // Modify the completed state in the database when checkmark is active/inactive in the GUI
        async toggleGoalCompleted(id, newState) {
            try {
                await db.records.update('goals', id, {
                    completed: newState,
                });
            } catch (err) {
                console.log("There has been an error: ", err);
            }
        },
    },
    data() {
        return {
            goals: []
        }
    },
    created() {
        this.getGoals();
    }
}
</script>

<style>
#goals {
    position: relative;
}
</style>