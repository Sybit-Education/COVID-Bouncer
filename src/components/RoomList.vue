<template>
  <div>
    <div v-for="room in roomList" :key="room.id">
      <h1>{{ room.maxPerson }}</h1>
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
