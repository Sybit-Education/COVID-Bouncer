<template>
  <div class="row roomItem--background">
    <div class="col room">
      {{ roomName }}
    </div>
    <div class="col-6 description">
      {{ description }}
    </div>
    <div class="col-2 loadFactor"><circularLoad :value="value" :loadFactor="loadFactor"></circularLoad></div>
  </div>
</template>

<script>
import circularLoad from './circularLoad.vue'

export default {
  components: { circularLoad },
  name: 'roomItem',
  props: {
    roomName: {
      type: String,
      required: true,
      default: '4.05'
    },
    description: {
      type: String,
      default: 'Arlanxeo'
    },
    capacity: {
      default: 10
    },
    currentSituation: {
      default: 6
    }
  },
  computed: {
    loadFactor () {
      return this.currentSituation + '/' + this.capacity
    },
    value () {
      return (100 / this.capacity) * this.currentSituation
    }
  }
}
</script>

<style lang="sass" scoped>
.roomItem--background
  background-color: $primary
  color: $secondary
  padding: 8px
  font-size: 16px
  border-radius: 8px
  margin-top: 8px
  line-height: 40px

.room
  font-weight: bold

.loadFactor
  text-align: end
</style>
