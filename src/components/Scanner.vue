<template>
  <div>
    <p class="error">{{ error }}</p>
    <qrcode-stream @decode="onDecode" @init="onInit" />
  </div>
</template>

<script>
import { QrcodeStream } from 'vue-qrcode-reader'
import { roomService } from '../services/Room.service'

export default {
  components: { QrcodeStream },
  data () {
    return {
      error: ''
    }
  },
  methods: {
    onDecode (result) {
      this.$router.push({ path: `/room/${result}` })
      this.result = result
      // eslint-disable-next-line no-unused-vars
      const roomByQrCodeScanner = roomService.getRoomByQrCodeScanner(result)
    },
    async onInit (promise) {
      try {
        await promise
      } catch (error) {
        if (error.name === 'NotAllowedError') {
          this.error = 'ERROR: you need to grant camera access permisson'
        } else if (error.name === 'NotFoundError') {
          this.error = 'ERROR: no camera on this device'
        } else if (error.name === 'NotSupportedError') {
          this.error = 'ERROR: secure context required (HTTPS, localhost)'
        } else if (error.name === 'NotReadableError') {
          this.error = 'ERROR: is the camera already in use?'
        } else if (error.name === 'OverconstrainedError') {
          this.error = 'ERROR: installed cameras are not suitable'
        } else if (error.name === 'StreamApiNotSupportedError') {
          this.error = 'ERROR: Stream API is not supported in this browser'
        }
      }
    }
  }
}
</script>

<style scoped>
  .error {
    font-weight: bold;
    color: red;
  }
</style>
