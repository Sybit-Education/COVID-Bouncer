<template>
  <div v-if="roomList">
    <div v-for="room in roomList" :key="room.id">
      <room-list-item
        :roomName="room.name"
        description="Test" :capacity="room.maxPerson"
        :currentSituation="1" />
    </div>
  </div>
</template>

<script>
import { roomService } from '../services/Room.service'
import RoomListItem from './RoomListItem'

export default {
  components: { RoomListItem },
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
