<template>
  <div class="home">
    <location-list></location-list>
  </div>
</template>

<script>
// @ is an alias to /src
import LocationList from '@/components/LocationList'

export default {
  name: 'Home',
  components: {
    LocationList
  }
}
</script>
