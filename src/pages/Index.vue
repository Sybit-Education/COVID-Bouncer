<template>
  <q-page class="flex flex-center">
    <img
      alt="Quasar logo"
      src="~assets/quasar-logo-full.svg"
    >
    <room-list />
  </q-page>
</template>

<script>
import RoomList from '../components/RoomList.vue'
export default {
  name: 'PageIndex',
  components: [
    RoomList
  ]

}
</script>
