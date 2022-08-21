<template>
    <div id="goals" class="panel h-100">
        <h3>Goals</h3>
        <div class="list-group">
            <label class="list-group-item" v-for="(goal, inx) in goals" :key="inx">
                <input class="form-check-input flex-shrink-0" type="checkbox" v-model="goal.active" :id="inx" />
                <span>{{ goal.title }}</span>
            </label>
        </div>
        <button class="btn btn-primary border" @click="newGoal()">New Goal</button>
    </div>
</template>

<script>
export default {
    name: 'JournalGoals',
    data() {
        return {
            goals: [
                {
                    title: 'Goal #0',
                    active: false,
                },
                {
                    title: 'Goal #1',
                    active: true,
                },
                {
                    title: 'Goal #2',
                    active: false,
                },
            ],
        }
    },
    methods: {
        newGoal() {
            const new_goal = {
                title: `Goal #${this.goals.length}`,
                active: false
            };
            this.goals.push(new_goal);
        }
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