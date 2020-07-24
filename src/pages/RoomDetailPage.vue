<template>
  <div>
    <div class="header">
      <h5>{{room.name}}</h5>
      <circular-load :value="value" :loadFactor="loadFactor"></circular-load>
    </div>
    <div class="main-container">
      <div class="userList">
          <p>Hier kommt die Nutzerliste hin</p>
      </div>
      <div class="submitButton">
        <q-btn color="primary">Buchen</q-btn>
        <q-btn color="primary">Löschen</q-btn>
      </div>
    </div>
  </div>
</template>

<script>
import { roomService } from '../services/Room.service'
import CircularLoad from '../components/CircularLoad'
export default {
  name: 'RoomDetailPage',
  components: { CircularLoad },
  data () {
    return {
      room: {}
    }
  },
  created () {
    roomService.getRoomByQrCodeScanner(this.$route.params.qrCode).then(data => {
      data.error ? this.$router.push('/404') : this.room = data
    })
  },
  computed: {
    loadFactor () {
      return 1 + '/' + this.room.maxPerson
    },
    value () {
      return (100 / this.room.maxPerson) * 1
    }
  }
}
</script>

<style lang="sass" scoped>
  .header
    flex-direction: row
    display: flex
    background-color: $primary
    align-items: center
    justify-content: space-between
    border-bottom-right-radius: 16px
    border-bottom-left-radius: 16px
    box-shadow: 0px 2px 4px #999
    padding: 0px 16px
    color: white

  .main-container
    padding: 0px 8px
    margin-top: 32px

  .submitButton
    justify-content: space-around
    display: flex
    flex-direction: row
    margin-top: 64px

    button
      min-width: 40%
</style>
