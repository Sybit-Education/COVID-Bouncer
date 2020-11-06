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
    <b-col @click="checkIn" class="button-row">
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
      SignInButton: 'Sign In',
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
    checkIn: async function () {
      const db = await this.$firebase.firestore().collection('Rooms/' + this.roomID + '/CheckIn')
      db
        .get()
        .then(snap => {
          if (snap.docs.length > 0) {
            // Wenn die Subcollection da ist. Suche das Doc mit dem Heutigen Datum, Wenn das Datum nicht das ist, Füge das Doc hinzu
            const todayDoc = snap.docs.filter(doc => doc.id === this.currentDate)
            console.log('todayDoc', todayDoc[0].data())
            snap.forEach(doc => {
              if (doc.id === this.currentDate) {
                console.log('Geilo', doc.data())
              }
            })
          } else {
            this.setSubcollection()
          }
          snap.forEach(doc => {
            console.log(this.currentDate)
            console.log(doc.id, doc.data())
          })
        })
    },
    setSubcollection: async function () {
      const db = await this.$firebase.firestore().collection('Rooms/' + this.roomID + '/CheckIn').doc(this.currentDate)
      db.set({
        date: this.currentDate,
        user: ['user1']
      })
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
