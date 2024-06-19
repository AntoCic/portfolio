<template>
  <header class="header text-center py-5 ">
    <a href="https://github.com/AntoCic" target="_blank">
      <img src="../assets/img/logo.png" class="logo" alt="Vue logo" />
    </a>
    <nav class="text-white text-center">
      <RouterLink to="/" class="btn" :class="$route.fullPath === '/' ? 'btn-light' : 'btn-outline-light'">Home</RouterLink>
      <RouterLink to="/about" class="btn" :class="$route.fullPath === '/about' ? 'btn-light' : 'btn-outline-light'">About</RouterLink>
    </nav>
  </header>
</template>

<script>
</script>


<style lang="scss" scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #9D7B33);
}
</style>