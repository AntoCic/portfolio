<template>
  <button type="button" class="btn btn-outline-success" @click="count++">{{ btnText }} - count: {{ count }}</button>
</template>

<script>
export default {
  props: ['btnText'],
  data() {
    return {
      count:0,
    }
  },
}

</script>



<style lang="scss" scoped>

</style>
