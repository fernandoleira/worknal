<template>
    <div id="goals" class="panel h-100">
        <h3>Goals</h3>
        <JournalGoal v-for="(goal, inx) in goals" :key="inx" :inx="inx" :goal="goal"
            @toogle-goal="goal => toggleGoalCompleted(goal.id, goal.completed)"
            @delete-goal="goal => deleteGoal(goal.id, goal.inx)" />
        <JournalNewGoal @new-goal-created="newGoal => createGoal(newGoal)" />
    </div>
</template>

<script>
import { db } from '../plugins/firebase';
import { collection, doc, getDocs, addDoc, deleteDoc, updateDoc } from 'firebase/firestore/lite';

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
            const goalsCol = collection(db, 'users/fernandoleira/goals');
            const goalsSnaps = await getDocs(goalsCol);
            this.goals = goalsSnaps.docs.map(doc => {
                return {
                    id: doc.id,
                    data: doc.data()
                }
            });
        },
        // Create a new Journal Goal and push it to firestore
        async createGoal(newGoal) {
            try {
                const newGoalRef = await addDoc(collection(db, 'users/fernandoleira/goals'), newGoal);
                const newGoalObj = {
                    id: newGoalRef.id,
                    data: newGoal,
                }
                this.goals.push(newGoalObj);
            } catch (err) {
                console.log("There has been an error: ", err);
            }
        },
        // Delete a Journal Goal
        async deleteGoal(goalId, inx) {
            try {
                await deleteDoc(doc(db, 'users/fernandoleira/goals/', goalId));
                this.goals.splice(inx, 1)
            } catch (err) {
                console.log("There has been an error: ", err);
            }
        },
        // Modify the completed state in the database when checkmark is active/inactive in the GUI
        async toggleGoalCompleted(goalId, completedNewState) {
            try {
                await updateDoc(doc(db, 'users/fernandoleira/goals/', goalId), {
                    completed: completedNewState,
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

</style>