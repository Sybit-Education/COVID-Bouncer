<template>
  <div>
    <div v-for="room in roomList" :key="room.id">
      <div>{{ rooe.title }}</div>
    </div>
  </div>
</template>

<script>
import RoomService from '../services/Room.service'

export default {
  computed: {
    roomList () {
      return RoomService.getRoomList()
    }
  }
}
</script>

<style>

</style>
