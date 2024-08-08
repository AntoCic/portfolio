<template>
  <div class="card bg-transparent my-3">
    <div class="row g-0 bg-light bg-opacity-25 border-0 rounded">
      <div class="col-md-8">
        <div class="card-body text-azul">
          <p class="card-text">Nome cognome: {{ store.user.name }}</p>
          <p class="card-text">Email: <a :href="'mailto:' + store.user.email">{{ store.user.email }}</a></p>
          <p class="card-text">Telefono: <a :href="'tel:' + store.user.phone">{{ store.user.phone }}</a></p>
          <p class="card-text">Linkedin: <a :href="store.user.linkedin_link" target="_blank">/Antonino-Cicala</a></p>
          <p class="card-text">Github: <a :href="store.user.git_link" target="_blank">/AntoCic</a></p>
         </div>
      </div>
      <div class="col-md-4">
        <img src="/img/foto_profilo.png" class="img-fluid rounded object-fit-cover h-100" alt="foto profilo personale">
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
}

</script>

<style lang="scss"></style>