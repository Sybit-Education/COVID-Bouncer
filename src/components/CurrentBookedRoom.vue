<template>
  <div>
      <room-list-item v-if="currentBookedRoom"
        :room-name="currentBookedRoom.name"
        :description="currentBookedRoom.description"
        :capacity="5" :current-situation="1"
        :qr-code="currentBookedRoom.qrCode"/>
      <span v-if="!currentBookedRoom">Aktuell kein Raum gebucht</span>
    </div>
</template>

<script>
import RoomListItem from 'components/RoomListItem'
import { roomService } from 'src/services/Room.service'
import { userService } from 'src/services/User.service'

export default {
  name: 'CurrentBookedRoom',
  components: { RoomListItem },
  data () {
    return {
      currentBookedRoom: null
    }
  },
  created () {
    roomService.getCurrentBookedRoomOfUser(userService.currentUser())
      .then(data => {
        this.currentBookedRoom = data
      })
  }

}
</script>

<style>

</style>
