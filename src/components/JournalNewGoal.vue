<template>
    <div class="input-group new-goal-group">
        <input type="text" v-model="newGoalTitle" class="form-control" placeholder="New Goal" aria-label="New Goal"
            aria-describedby="new-goal-button" />
        <button class="btn" :class="newGoalTitle ? 'btn-primary' : 'btn-outline-primary'" type="button"
            :disabled="!newGoalTitle" @click="triggerNewGoalEvent()">Create</button>
    </div>
</template>

<script>
export default {
    name: "JournalNewGoal",
    methods: {
        triggerNewGoalEvent() {
            this.$emit('new-goal-created', { title: this.newGoalTitle, completed: false });
            this.newGoalTitle = '';
        }
    },
    data() {
        return {
            newGoalTitle: ''
        }
    }
}
</script>

<style>
.new-goal-group {
    margin-top: 15px;
}

.new-goal-group input:focus {
    box-shadow: none;
}
</style>