<template>
    <div class="entry" :class="{firstEntry: !id}">
        <div class="entry-nav d-flex justify-content-between">
            <div>
                <span>{{ tm }}</span>
                <p>{{ entryText }}</p>
            </div>
            
            <button class="btn" @click="this.$emit('entry-delete-clicked')">
                <i class="fa fa-trash"></i>
            </button>
        </div>
        
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
    color: #222;
    font-size: 1.25em;
    border: none;
}

.entry-nav button:hover {
    opacity: 0.8;
}

.entry p {
    margin-top: 10px;
    width: 100%;
    text-align: left;
}
</style>