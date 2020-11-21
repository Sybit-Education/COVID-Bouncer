<template>
  <div>
    <location-list></location-list>
  </div>
</template>

<script>
import LocationList from '@/components/LocationList'
import { $db } from '@/services/firebase'
// import { userService } from '@/services/UserService'

export default {
  name: 'Home',
  components: {
    LocationList
  },
  data () {
    return {
      currentDate: new Date().toISOString().slice(0, 10)
    }
  },
  async mounted () {
    await this.getTodaysRoom()
  },
  methods: {
    getTodaysRoom: async function () {
      // const currentUserID = await userService.currentUser()
      // const userRef = await $db().doc('user/' + currentUserID)
      const querySnapshot = await $db().collectionGroup('CheckIn').where('date', '==', this.currentDate).get()
      querySnapshot.forEach((doc) => {
        console.log(doc.ref.parent.parent.id)
        /* const user = doc.data().user
         user.forEach(user => {
          user.get().then(snap => {
            console.log(snap.data())
            console.log(user.getParent().getParent())
          })
        }) */
        console.log(doc.id, ' => ', doc.data())
      })
    }
  }
}
</script>
