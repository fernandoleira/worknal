<template>
    <div class="entry" :class="{firstEntry: !id}">
        <div class="entry-nav d-flex justify-content-between">
            <span>{{ tm }}</span>
            <button class="btn" @click="this.$emit('entry-delete-clicked')">
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
.entry {
    padding: 10px 20px;
    width: 100%;
    border-top: 2px solid #aaa;
}

.entry-nav {
    width: 100%;
}

.entry-nav span {
    display: flex;
    align-items: center;
    font-size: 1.8em;
}

.entry-nav button {
    padding: 0px 12px;
    font-size: 1em;
    color: #222;
    border: 2px solid #222;
}

.entry p {
    margin-top: 10px;
    width: 100%;
    text-align: left;
}
</style>