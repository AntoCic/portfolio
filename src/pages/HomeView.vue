<template>
  <div class="bg-light bg-opacity-25">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-12 col-md-8">
          <h3 class="mt-3">{{ store.user.rule }}</h3>
          <p class="mb-3">{{ store.user.description }}</p>
        </div>
        <div class="d-none d-md-block col-md-4">
          <img src="/img/profilo_no_bg.png" class="img-fluid object-fit-cover" alt="foto profilo personale">
        </div>
      </div>
    </div>
  </div>
  <div class="container py-4">
    <div class="row">
      <template v-for="(technology, index) in store.user.technologies">
        <div v-if="true" class="text-center col">
          <img :src="`/img/skills/${technology.toLowerCase()}.svg`" :alt="technology" class="skills-img me-1">
          <p>{{ technology }}</p>
        </div>
      </template>

    </div>
  </div>

  <div class="container py-4">
    <div class="row">
      <div class="col-12">
        <h2 class="text-center" @dblclick="toggleModal">PROJECT</h2>
        <input class="login" type="password" v-if="modalPass" v-model="userKey"
          @dblclick="store.user.login(userKey); toggleModal()">
      </div>

      <div class="col-12">
        <hr class="mt-0">
        <h3 class="">Main</h3>
      </div>
      <template v-for="(pj, key) in store.visiblePj" :key="key + 'pjV'">
        <div v-if="pj.priority === 1" :class="['col-6 col-md-4 col-lg-3 p-2', key >= 4 ? 'd-md-none d-lg-block' : '']">
          <CmpPjTemplate :pj="pj" />
        </div>
      </template>

      <template v-if="store.hiddenPj">
        <div class="col-12 mt-3">
          <h3 class="text-end">Hidden</h3>
        </div>
        <div class="col-6 col-md-4 col-lg-3 p-2" v-for="(pj, key) in store.hiddenPj" :key="key + 'pjH'">
          <CmpPjTemplate :pj="pj" />
        </div>
      </template>

      <div class="col-12 mt-2">
        <hr class="mt-0">
      </div>
      <div class="col-12 mt-2">
        <h3 class="text-center mb-0">Libreria di creatività</h3>
      </div>

      <div class="col-12">
        <div id="caroselAutoplay" class="carousel slide" data-bs-ride="carousel" data-bs-interval="2000">
          <div class="carousel-indicators">
            <button v-for="(pj, key) in store.visiblePj" :key="key + 'pjAllBtn'" type="button"
              data-bs-target="#caroselAutoplay" :data-bs-slide-to="key" :aria-current="{ true: key === 0 }"
              :class="{ active: key === 0 }" :aria-label="'Slide ' + (key + 1)"></button>
          </div>

          <div class="carousel-inner">
            <div v-for="(pj, key) in store.visiblePj" :key="key + 'pjAllInner'"
              :class="['carousel-item', key === 0 ? 'active' : '']">
              <CmpPjCard :pj="pj" />
            </div>

          </div>

          <button type="button" class="carousel-control-prev" href="#caroselAutoplay" role="button"
            data-bs-slide="prev">
            <span class="carousel-control-prev-icon opacity-0" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button type="button" class="carousel-control-next" href="#caroselAutoplay" role="button"
            ref="caroselAutoplay" data-bs-slide="next">
            <span class="carousel-control-next-icon opacity-0" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>

      </div>

    </div>
  </div>

  <div class="bg-light bg-opacity-25">
    <div class="container py-4">
      <div class="row">
        <div class="col-12">
          <h2>Project Template</h2>
        </div>
        <div class="col-6 col-md-4 col-lg-3 p-2" v-for="(pj, key) in store.template" :key="key + 'pjT'">
          <CmpPjTemplate :pj="pj" />
        </div>
      </div>

    </div>
  </div>
  <div class="container py-4">
    <div class="row">
      <div class="col-12">
        <h2 class="text-center">EXPERIENCE</h2>
        <hr class="mt-0">
        <CmpExperiance v-for="(experience, key) in store.experiences" :key="key + 'exp'" :exp="experience" />
      </div>
    </div>
  </div>
</template>

<script>
import { store } from '../store.js';
import CmpPjCard from '../components/CmpPjCard.vue';
import CmpExperiance from '../components/CmpExperiance.vue';
import CmpPjTemplate from '../components/CmpPjTemplate.vue';
export default {
  components: { CmpPjCard, CmpExperiance, CmpPjTemplate },
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
    this.$refs.caroselAutoplay.click();
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

.skills-img {
  width: 40px;
}
</style>