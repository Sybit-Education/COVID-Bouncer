<template>
  <div class="headline">
    {{ headline }}
  </div>
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
  margin: 16px 0px
  font-weight: bold
  font-size: 24px
</style>
