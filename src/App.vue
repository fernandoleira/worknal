<template>
  <AppHeader />
  <AppMain />
  <AppFooter />
</template>

<script>
import { db } from './firebase';

import AppHeader from './components/AppHeader.vue';
import AppMain from './components/AppMain.vue';
import AppFooter from './components/AppFooter.vue';
import { FirebaseError } from '@firebase/util';

// TODO
const documentPath = 'contacts/jeff';

export default {
  name: 'App',
  components: {
    AppHeader,
    AppMain,
    AppFooter,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  position: absolute;
  width: 100%;
  height: 100%;
  text-align: center;
  background-color: #85c1e9 ;
  font-family: 'Open Sans', sans-serif;
  color: #222;
}
</style>
