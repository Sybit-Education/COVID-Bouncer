<template>
  <b-col class="card">
    <h2 class="text-center mt-3">{{ name }}</h2>
  </b-col>
</template>

<script>
export default {
  props: ['name']
}
</script>

<style lang="sass" scoped>
.card
  height: 80px
  border: 2px solid black
  border-radius: 8px
  margin-bottom: 2rem
  color: black
</style>
