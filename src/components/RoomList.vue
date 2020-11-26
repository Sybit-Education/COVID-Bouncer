<template>
  <div>
    <div :key="room.key" v-for="room in rooms">
      <router-link class="text-decoration-none" :to="{name:'RoomDetail', params: {location: locationName, building: buildingName, roomID: room.id, roomName: room.roomName }}">
        <card :name="room.roomName" :occupancyProp=room.occupancy :capacityProp="room.capacity">
        </card>
      </router-link>
      </div>
  </div>
</template>

<script>
import Card from '@/components/base/Card'
import { roomService } from '@/services/RoomService'
import { $db } from '@/services/firebase'

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
    $db()
      .collection('Rooms')
      .where('location', '==', this.locationName)
      .where('building', '==', this.buildingName)
      .orderBy('roomName', 'asc')
      .get()
      .then(snap => {
        const rooms = []
        snap.forEach(async (doc) => {
          const docData = doc.data()
          const occupancy = await this.getOccupancy(doc.id)
          rooms.push({ id: doc.id, roomName: docData.roomName, capacity: Number(docData.capacity), occupancy: occupancy })
        })
        this.rooms = rooms
      })
  },
  methods: {
    getOccupancy: async function (id) {
      return await roomService.getOccupancyOfRoomByID(id)
    }
  }
}
</script>
