<template>
  <div class="home">
    <location-list></location-list>
  </div>
</template>

<script>
import LocationList from '@/components/LocationList'

export default {
  name: 'Home',
  components: {
    LocationList
  }
}
</script>

<style lang="sass" scoped>
.home
  overflow-y: hidden
</style>
