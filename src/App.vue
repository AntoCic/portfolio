<template>
  <AppHeader />
  <AppMain />
  <AppFooter />
</template>

<script>
import { store } from './store.js';
import axios from 'axios'
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
  methods: {
    fetchNotion() {
      axios.get('/api/notion').then((res) => {
        this.store.user = res.data.user;
        this.store.experiences = res.data.experiences;
        this.store.visiblePj = res.data.visiblePj;
        console.log('fetchNotion');
      }
      );
    },
  },
  mounted() {
    console.log('@@@@ App @@@@');
    this.fetchNotion();
  }
}

</script>

<style lang="scss">
/*
@use '../assets/scss/partials/_variables.scss' as *;
*/
</style>