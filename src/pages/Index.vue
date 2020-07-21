<template>
  <div class=main-container>
    <div>
      <h3>COVID Bouncer</h3>
    </div>
    <headline></headline>
    <div class="roomList">
      <roomList></roomList>
    </div>
  </div>
</template>

<script>
import roomList from 'components/roomList'
import headline from 'components/headline'

export default {
  name: 'PageIndex',
  components: { roomList, headline }
}
</script>

<style lang="sass" scoped>
.main-container
  padding: 0px 8px
</style>
