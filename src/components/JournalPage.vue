<template>
    <div id="page" class="panel">
        <div class="new-entry">
            <div class="new-entry-nav d-flex justify-content-between">
                <span>{{ current_time }}</span>
                <button class="btn" @click="textarea_hidden = !textarea_hidden">
                    {{ textarea_hidden ? '+' : 'x' }}
                </button>
            </div>
            <textarea :hidden="textarea_hidden"></textarea>
        </div>
    </div>
</template>

<script>

export default {
    name: 'JournalPage',
    components: {
        
    },
    data() {
        return {
            current_time: this.getCurrentEntryTime(),
            textarea_hidden: false,
        }
    },
    methods: {
        getCurrentEntryTime() {
            const date = new Date();
            let hrzero = date.getHours() % 12 < 10 ? '0' : '';
            let minzero = date.getMinutes() < 10 ? '0' : '';
            let ampm = date.getHours() > 12 ? 'PM' : 'AM';
            return `${hrzero}${date.getHours() % 12}:${minzero}${date.getMinutes()} ${ampm}`;
        },
    },
    created() {
        setInterval(() => {
            this.current_time = this.getCurrentEntryTime();
        }, 1000)
    },
}
</script>

<style>
#page {
    height: 100%;
}

.new-entry {
    padding: 10px 20px;
    width: 100%;
    border-top: 2px solid #888;
}

.new-entry-nav {
    width: 100%;
}

.new-entry-nav span {
    display: flex;
    align-items: center;
    font-size: 1.8em;
}

.new-entry-nav button {
    padding: 0px 12px;
    font-size: 1.5em;
    color: #222;
    border: 2px solid #222;
    border-radius: 100%;
}

.new-entry textarea {
    margin-top: 10px;
    width: 100%;
}
</style>