<template>
    <div class="entry new-entry">
        <div class="entry-nav d-flex justify-content-between">
            <span>{{ currentTime }}</span>
            <button class="btn" @click="textareaHidden = !textareaHidden">
                <i class="fa fa-plus" aria-hidden="true" v-if="textareaHidden"></i>
                <i class="fa fa-times" aria-hidden="true" v-else></i>
            </button>
        </div>
        <textarea v-model="newEntryText" :hidden="textareaHidden" @focusout="triggerNewEntry()"></textarea>
    </div>
</template>

<script>
export default {
    name: 'JournalNewEntry',
    props: {
        currentTime: String
    },
    methods: {
        triggerNewEntry() {
            if (this.newEntryText !== '') {
                this.$emit('new-entry', { text: this.newEntryText, tm: this.currentTime })
                this.newEntryText = '';
            }
            this.textareaHidden = true;
        }
    },
    data() {
        return {
            textareaHidden: true,
            newEntryText: ''
        }
    }
}
</script>

<style>
.new-entry {
    padding: 10px 20px;
    width: 100%;
    color: rgba(2, 2, 2, 0.6)
}

.new-entry button {
    padding: 0px 12px;
    font-size: 1.25em;
    color: rgba(2, 2, 2, 0.6);
    border: none;
    opacity: 0.6;
}

.new-entry button:hover {
    padding: 0px 12px;
    font-size: 1.25em;
    color: rgba(2, 2, 2, 0.8);
    border: none;
    opacity: 0.6;
}

.new-entry textarea {
    margin-top: 10px;
    width: 100%;
}
</style>