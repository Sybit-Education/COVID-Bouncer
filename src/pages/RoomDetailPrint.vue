<template>
  <div class="main-container">
    <div class="print-label">
      <div class="header text-center">
        <h1>{{room.name}}</h1>
      </div>
      <div class="text-center">
        <div>maximal {{ room.maxPerson }} Personen</div>
        <vue-qrcode :value="room.qrCode" :options="{ width: 200 }"></vue-qrcode>
        <div class="text-primary">Please scan to Check-in!</div>
      </div>
      <h5 class="text-right">COVID Bouncer</h5>
    </div>
    <div class="q-ma-lm print-hide">
      Print this label and attach next to the door to check in via QR-Code.
    </div>
    <q-footer elevated class="print-hide">
      <q-btn flat icon="print" @click="print" label="Print">
        <q-tooltip>Print this label</q-tooltip>
      </q-btn>
      <q-btn flat class="justify-right" icon="close" label="Close" @click="close">
        <q-tooltip>Close</q-tooltip>
      </q-btn>
    </q-footer>
  </div>
</template>

<script>
import { roomService } from '../services/Room.service'
import VueQrcode from '@chenfengyuan/vue-qrcode'

export default {
  name: 'RoomDetailPage',
  components: { VueQrcode },
  data () {
    return {
      room: {}
    }
  },
  created () {
    roomService.getRoomByQrCode(this.$route.params.qrCode).then(data => {
      data.error ? this.$router.push('/404') : this.room = data
    })
  },
  methods: {
    print () {
      window.print()
    },
    close () {
      this.$router.push('/room/' + this.room.qrCode)
    }
  }
}
</script>

<style lang="sass" scoped>
  .print-label
    border: 1pt solid $grey
    width: 10cm
    max-width: 10cm
    min-width: 10cm
    padding: 1rem
</style>
