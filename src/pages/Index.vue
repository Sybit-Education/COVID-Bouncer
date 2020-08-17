<template>
  <div class=main-container>
    <div>
      <h3 class="custom-h3">COVID Bouncer</h3>
    </div>
    <headline headline="Für heute gebuchter Raum"/>
    <div>
      <room-list-item :room-name="currentBookedRoom.name" description="Test" :capacity="5" :current-situation="1" :qr-code="currentBookedRoom.qrCode"/>
    </div>
    <headline headline="Raumliste"/>
    <div class="roomList">
      <roomList></roomList>
    </div>
    <div>
      <QrScannerIcon></QrScannerIcon>
    </div>
  </div>
</template>

<script>
import roomList from 'components/roomList'
import RoomListItem from 'components/roomListItem'
import headline from 'components/headline'
import QrScannerIcon from 'components/QrScannerIcon'
import { roomService } from 'src/services/Room.service'
import { userService } from 'src/services/User.service'

export default {
  name: 'PageIndex',
  components: { roomList, RoomListItem, headline, QrScannerIcon },
  data () {
    return {
      currentBookedRoom: []
    }
  },
  created () {
    roomService.getCurrentBookedRoomOfUser(userService.currentUser()).then(data => { this.currentBookedRoom = data })
  }
}
</script>

<style lang="sass" scoped>
.main-container
  padding: 0 8px

.custom-h3
  margin: 0
</style>
