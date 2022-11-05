<template>
    <div class="entry new-entry" :class="{ 'new-entry-active': this.newEntryActive }">
        <div class="entry-nav d-flex justify-content-between">
            <span>{{ currentTime }}</span>
            <button class="btn" @click="textareaHidden = !textareaHidden; newEntryActive = !textareaHidden;">
                <i class="fa fa-plus" aria-hidden="true" v-if="textareaHidden"></i>
                <i class="fa fa-times" aria-hidden="true" v-else></i>
            </button>
        </div>
        <textarea wrap="hard" v-model="newEntryText" :hidden="textareaHidden"
            @focusout="triggerNewEntry()"></textarea>
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
                this.textareaHidden = true;
            }
        }
    },
    data() {
        return {
            textareaHidden: true,
            newEntryActive: false,
            newEntryText: ''
        }
    },
    mounted() {
        this.emitter.on('new-goal-added', () => {
            this.newEntryActive = false
        })
    }
}
</script>

<style>
.new-entry {
    position: relative;
    padding: 10px 20px;
    width: 100%;
    color: rgba(2, 2, 2, 1);
    opacity: 0.6;
}

.new-entry button {
    padding: 0px 12px;
    font-size: 1.25em;
    color: rgba(2, 2, 2, 1);
    border: none;
    opacity: 0.6;
}

.new-entry button:hover {
    padding: 0px 12px;
    font-size: 1.25em;
    color: rgba(2, 2, 2, 1);
    border: none;
    opacity: 0.8;
}

.new-entry-active {
    opacity: 1;
}

.new-entry-active button {
    opacity: 0.8;
}

.new-entry-active button:hover {
    opacity: 1;
}

.new-entry textarea {
    margin-top: 10px;
    width: 100%;
    border: 2px solid rgba(33, 146, 255, 0.5);
    border-radius: 5px;
    overflow: auto;
    resize: none;
}

.new-entry textarea:focus {
    box-shadow: none;
    outline: none;
    border-color: rgba(33, 146, 255, 1);
}
</style>