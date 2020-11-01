<template>
  <div class="home">
    <h4>{{ this.room.roomName }}</h4>
  </div>
</template>
<script>
export default {
  name: 'RoomDetail',
  data () {
    return {
      room: {}
    }
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
        console.log(doc.data())
        this.room = doc.data()
      })
  }
}
</script>

<style lang="sass" scoped>
.home
  overflow-y: hidden
</style>
