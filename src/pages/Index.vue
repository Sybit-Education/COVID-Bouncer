<template>
  <div class=main-container>
    <div>
      <h3>COVID Bouncer</h3>
    </div>
    <div>
      <location></location>
    </div>
    <headline></headline>
    <div>
      <roomItem></roomItem>
    </div>
  </div>
</template>

<script>
import location from 'components/Location.vue'
import roomItem from 'components/roomItem'
import headline from 'components/headline'
export default {
  name: 'PageIndex',
  components: { location, roomItem, headline }
}
</script>

<style lang="sass" scoped>
.main-container
  padding: 0px 8px
</style>
