<template>
  <h3 class="headline">
    {{ headline }}
  </h3>
</template>

<script>
export default {
  name: 'headline',
  props: {
    headline: {
      type: String,
      required: false,
      default: 'Raumliste'
    }
  }
}
</script>

<style lang="sass" scoped>
.headline
  color: $primary
  font-weight: bold
</style>
