<template>
  <div>
    <div :key="room.key" v-for="room in rooms">
      <router-link style="text-decoration: none" :to="{name:'Rooms', params: {location: location, building: building}}">
      <card :name=room></card>
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
        this.rooms = this.filterLocations(rooms)
      })
  },
  methods: {
    filterLocations: function (Rooms) {
      const rooms = []
      const sortedrooms = []
      Rooms.forEach(room => rooms.push(Object.entries(room)[0][1].roomName))
      rooms.map(function (singleBuilding) {
        if (!sortedrooms.includes(singleBuilding)) {
          sortedrooms.push(singleBuilding)
        }
      })
      return sortedrooms
    }
  }
}
</script>

<style lang="scss">
</style>
