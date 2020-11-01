<template>
  <div class="room-detail">
    <div class="room-detail-header row">
      <div class="col-8 h-100 d-flex align-items-center"><h2 class="mt-0 mb-0">{{ this.room.roomName }}</h2></div>
      <div class="col-4 h-100 d-flex justify-content-center">
        <radial-progress-bar :diameter="55" :completed-steps="completedSteps" :total-steps="totalSteps()"
        :strokeWidth="5" :innerStrokeWidth="5" innerStrokeColor="transparent" startColor="#FFF" stopColor="#FFF" class="align-self-center">
        <div class="row">
          <p class="mt-0 mb-0">{{ completedSteps }}</p>
          <p class="mt-0 mb-0">/{{ totalSteps() }}</p>
          </div>
          </radial-progress-bar>
      </div>
    </div>
    <h4>TestName</h4>
  </div>
</template>
<script>
import RadialProgressBar from 'vue-radial-progress'

export default {
  name: 'RoomDetail',
  data () {
    return {
      room: [],
      completedSteps: 2,
      roomID: String
    }
  },
  components: {
    RadialProgressBar
  },
  created () {
    this.roomID = this.$route.params.roomID
  },
  mounted () {
    const db = this.$firebase.firestore()
    db
      .collection('Rooms')
      .doc(this.roomID[0].toString())
      .get()
      .then(doc => {
        this.room = doc.data()
      })
  },
  methods: {
    totalSteps: function () {
      return this.room.capacity
    }
  }
}
</script>

<style lang="sass" scoped>
.room-detail
  overflow-y: hidden
  margin-left: -15px
  margin-right: -15px

.room-detail-header
  height: 75px
  width: 100%
  border-bottom-left-radius: 8px
  border-bottom-right-radius: 8px
  background-color: #b51683
  color: white
  margin-left: 0
  margin-right: 0

</style>
