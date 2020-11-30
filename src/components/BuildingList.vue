<template>
  <div>
    <div :key="building.key" v-for="building in buildings">
      <router-link style="text-decoration: none" :to="{name:'Rooms', params: {location: locationName, building: building}}">
      <card :name=building></card>
      </router-link>
      </div>
  </div>
</template>

<script>
import Card from '@/components/base/Card'
import { $db } from '@/services/firebase'

export default {
  props: ['locationName'],
  components: {
    Card
  },
  data () {
    return {
      buildings: []
    }
  },
  mounted () {
    $db()
      .collection('Rooms')
      .where('location', '==', this.locationName)
      .orderBy('building', 'asc')
      .get()
      .then(snap => {
        const rooms = []
        snap.forEach(doc => {
          rooms.push({ [doc.id]: doc.data() })
        })
        this.buildings = this.filterLocations(rooms)
      })
  },
  methods: {
    filterLocations: function (Rooms) {
      const buildings = []
      const sortedbuildings = []
      Rooms.forEach(room => buildings.push(Object.entries(room)[0][1].building))
      buildings.map(function (singleBuilding) {
        if (!sortedbuildings.includes(singleBuilding)) {
          sortedbuildings.push(singleBuilding)
        }
      })
      return sortedbuildings
    }
  }
}
</script>
