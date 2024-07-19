<template>
  <AppHeader />
  <AppMain />
  <AppFooter />
</template>

<script>
import { store } from './store.js';
import AppHeader from './components/AppHeader.vue'
import AppMain from './components/AppMain.vue'
import AppFooter from './components/AppFooter.vue'
export default {
  components: { AppHeader, AppMain, AppFooter },
  data() {
    return {
      store,
    }
  },
  mounted() {
    this.store.start();
  }
}

</script>

<style lang="scss">
/*
@use '../assets/scss/partials/_variables.scss' as *;
*/
</style>