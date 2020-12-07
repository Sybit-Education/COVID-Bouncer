<template>
  <div class="room-detail">
    <b-row class="room-detail-header">
      <b-col cols="8" class="h-100 d-flex align-items-center">
        <h2 class="my0">{{ roomName }}</h2>
      </b-col>
      <b-col cols="4" class="h-100 d-flex justify-content-center">
        <radial-progress-bar v-if="loaded" :diameter="55" :completed-steps="roomOccupation" :total-steps="capacity"
        :strokeWidth="5" :innerStrokeWidth="5" innerStrokeColor="transparent" startColor="#FFF" stopColor="#FFF" class="align-self-center">
          <b-row>
            <p class="my-0">{{ roomOccupation }}</p>
            <p class="my-0">/{{ capacity }}</p>
          </b-row>
        </radial-progress-bar>
        <radial-progress-bar v-if="this.checkInsTomorrow.user" :diameter="55" :completed-steps="this.checkInsTomorrow.user.length" :total-steps="capacity"
        :strokeWidth="5" :innerStrokeWidth="5" innerStrokeColor="transparent" startColor="#FFF" stopColor="#FFF" class="align-self-center ml-2">
          <b-row>
            <p v-if="this.checkInsTomorrow.user" class="my-0">{{ this.checkInsTomorrow.user.length }}</p>
            <p class="my-0">/{{ capacity }}</p>
          </b-row>
        </radial-progress-bar>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="12" class="mx-3 mt-4">
        <h3 class="font-weight-bold mb-3">Heute eingecheckt:</h3>
          <div v-for="user in checkInsToday" :key="user.key" class="userList">
            <p v-if="loaded" class="mb-1">
              {{ user.firstName }}
              {{ user.lastName }}
            </p>
          </div>
      </b-col>
    </b-row>
    <b-row v-if="!loaded">
      <b-col class="d-flex justify-content-center mb-3">
        <b-spinner label="Loading..."></b-spinner>
      </b-col>
    </b-row>
    <b-row v-else class="button-row w-100">
      <b-col v-if="notSignedInToday" cols="6" @click="checkIn(currentDate)">
        <covid-button :name="SignInButtonToday" :isDisabled="disableButtonToday"></covid-button>
      </b-col>
      <b-col v-else cols="6" @click="checkout(currentDate)">
        <covid-button :name="SignOutButtonToday"></covid-button>
      </b-col>
      <b-col v-if="notSignedInTomorrow" cols="6" @click="checkIn(dateTomorrow)">
        <covid-button :name="SignInButtonTomorrow" :isDisabled="disableButtonTomorrow"></covid-button>
      </b-col>
            <b-col v-else cols="6" @click="checkout(dateTomorrow)">
        <covid-button :name="SignOutButtonTomorrow"></covid-button>
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
  components: {
    RadialProgressBar,
    CovidButton
  },
  data () {
    return {
      building: '',
      capacity: 0,
      location: '',
      roomName: '',
      checkInsToday: [],
      checkInsTomorrow: [],
      roomID: String,
      SignInButtonToday: 'Sign In Today',
      SignInButtonTomorrow: 'Sign In Tomorrow',
      SignOutButtonToday: 'Sign Out Today',
      SignOutButtonTomorrow: 'Sign Out Tomorrow',
      currentDate: new Date().toISOString().slice(0, 10),
      disableButtonToday: true,
      disableButtonTomorrow: true,
      notSignedInToday: true,
      notSignedInTomorrow: true,
      loaded: false
    }
  },
  created () {
    this.roomID = this.$route.params.roomID
  },
  async mounted () {
    await this.getRoomKeyValuePairs()
    await this.getRoomCheckIns()
    await this.getRoomCheckInsTomorrow()
    await this.protection()
    this.notSignedInToday = await this.isSignedtoCurrentRoom(this.currentDate)
    this.notSignedInTomorrow = await this.isSignedtoCurrentRoom(this.dateTomorrow)
    this.setLoaded()
  },
  computed: {
    roomOccupation: function () {
      return this.checkInsToday.length
    },
    dateTomorrow: function () {
      const currentDate = new Date()
      currentDate.setDate(currentDate.getDate() + 1)
      return currentDate.toISOString().slice(0, 10)
    }
  },
  methods: {
    getRoomKeyValuePairs: async function () {
      await $db()
        .collection('Rooms')
        .doc(this.roomID)
        .get()
        .then(doc => {
          const { building, capacity, location, roomName } = doc.data()
          this.building = building
          this.capacity = +capacity
          this.location = location
          this.roomName = roomName
        })
    },
    getRoomCheckIns: async function () {
      await $db()
        .collection('Rooms/' + this.roomID + '/CheckIn')
        .where('date', '==', this.currentDate)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach((checkIn) => {
            const userRefs = checkIn.data().user
            userRefs.forEach(userRef => {
              userRef.get().then(user => {
                this.checkInsToday.push(user.data())
              })
            })
          })
        })
    },
    getRoomCheckInsTomorrow: async function () {
      await $db()
        .collection('Rooms/' + this.roomID + '/CheckIn')
        .where('date', '==', this.dateTomorrow)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach((checkIn) => {
            this.checkInsTomorrow = checkIn.data()
          })
        })
    },
    protection: async function () {
      await this.signInProtection(this.currentDate, this.checkInsToday)
      await this.signInProtection(this.dateTomorrow, this.checkInsTomorrow.user)
    },
    signInProtection: async function (date, checkIns) {
      let noCapacity = false
      const isSignedIn = await this.getSignedRoom(date)
      if (checkIns) {
        if (checkIns.length >= this.capacity) {
          noCapacity = true
        }
      } if (!(isSignedIn || noCapacity)) {
        if (date === this.currentDate) {
          this.disableButtonToday = false
        } else {
          this.disableButtonTomorrow = false
        }
      }
    },
    getSignedRoom: async function (date) {
      let isSignedIn = false
      const getSignedRoom = await userService.getSignedRoom(date)
      if (getSignedRoom.roomID !== undefined) {
        isSignedIn = true
      }
      return isSignedIn
    },
    isSignedtoCurrentRoom: async function (date) {
      const room = await userService.getSignedRoom(date)
      return !(room.roomID === this.roomID)
    },
    setLoaded: function () {
      this.loaded = true
    },
    checkIn: async function (currentDate) {
      const currentUserID = await userService.currentUser()
        .then(user => user.id)
      const db = await $db().collection('Rooms/' + this.roomID + '/CheckIn')
      const userRef = await $db().doc('User/' + currentUserID)
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
        if (doc.user.length <= this.capacity) {
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
    },
    checkout: async function (date) {
      const currentUserID = await userService.currentUser()
        .then(user => user.id)
      const db = await $db().doc('Rooms/' + this.roomID + '/CheckIn/' + date)
      const userRef = await $db().doc('User/' + currentUserID)
      db.update({
        user: FieldValue.arrayRemove(userRef)
      }).then(
        this.notSignedInToday = true
      )
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
