<template>
  <AppHeader />
  <AppJournal />
</template>

<script>
import AppHeader from './components/AppHeader.vue';
import AppJournal from './components/AppJournal.vue';

export default {
  name: 'App',
  components: {
    AppHeader,
    AppJournal,
  },
}
</script>

<style>
h3 {
  margin-top: 5px;
  color: #222;
  font-weight: bold;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  position: fixed;
  width: 100%;
  height: 100%;
  text-align: center;
  background-color: #fff;
  font-family: 'Open Sans', sans-serif;
  color: #222;
}

@media screen and (max-width: 995px) {
  #app {
    position: relative;
  }
}
</style>
