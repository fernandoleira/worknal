<template>
    <div id="goals" class="panel h-100">
        <h3>Goals</h3>
        <div class="list-group">
            <label class="list-group-item" v-for="(goal, inx) in goals" :key="inx">
                <input class="form-check-input flex-shrink-0" type="checkbox" v-model="goal.completed" :id="inx" />
                <span>{{ goal.title }}</span>
            </label>
        </div>
        <button class="btn btn-primary border" @click="newGoal()">New Goal</button>
    </div>
</template>

<script>
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore/lite';

export default {
    name: 'JournalGoals',
    data() {
        return {
            state: 'loading',
            goals: [],
        }
    },
    methods: {
        async getGoals() {
            const goalsCol = collection(db, 'users/fernandoleira/goals');
            const goalsSnaps = await getDocs(goalsCol);
            this.goals = goalsSnaps.docs.map(doc => doc.data());
        },
        newGoal() {
            const new_goal = {
                title: `Goal #${this.goals.length}`,
                active: false
            };
            this.goals.push(new_goal);
        }
    },
    beforeMount() {
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

#goals button {
    margin-top: 15px;
}
</style>