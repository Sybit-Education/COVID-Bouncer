<template>
  <div class="room-detail">
    <b-row class="room-detail-header">
      <b-col class="h-100 d-flex align-items-center" cols="8"><h2 class="mt-0 mb-0">{{ this.room.roomName }}</h2></b-col>
      <b-col class="h-100 d-flex justify-content-center" cols="4">
        <radial-progress-bar :diameter="55" :completed-steps="completedSteps" :total-steps="totalSteps()"
        :strokeWidth="5" :innerStrokeWidth="5" innerStrokeColor="transparent" startColor="#FFF" stopColor="#FFF" class="align-self-center">
        <b-row>
          <p class="mt-0 mb-0">{{ completedSteps }}</p>
          <p class="mt-0 mb-0">/{{ totalSteps() }}</p>
          </b-row>
          </radial-progress-bar>
      </b-col>
    </b-row>
    <b-col class="button-row">
      <covid-button :name="SignInButton"></covid-button>
    </b-col>
  </div>
</template>
<script>
import RadialProgressBar from 'vue-radial-progress'
import covidButton from '@/components/base/Button.vue'

export default {
  name: 'RoomDetail',
  data () {
    return {
      room: [],
      completedSteps: 2,
      roomID: String,
      SignInButton: 'Sign In'
    }
  },
  components: {
    RadialProgressBar,
    covidButton
  },
  created () {
    this.roomID = this.$route.params.roomID
  },
  mounted () {
    const db = this.$firebase.firestore()
    db
      .collection('Rooms')
      .doc(this.roomID)
      .get()
      .then(doc => {
        this.room = doc.data()
      })
  },
  methods: {
    totalSteps: function () {
      return parseInt(this.room.capacity)
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
  border-bottom-left-radius: 8px
  border-bottom-right-radius: 8px
  background-color: #b51683
  color: white
  margin-left: 0
  margin-right: 0

.button-row
  position: absolute
  bottom: 10px

</style>
