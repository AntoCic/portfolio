<template>
  <div class="text-azul">
    <h1>{{ store.user.name }}</h1>
    <p class="small">{{ store.user.rule }}</p>
    <p>{{ store.user.description }}</p>
    <hr>
    <h2>SKILLS</h2>
    <div class="mb-2">
      <span v-for="technology in store.user.technologies" class="badge text-bg-primary me-2">{{ technology }}</span>
    </div>

    <hr>

    <h2>Project</h2>
    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3">

      <div class="col py-3" v-for="(pj, key) in store.visiblePj" :key="key">
        <div class="card p-2 text-azul bg-light bg-opacity-10 border-0 rounded h-100">
          <img :src="pj.img" class="card-img-top" alt="logo-progetto">
          <div class="card-body">
            <h5 class="card-title">{{ pj.name }}</h5>
            <p class="card-text small">{{ pj.rule }}</p>
            <div class="mb-2">
              <span v-for="technology in pj.technologies" class="badge text-bg-primary me-2">{{ technology }}</span>
            </div>
            <p class="card-text">{{ pj.description }}</p>
            <p>Data: {{ pj.dateStart }} <template v-if="pj.dateEnd">- {{ pj.dateEnd }}</template> </p>
            <div class="mt-auto">
              <a v-if="pj.site_link" :href="pj.site_link" target="_blank" class="btn btn-link">Stite To Try</a>
              <a v-if="pj.git_link" :href="pj.git_link" target="_blank" class="btn btn-link">Github</a>
            </div>

          </div>
        </div>
      </div>
    </div>


    <!-- <div v-for="(pj, key) in store.visiblePj" :key="key"
      class="card text-azul bg-light bg-opacity-10 border-0 rounded mb-2">
      <div class="card-body">
        <h5 class="card-title">{{ pj.name }}</h5>
        <p class="card-text small">{{ pj.rule }}</p>
        <div class="mb-2">
          <span v-for="technology in pj.technologies" class="badge text-bg-primary me-2">{{ technology }}</span>
        </div>
        <p class="card-text">{{ pj.description }}</p>
        <p>Data: {{ pj.dateStart }} - {{ pj.dateEnd }}</p>
        <p>Location: {{ pj.location }}</p>
        <img :src="pj.img" width="100" height="100" alt="">
        <a v-if="pj.site_link" :href="pj.site_link" target="_blank" class="btn btn-link">Stite To Try</a>
        <a v-if="pj.git_link" :href="pj.git_link" target="_blank" class="btn btn-link">Github</a>
      </div>
    </div> -->

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
</template>
<script>
import { store } from '../store.js';
export default {
  data() {
    return {
      store,
    }
  },
  methods: {

  },
  mounted() {
    console.log('@@@@ Home @@@@');
    console.log(store);
  }
}

</script>

<style lang="scss"></style>