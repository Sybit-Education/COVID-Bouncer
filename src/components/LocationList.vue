<template>
  <div>
    <div :key="location.key" v-for="location in locations">
      <router-link style="text-decoration: none" :to="{name:'Buildings', params: {location: location}}">
        <card :name=location></card>
      </router-link>
    </div>
  </div>
</template>

<script>
import Card from '@/components/base/Card'
import { $db } from '@/services/firebase'

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
    $db()
      .collection('Rooms')
      .orderBy('location', 'asc')
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
