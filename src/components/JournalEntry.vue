<template>
    <div class="entry" :class="{firstEntry: !id}">
        <div class="entry-nav d-flex justify-content-between">
            <span>{{ tm }}</span>
            <button class="btn">
                Delete
            </button>
        </div>
        <p>{{ entryText }}</p>
    </div>
</template>

<script>
export default {
    name: 'JournalEntry',
    props: {
        id: Number,
        tm: String,
        entryText: String
    },
}
</script>

<style>
</style>