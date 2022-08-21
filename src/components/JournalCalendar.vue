<template>
    <div id="calendar" class="panel">
        <v-calendar is-expanded :attributes='attrs' />
    </div>
</template>

<script>
export default {
    name: 'JournalCalendar',
    data() {
        return {
            attrs: [
                {
                    key: 'today',
                    highlight: true,
                    dates: new Date(),
                },
            ],
        }
    },
}
</script>

<style>
</style>
