<template>
  <q-page class="flex flex-center">
    <img
      alt="Quasar logo"
      src="~assets/quasar-logo-full.svg"
    >
    <Scanner></Scanner>
  </q-page>
</template>

<script>
import Scanner from 'components/Scanner'
export default {
  name: 'PageIndex',
  components: { Scanner }
}
</script>
