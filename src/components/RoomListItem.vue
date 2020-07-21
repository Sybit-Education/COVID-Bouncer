<template>
  <div class="row roomItem--background">
    <div class="col room">
      {{ roomName }}
    </div>
    <div class="col-6 description">
      {{ description }}
    </div>
    <div class="col-2 loadFactor">
      <circular-Load :value="value" :loadFactor="loadFactor" />
    </div>
  </div>
</template>

<script>
import CircularLoad from './CircularLoad.vue'

export default {
  components: { CircularLoad },
  name: 'RoomItem',
  props: {
    roomName: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    capacity: {
    },
    currentSituation: {
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
