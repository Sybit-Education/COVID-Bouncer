<template>
  <q-page class="flex flex-center">
    <button @click="toggle()">QR-Code Scannen</button>
    <Scanner v-if="isOpen"></Scanner>
  </q-page>
</template>

<script>
import Scanner from 'components/Scanner'
export default {
  name: 'PageIndex',
  components: { Scanner },
  data () {
    return {
      isOpen: false
    }
  },
  methods: {
    toggle: function () {
      this.isOpen = !this.isOpen
    }
  }
}
</script>
