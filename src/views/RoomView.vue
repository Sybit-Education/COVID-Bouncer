<template>
  <div>
    <room-list :buildingName=building :locationName=location></room-list>
  </div>
</template>
<script>
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
