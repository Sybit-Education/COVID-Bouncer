<template>
  <div class=main-container>
    <div>
      <h3>COVID Bouncer</h3>
    </div>
    <headline></headline>
    <div>
      <roomItem></roomItem>
    </div>
  </div>
</template>

<script>
import roomItem from 'components/roomItem'
import headline from 'components/headline'
export default {
  name: 'PageIndex',
  components: { roomItem, headline }
}
</script>

<style lang="sass" scoped>
.main-container
  padding: 0px 8px
</style>
