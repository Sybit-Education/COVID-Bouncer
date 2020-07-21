<template>
  <q-page class="flex flex-center flex-direction_column">
    <q-btn color="primary" @click="toggle()">QR-Code Scannen</q-btn>
    <Scanner v-if="isOpen"></Scanner>
  </q-page>
</template>

<script>
import Scanner from 'components/Scanner'

export default {
  name: 'Scanner',
  components: { Scanner },
  data () {
    return {
      isOpen: false
    }
  },
  methods: {
    toggle () {
      this.isOpen = !this.isOpen
    }
  }
}
</script>

<style lang="sass" scoped>
.flex-direction_column
  flex-direction: column
</style>
