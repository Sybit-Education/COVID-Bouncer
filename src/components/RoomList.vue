<template>
  <div>
    <div :key="room.key" v-for="room in rooms">
      <router-link class="text-decoration-none" :to="{name:'RoomDetail', params: {location: locationName, building: buildingName, roomID: room.id, roomName: room.roomName }}">
        <card :name="room.roomName"></card>
      </router-link>
      </div>
  </div>
</template>

<script>
import Card from '@/components/base/Card'

export default {
  props: ['buildingName', 'locationName'],
  components: {
    Card
  },
  data () {
    return {
      rooms: []
    }
  },
  async mounted () {
    const db = await this.$firebase.firestore()
    db
      .collection('Rooms')
      .where('location', '==', this.locationName)
      .where('building', '==', this.buildingName)
      .get()
      .then(snap => {
        const rooms = []
        snap.forEach(doc => {
          const docData = doc.data()
          rooms.push({ id: doc.id, roomName: docData.roomName })
        })
        this.rooms = rooms
      })
  }
}
</script>
