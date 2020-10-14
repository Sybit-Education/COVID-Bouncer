<template>
  <div>
    <div :key="location.key" v-for="location in locations">
      <card :locationName=location></card>
      </div>
  </div>
</template>

<script>
import Card from '@/components/base/Card'

export default {
  name: 'Home',
  components: {
    Card
  },
  data () {
    return {
      locations: []
    }
  },
  mounted () {
    const db = this.$firebase.firestore()
    db
      .collection('Rooms')
      .get()
      .then(snap => {
        const rooms = []
        snap.forEach(doc => {
          rooms.push({ [doc.id]: doc.data() })
        })
        this.locations = this.filterLocations(rooms)
      })
  },
  methods: {
    filterLocations: function (Rooms) {
      const location = []
      const sortedLocation = []
      Rooms.forEach(room => location.push(Object.entries(room)[0][1].location))
      location.map(function (singleLocation) {
        if (!sortedLocation.includes(singleLocation)) {
          sortedLocation.push(singleLocation)
        }
      })
      return sortedLocation
    }
  }
}
</script>

<style lang="scss">
</style>
