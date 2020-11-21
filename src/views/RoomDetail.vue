<template>
  <div class="room-detail">
    <b-row class="room-detail-header">
      <b-col cols="8" class="h-100 d-flex align-items-center">
        <h2 class="my0">{{ this.room.roomName }}</h2>
      </b-col>
      <b-col cols="4" class="h-100 d-flex justify-content-center">
        <radial-progress-bar :diameter="55" :completed-steps="completedSteps" :total-steps="totalSteps()"
        :strokeWidth="5" :innerStrokeWidth="5" innerStrokeColor="transparent" startColor="#FFF" stopColor="#FFF" class="align-self-center">
          <b-row>
            <p class="my-0">{{ completedSteps }}</p>
            <p class="my-0">/{{ totalSteps() }}</p>
          </b-row>
        </radial-progress-bar>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="12" class="mx-3 mt-4">
        <h3 class="font-weight-bold mb-3">Heute eingecheckt:</h3>
        <div :key="user.key" v-for="user in checkIns" class="userList">
          <p class="mb-1">
            {{ user.firstName }}
            {{ user.lastName }}
          </p>
        </div>
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
import CovidButton from '@/components/base/Button.vue'
import { $db, FieldValue } from '@/services/firebase'
import { userService } from '@/services/UserService'

export default {
  name: 'RoomDetail',
  data () {
    return {
      checkIns: [],
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
    CovidButton
  },
  created () {
    this.roomID = this.$route.params.roomID
  },
  async mounted () {
    await $db()
      .collection('Rooms')
      .doc(this.roomID)
      .get()
      .then(doc => {
        this.room = doc.data()
      })
    await this.getRoomCheckIns()
  },
  methods: {
    getRoomCheckIns: async function () {
      await $db()
        .collection('Rooms/' + this.roomID + '/CheckIn')
        .where('date', '==', this.currentDate)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach((checkIn) => {
            const user = checkIn.data().user
            user.forEach(user => {
              user.get().then(snap => {
                this.checkIns.push(snap.data())
              })
            })
          })
        })
    },
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
      const db = await $db().collection('Rooms/' + this.roomID + '/CheckIn')
      const userRef = await $db().doc('user/' + currentUserID)
      const doc = await db.doc(currentDate).get().then(doc => doc.data())
      if (doc === undefined) {
        db.doc(currentDate)
          .set({
            date: currentDate,
            user: [userRef]
          })
          .then(
            this.$notify({
              group: 'error',
              type: 'success',
              title: 'LogIn',
              text: 'Erfolgreich eingeloggt'
            })
          )
          .catch(error =>
            this.$notify({
              group: 'error',
              type: 'error',
              title: 'LogIn',
              text: 'Etwas ist schiefgelaufen' + error
            })
          )
      } else {
        if (doc.user.length <= this.room.capacity) {
          db.doc(currentDate).update({
            user: FieldValue.arrayUnion(userRef)
          })
            .then(
              this.$notify({
                group: 'error',
                type: 'success',
                title: 'LogIn',
                text: 'Erfolgreich eingeloggt'
              })
            )
            .catch(error =>
              this.$notify({
                group: 'error',
                type: 'error',
                title: 'LogIn',
                text: 'Es gab ein Problem bei der Anmeldung' + error
              })
            )
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
