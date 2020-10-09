<template>
  <div>
    <div class="header">
      <router-link class="routerLink" to="/">
        <h5><q-icon name="arrow_back" /> {{room.name}}</h5>
      </router-link>
      <circular-load-indicator :value="value" :loadFactor="loadFactor"></circular-load-indicator>
    </div>
    <div class="main-container mt-4">
      <div class="submitButton">
        <q-btn color="primary" @click="checkIn">Check in</q-btn>
        <q-btn color="primary" @click="removeMe">Remove me</q-btn>
      </div>
      <h4>Aktuell eingechecked:</h4>
      <ul class="userList">
         <li v-for="user in userList" :key="user.id">
           <div>{{ user.firstName }} {{ user.lastName }} ({{ user.initials }})</div>
        </li>
      </ul>
      <div>
        <q-btn @click="print" icon="print" color="primary" label="Room-Label ..." />
      </div>
    </div>
    <q-footer elevated>
      <div>
        <q-btn flat to="/" icon="home" />
        <q-btn flat @click="checkIn" icon="check" label="Check in" />
        <q-btn flat @click="removeMe" icon="delete" label="Remove me" />
      </div>

    </q-footer>
  </div>
</template>

<script>
import { roomService } from '../services/Room.service'
import CircularLoadIndicator from './components/CircularLoadIndicator'
export default {
  name: 'RoomDetailPage',
  components: { CircularLoadIndicator },
  data () {
    return {
      room: {},
      userList: {}
    }
  },
  created () {
    roomService.getRoomByQrCode(this.$route.params.qrCode).then(data => {
      data.error ? this.$router.push('/404') : this.room = data
    })
    roomService.getUsersOfRoom(this.$route.params.qrCode).then(data => {
      this.userList = data
    })
  },
  computed: {
    loadFactor () {
      return 1 + '/' + this.room.maxPerson
    },
    value () {
      return (100 / this.room.maxPerson) * 1
    }
  },
  methods: {
    checkIn () {
      roomService.checkIn(this.room.qrCode)
      this.$router.push({ name: 'home' })
    },
    removeMe () {
      roomService.removeMe(this.room.qrCode)
    },
    print () {
      this.$router.push('/room/' + this.room.qrCode + '/print')
    },
    usersOfRoom () {
      return roomService.getUsersOfRoom(this.room.qrCode)
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

  .routerLink
    text-decoration: none
    color: white

  .main-container
    margin-top: 1rem

  .submitButton
    display: flex
    justify-content: space-evenly
</style>
