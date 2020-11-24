<template>
  <div>
    <b-row v-if="room.roomID" class="mb-4">
      <b-col cols="12">
      <h3 class="font-weight-bold">Mein Raum heute:</h3>
      </b-col>
      <b-col cols="12">
        <router-link class="text-decoration-none" :to="{name:'RoomDetail', params: {location: room.roomData.location, building: room.roomData.building, roomID: room.roomID, roomName: room.roomData.roomName }}">
        <p class="currentRoom text-center" >{{ room.roomData.roomName }}</p>
        </router-link>
      </b-col>
      </b-row>
    <location-list></location-list>
  </div>
</template>

<script>
import LocationList from '@/components/LocationList'
import { userService } from '@/services/UserService'

export default {
  name: 'Home',
  components: {
    LocationList
  },
  data () {
    return {
      room: [],
      currentDate: new Date().toISOString().slice(0, 10)
    }
  },
  async mounted () {
    await this.getTodaysRoom()
  },
  methods: {
    getTodaysRoom: async function () {
      this.room = await userService.getSignedRoom(this.currentDate)
    }
  }
}
</script>

<style lang="sass" scoped>
.currentRoom
  border: 2px solid black
  border-radius: 4px
  padding: .5rem 1rem
  color: black
</style>
