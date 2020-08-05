<template>
  <div>
    <div class="header">
      <router-link class="routerLink" to="/"><h5>{{room.name}}</h5></router-link>
    </div>
    <div class="main-container">
      <circular-load :value="value" :loadFactor="loadFactor"></circular-load>
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
    roomService.getRoomByQrCode(this.$route.params.qrCode).then(data => {
      data.error ? this.$router.push('/404') : this.room = data
    })
  },
  computed: {
    loadFactor () {
      return 1 + '/' + this.room.maxPerson
    },
    value () {
      return (100 / this.room.maxPerson) * 1
    },
    userList () {
      return this.usersOfRoom()
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

  .routerLink
    text-decoration: none
    color: white
</style>
