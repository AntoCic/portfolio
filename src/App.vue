<template>
  <AppHeader />
  <AppMain />
  <AppFooter />
</template>

<script>
// import { store } from '../store.js';
// import axios from 'axios'
import AppHeader from './components/AppHeader.vue'
import AppMain from './components/AppMain.vue'
import AppFooter from './components/AppFooter.vue'
export default {
  components: { AppHeader, AppMain, AppFooter },
  data() {
    return {
      // store,
    }
  },
  methods: {
  },
  computed: {
  },
  mounted() {
  }
}

</script>

<style lang="scss">
/*
@use '../assets/scss/partials/_variables.scss' as *;
*/
#app {
  background-color: var(--bs-dark);
  min-height: 100vh;
}
</style>