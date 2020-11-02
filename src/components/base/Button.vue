<template>
  <div class="covid-button w-100 d-flex justify-content-center align-items-center">
    <p class="mb-0 mt-0 button-text">{{ name }}</p>
  </div>
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
  margin-left: 15px
  margin-right: 15px

.button-text
  font-weight: bold
</style>
