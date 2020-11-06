<template>
  <div>
    <div :key="room.key" v-for="room in rooms">
      <router-link style="text-decoration: none" :to="{name:'RoomDetail', params: {roomID: Object.keys(room).toString()}}">
        <card :name="Object.values(room)[0].roomName"></card>
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
  mounted () {
    const db = this.$firebase.firestore()
    db
      .collection('Rooms')
      .where('location', '==', this.locationName)
      .where('building', '==', this.buildingName)
      .get()
      .then(snap => {
        const rooms = []
        snap.forEach(doc => {
          rooms.push({ [doc.id]: doc.data() })
        })
        this.rooms = rooms
      })
  }
}
</script>

<style lang="scss">
</style>
