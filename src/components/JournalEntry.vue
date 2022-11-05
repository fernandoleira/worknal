<template>
    <div class="entry" :class="{firstEntry: !id}">
        <div class="entry-nav d-flex justify-content-between align-items-centers">
            <div class="d-flex flex-column">
                <span>{{ tm }}</span>
                <p>{{ entryText }}</p>
            </div>
            <div class="d-flex">
                <button class="btn align-self-center" @click="this.$emit('entry-delete-clicked')">
                    <i class="fa fa-trash"></i>
                </button>
            </div> 
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
}

.entry {
    width: 100%;
}

.entry span {
    display: flex;
    align-items: center;
    font-size: 1.8em;
}

.entry p {
    margin-top: 10px;
    width: 100%;
    text-align: left;
}

.entry button {
    padding: 0px 12px;
    color: rgba(2, 2, 2, 0.8);
    font-size: 1.25em;
    border: none;
}

.entry button:hover {
    color: rgba(2, 2, 2, 1);
}
</style>