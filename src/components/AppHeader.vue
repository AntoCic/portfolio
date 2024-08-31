<template>
  <header class="header">
    <div class="container">
      <nav class="row align-items-center p-2 my-3">
        <div class="col amsterdam-four text-gold">
          <RouterLink to="/" @click="store.infoLoad = true" class="h3">
            <img src="/img/logo.png" class="logo align-text-top" alt="Vue logo" />
            Antonino Cicala
          </RouterLink>
        </div>
        <div class="col-auto">
          <a href="/Antonino.Cicala.pdf" class="d-inline-block text-center text-azul lh-1 fs-small"
            rel="download curriculum" download>
            <img src="../assets/img/ico_dw_cv.svg" alt="">
            <br>
            Download CV
          </a>
          <button @click="store.user.logout" v-if="store.user.isLogged" class="btn btn-outline-danger px-1 me-1">
            <span class="material-symbols-rounded">
              logout
            </span>
          </button>
        </div>
      </nav>
    </div>
  </header>
</template>

<script>
import { store } from '../store.js';
export default {
  data() {
    return {
      store,
    }
  },
  methods: {},
}
</script>


<style lang="scss" scoped>
header{
  position: relative;
  z-index: 2;
}
.logo {
  width: 70px;
  will-change: filter;
  transition: filter 300ms;
  vertical-align: baseline;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #9D7B33);
}

.fs-small {
  font-size: 0.5em;
}
@media (min-width: 768px) {
  .fs-small {
    font-size: 0.8em;
  }
}
</style>