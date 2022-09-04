<template>
    <div id="goals" class="panel h-100">
        <h3>Goals</h3>
        <div class="input-group" v-for="(goal, inx) in goals" :key="inx">
            <div class="input-group-text">
                <input class="form-check-input mt-0" type="checkbox" v-model="goal.data.completed" :id="inx" />
            </div>
            <span class="input-group-text col" v-if="goal.data.completed"><s>{{ goal.data.title }}</s></span>
            <span class="input-group-text col" v-else>{{ goal.data.title }}</span>
            <button class="btn btn-outline-secondary dropdown" type="button" data-bs-toggle="dropdown"
                aria-expanded="false"><i class="fa fa-ellipsis-h"></i></button>
            <ul class="dropdown-menu dropdown-menu-end">
                <li><a class="dropdown-item">Edit</a></li>
                <li><a class="dropdown-item" @click="deleteGoal(goal.id, inx)">Delete</a></li>
            </ul>
        </div>
        <div class="input-group new-goal-group">
            <input type="text" v-model="newGoalTitle" class="form-control" placeholder="New Goal" aria-label="New Goal"
                aria-describedby="new-goal-button" />
            <button class="btn btn-outline-primary" type="button" id="new-goal-button" :disabled="!newGoalTitle"
                @click="createGoal()">Create</button>
        </div>
    </div>
</template>

<script>
import { db } from '../firebase';
import { collection, doc, getDocs, addDoc, deleteDoc } from 'firebase/firestore/lite';

export default {
    name: 'JournalGoals',
    data() {
        return {
            goals: [],
            newGoalTitle: '',
        }
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
        async createGoal() {
            const newGoalData = {
                title: this.newGoalTitle,
                completed: false
            };

            try {
                const newGoalRef = await addDoc(collection(db, 'users/fernandoleira/goals'), newGoalData);
                const newGoal = {
                    id: newGoalRef.id,
                    data: newGoalData,
                }
                this.goals.push(newGoal);
            } catch (err) {
                console.log("There has been an error: ", err);
            }

            this.newGoalTitle = '';
        },
        // Delete a Journal Goal
        async deleteGoal(goal_id, inx) {
            try {
                await deleteDoc(doc(db, 'users/fernandoleira/goals/', goal_id));
                this.goals.splice(inx, 1)
            } catch (err) {
                console.log("There has been an error: ", err);
            }
        }  
    },
    created() {
        this.getGoals();
    }
}
</script>

<style>
#goals h3 {
    text-align: center;
}

#goals .input-group-text {
    padding: 10px 8px;
    background-color: #fff;
    border: 0px;
}

#goals .form-check-input:checked {
    background-color: #28b463;
    border-color: #28b463;
}

#goals .form-check-input:focus {
    box-shadow: none;
}

#goals .btn-outline-secondary {
    background-color: #fff;
    border: 0px;
}

#goals .btn:hover {
    color: #222;
}

#goals .btn:focus {
    border: 0px;
    color: #222;
    box-shadow: none;
}

.new-goal-group {
    margin-top: 15px;
}

.new-goal-group input:focus {
    box-shadow: none;
}
</style>