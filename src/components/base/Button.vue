<template>
  <b-button class="covid-button px-3" :disabled="isDisabled">
    {{ name }}
  </b-button>
</template>
<script>
export default {
  props: {
    name: {
      type: String
    },
    isDisabled: {
      type: Boolean
    }
  }
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
