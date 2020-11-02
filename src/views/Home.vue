<template>
  <div class="home">
    <navbar></navbar>
    <location-list></location-list>
  </div>
</template>

<script>
import Navbar from '@/components/base/Navbar'
import LocationList from '@/components/LocationList'

export default {
  name: 'Home',
  components: {
    LocationList,
    Navbar
  }
}
</script>

<style lang="sass" scoped>
.home
  overflow-y: hidden
</style>
