<template>
  <AppHeader />
  <AppMain />
  <AppFooter />
</template>

<script>
import AppHeader from './components/AppHeader.vue';
import AppMain from './components/AppMain.vue';
import AppFooter from './components/AppFooter.vue';

export default {
  name: 'App',
  components: {
    AppHeader,
    AppMain,
    AppFooter,
  },
}
</script>

<style>
h3 {
  margin-top: 5px;
  font-family: 'Fredoka One', cursive;
  color: #222;
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
