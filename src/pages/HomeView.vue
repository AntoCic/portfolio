<template>
  <div class="row text-azul">

    <div class="col-12 col-md-4 col-lg-3">
      <h3>{{ store.user.rule }}</h3>
      <p>{{ store.user.description }}</p>
      <hr>
      <div class="container">
        <div class="row">
          <div class="col-12">
            <h4>SKILLS <span @dblclick="toggleModal" class="btn-us">(0)</span></h4>
            <input class="login" type="password" v-if="modalPass" v-model="userKey"
              @dblclick="store.user.login(userKey); toggleModal()">
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

      <template v-if="store.hiddenPj">
        <h3 class="text-end">Project hidden</h3>
        <hr class="mt-0">
        <CmpPjCard v-for="(pj, key) in store.hiddenPj" :key="key + 'pjH'" :pj="pj" :i="key" />
        <hr>
      </template>

      <h3 class="text-end">Project</h3>
      <hr class="mt-0">
      <CmpPjCard v-for="(pj, key) in store.visiblePj" :key="key + 'pjV'" :pj="pj" :i="key" />

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
      modalPass: false,
      userKey: ''
    }
  },
  methods: {
    toggleModal() {
      this.userKey = '';
      if (store.user.isLogged) {
        this.modalPass = false;
      } else {
        this.modalPass = !this.modalPass;
      }
    }
  },
  mounted() {
  }
}

</script>

<style lang="scss">
@use '../assets/scss/partials/_variables.scss' as *;

.btn-us {
  opacity: 0;
  user-select: none;
}

.login {
  margin-bottom: 8px;
  padding: 0 4px;
  background: $bg-color;
  border: 1px solid $gold;
  border-radius: 3px;
}
</style>