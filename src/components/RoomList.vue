<template>
  <div v-if="roomList">
    <div v-for="room in roomList" :key="room.id">
      <roomItem :roomName="room.name" description="Test" :capacity="room.maxPerson" :currentSituation="1"></roomItem>
    </div>
  </div>
</template>

<script>
import RoomService from '../services/Room.service'
import roomItem from './roomItem'

export default {
  components: { roomItem },
  data () {
    return {
      roomList: []
    }
  },
  created () {
    RoomService.getRoomList().then(data => { this.roomList = data })
  }
}
</script>

<style>

</style>
