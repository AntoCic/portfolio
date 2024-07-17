<template>
  <div class="row text-azul">

    <div class="col-12 col-md-4 col-lg-3">
      <!-- <h2>{{ store.user.name }}</h2> -->
      <h3>{{ store.user.rule }}</h3>
      <p>{{ store.user.description }}</p>
      <hr>
      <div class="container">
        <div class="row">
          <div class="col-12">
            <h4>SKILLS</h4>
          </div>
          <div class="col-3 col-sm-4 col-md-12" v-for="technology in store.user.technologies">
            <p class="text-center text-sm-start"><img :src="`/img/skills/${technology.toLowerCase()}.svg`"
                :alt="technology" class="me-1"> {{ technology
              }}</p>
          </div>
        </div>
      </div>




    </div>

    <div class="col-12 col-md-8 col-lg-9">
      <h3 class="text-end">Project</h3>
      <hr class="mt-0">

      <CmpPjCard v-for="(pj, key) in store.visiblePj" :key="key + 'pj'" :pj="pj" :i="key" />

    </div>

    <div class="col-12 text-azul">
      <hr>
      <h2>Experience</h2>
      <div v-for="(experience, key) in store.experiences" :key="key"
        class="card text-azul bg-light bg-opacity-10 border-0 rounded mb-2">
        <div class="card-body">
          <h5 class="card-title">{{ experience.name }}</h5>
          <p class="card-text small">{{ experience.rule }}</p>
          <p class="card-text">{{ experience.description }}</p>
          <p>Data: {{ experience.dateStart }} - {{ experience.dateEnd }}</p>
          <p>Location: {{ experience.location }}</p>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { store } from '../store.js';
import CmpPjCard from '../components/CmpPjCard.vue';
export default {
  components: { CmpPjCard },
  data() {
    return {
      store,
    }
  },
  methods: {

  },
  mounted() {
    // console.log('@@@@ Home @@@@');
    // console.log(store);
  }
}

</script>

<style lang="scss"></style>