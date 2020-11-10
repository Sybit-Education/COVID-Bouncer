<template>
  <b-col class="covid-button d-flex justify-content-center align-items-center">
    <p class="my-0 button-text">{{ name }}</p>
  </b-col>
</template>
<script>
export default {
  props: ['name']
}
</script>
<style lang="sass" scoped>
.covid-button
  height: 40px
  border-radius: 8px
  background-color: #b51683
  color: white
  padding: 0

.button-text
  font-weight: bold
</style>
