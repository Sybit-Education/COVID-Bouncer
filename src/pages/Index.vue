<template>
  <div class=main-container>
    <h3 class="custom-h3">COVID Bouncer</h3>

    <headline headline="Für heute gebuchter Raum"/>
    <current-booked-room />

    <headline headline="Raumliste"/>
    <roomList />

    <q-footer>
      <p>Benutzer: <current-user-item /></p>
    </q-footer>
    <qr-scanner-icon/>
  </div>
</template>

<script>
import roomList from 'components/RoomList'
import CurrentBookedRoom from 'components/CurrentBookedRoom'
import headline from 'components/headline'
import QrScannerIcon from 'components/QrScannerIcon'
import CurrentUserItem from 'components/CurrentUserItem'

export default {
  name: 'PageIndex',
  components: { roomList, CurrentBookedRoom, headline, QrScannerIcon, CurrentUserItem }
}
</script>

<style lang="sass" scoped>
.main-container
  padding: 0 8px

.custom-h3
  margin: 0
</style>
