<template>
    <div class="goal input-group">
        <div class="input-group-text">
            <input class="form-check-input mt-0" type="checkbox" v-model="this.completed" :id="inx"
                @change="eventToggleGoalCompleted(goal.id)" />
        </div>
        <span class="input-group-text col" v-if="this.completed"><s>{{ goal.data.title }}</s></span>
        <span class="input-group-text col" v-else>{{ goal.data.title }}</span>
        <button class="btn btn-outline-secondary dropdown" type="button" data-bs-toggle="dropdown"
            aria-expanded="false"><i class="fa fa-ellipsis-h"></i></button>
        <ul class="dropdown-menu dropdown-menu-end">
            <li><a class="dropdown-item"><i class="fa fa-pencil" aria-hidden="true"></i>
                    Edit</a></li>
            <li><a class="dropdown-item" @click="eventDeleteGoal(goal.id, inx)"><i class="fa fa-trash"
                        aria-hidden="true"></i> Delete</a></li>
        </ul>
    </div>
</template>

<script>
export default {
    name: "JournalGoal",
    props: {
        inx: Number,
        goal: Object
    },
    methods: {
        eventToggleGoalCompleted(id) {
            this.$emit('toogle-goal', {id: id, completed: this.completed});
        },
        eventDeleteGoal(id, inx) {
            this.$emit('delete-goal', {id: id, inx: inx});
        }
    },
    data() {
        return {
            completed: false
        }
    },
    mounted() {
        this.completed = this.goal.data.completed;
    }
}
</script>

<style>
.goal .input-group-text {
    padding: 10px 8px;
    background-color: #fff;
    border: 0px;
}

.goal .form-check-input:checked {
    background-color: rgb(40, 180, 100);
    border-color: rgb(40, 180, 100);
}

.goal .form-check-input:focus {
    box-shadow: none;
}

.goal .btn-outline-secondary {
    background-color: rgb(255, 255, 255);
    border: 0px;
}

.goal .btn:hover {
    color: rgb(2, 2, 2);
}

.goal .btn:focus {
    border: 0px;
    color: rgb(2, 2, 2);
    box-shadow: none;
}
</style>