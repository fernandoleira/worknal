<template>
    <div id="goals" class="panel h-100">
        <h3>Goals</h3>
        <div class="list-group">
            <label class="list-group-item" v-for="(goal, inx) in goals" :key="inx">
                <input class="form-check-input flex-shrink-0" type="checkbox" v-model="goal.completed" :id="inx" />
                <span>{{ goal.title }}</span>
            </label>
        </div>
        <div class="input-group">
            <input type="text" v-model="newGoalTitle" class="form-control" placeholder="New Goal" aria-label="New Goal"
                aria-describedby="new-goal-button" />
            <button class="btn btn-outline-primary" type="button" id="new-goal-button" :disabled="!newGoalTitle"
                @click="createGoal()">Create</button>
        </div>
    </div>
</template>

<script>
import { db } from '../firebase';
import { collection, getDocs, addDoc } from 'firebase/firestore/lite';

export default {
    name: 'JournalGoals',
    data() {
        return {
            state: 'loading',
            goals: [],
            newGoalTitle: '',
        }
    },
    methods: {
        // Read all the goals stored in firestore for the user
        async getGoals() {
            const goalsCol = collection(db, 'users/fernandoleira/goals');
            const goalsSnaps = await getDocs(goalsCol);
            this.goals = goalsSnaps.docs.map(doc => doc.data());
        },
        // Create a new Journal Goal and push it to firestore
        async createGoal() {
            const newGoal = {
                title: this.newGoalTitle,
                completed: false
            };

            try {
                await addDoc(collection(db, 'users/fernandoleira/goals'), newGoal);
                this.goals.push(newGoal);
            } catch (err) {
                console.log("There has been an error: ", err);
            }

            this.newGoalTitle = '';
        }
    },
    created() {
        this.getGoals();
    }
}
</script>

<style>
#goals h3 {
    text-align: left;
}

.list-group {
    margin-top: 20px;
    text-align: left;
}

.list-group label span {
    margin-left: 10px;
}

#goals .input-group {
    margin-top: 15px;
}
</style>