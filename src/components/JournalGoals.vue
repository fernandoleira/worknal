<template>
    <div id="goals" class="panel border">
        <h3>Goals of the Day</h3>
        <div class="list-group">
            <label class="list-group-item">
                <input class="form-check-input flex-shrink-0" type="checkbox" value="" checked="" />
                <span>Goal #1</span>
            </label>
            <label class="list-group-item">
                <input class="form-check-input flex-shrink-0" type="checkbox" value="" />
                <span>Goal #2</span>
            </label>
            <label class="list-group-item">
                <input class="form-check-input flex-shrink-0" type="checkbox" value="" />
                <span>Goal #3</span>
            </label>
        </div>
        <button class="btn border">New Goal</button>
    </div>
</template>

<script>
export default {
    name: 'JournalGoals',
}
</script>

<style>
.list-group {
    text-align: left;
}
</style>