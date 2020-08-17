<template>
  <div :id="id" class="row roomItem--background" @click="$router.replace(route)">
    <div class="col room">
      {{ name }}
    </div>
    <div class="col-6 description">
      {{ description }}
    </div>
    <div class="col-2 loadFactor">
      <circular-Load-indicator :value="value" :loadFactor="loadFactor" />
    </div>
  </div>
</template>

<script>
import CircularLoadIndicator from 'components/CircularLoadIndicator.vue'

export default {
  components: { CircularLoadIndicator },
  name: 'RoomListItem',
  props: {
    id: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    capacity: {
      type: Number
    },
    currentSituation: {
      type: Number
    },
    qrCode: {
      type: String,
      required: true
    }
  },
  computed: {
    loadFactor () {
      return this.currentSituation + '/' + this.capacity
    },
    value () {
      return (100 / this.capacity) * this.currentSituation
    },
    route () {
      return '/room/' + this.qrCode
    }
  }
}
</script>

<style lang="sass" scoped>
.roomItem--background
  background-color: $primary
  color: $secondary
  padding: 8px 16px
  font-size: 16px
  border-radius: 8px
  margin-top: 8px
  line-height: 40px
  cursor: pointer

.room
  font-weight: bold

.loadFactor
  text-align: end

.description
  padding-left: 8px
</style>
