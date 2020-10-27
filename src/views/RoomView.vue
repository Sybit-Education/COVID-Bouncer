<template>
  <div class="rooms">
    <room-list :buildingName=building :locationName=location></room-list>
  </div>
</template>
<script>
// @ is an alias to /src
import RoomList from '@/components/RoomList'

export default {
  name: 'RoomView',
  data () {
    return {
      building: null,
      location: null
    }
  },
  components: {
    RoomList
  },
  created () {
    this.location = this.$route.params.location
    this.building = this.$route.params.building
  }
}
</script>

<style lang="sass" scoped>
.rooms
  overflow-y: hidden
</style>
