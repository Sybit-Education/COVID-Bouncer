<template>
  <div class="card">
    <h2 class="text-center">{{ name }}</h2>
  </div>
</template>

<script>
export default {
  props: ['name']
}
</script>

<style lang="sass" scoped>
.card
  width: 100%
  height: 80px
  border: 2px solid black
  border-radius: 8px
  margin-bottom: 2rem
  color: black
</style>
