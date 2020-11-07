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
    <b-row class="button-row w-100">
    <b-col cols="6" @click="checkIn(currentDate)">
      <covid-button :name="SignInButton"></covid-button>
    </b-col>
    <b-col cols="6" @click="checkIn(dateTomorrow())">
      <covid-button :name="SignInTomorrowButton"></covid-button>
    </b-col>
    </b-row>
  </div>
</template>
<script>
import RadialProgressBar from 'vue-radial-progress'
import covidButton from '@/components/base/Button.vue'
import { fieldValue } from '@/services/firebase'
import { userService } from '@/services/UserService'

export default {
  name: 'RoomDetail',
  data () {
    return {
      room: [],
      completedSteps: 2,
      roomID: String,
      SignInButton: 'Sign In Today',
      SignInTomorrowButton: 'Sign In Tomorrow',
      currentDate: new Date().toISOString().slice(0, 10)
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
    },
    dateTomorrow: function () {
      const currentDate = new Date()
      currentDate.setDate(currentDate.getDate() + 1)
      return currentDate.toISOString().slice(0, 10)
    },
    checkIn: async function (currentDate) {
      const currentUserID = await userService.currentUser()
        .then(user => user.id)
      const db = await this.$firebase.firestore().collection('Rooms/' + this.roomID + '/CheckIn')
      const userRef = await this.$firebase.firestore().doc('user/' + currentUserID)
      const doc = await db.doc(currentDate).get().then(doc => doc.data())
      if (doc === undefined) {
        db.doc(currentDate)
          .set({
            date: currentDate,
            user: [userRef]
          })
      } else {
        if (doc.user.length <= this.room.capacity) {
          db.doc(currentDate).update({
            user: fieldValue.arrayUnion(userRef)
          })
        }
      }
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
  margin-left: 0
  margin-right: 0

</style>
