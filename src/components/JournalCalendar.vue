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
                    highlight: {
                        contentClass: 'highlight-today'
                    },
                    dates: new Date(),
                },
            ],
        }
    },
}
</script>

<style>
.vc-container {
    border: none;
}

.highlight-today {
    color: #fff;
    font-weight: bold;
    background-color: #28b463;
}

.highlight-today:hover {
    opacity: 0.8;
    color: #fff;
    font-weight: bold;
    background-color: #28b463;
}
</style>
