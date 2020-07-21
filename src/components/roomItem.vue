<template>
  <div class="row roomItem--background">
    <div class="col room">
      {{ room }}
    </div>
    <div class="col-6 description">
      {{ description }}
    </div>
    <div class="col loadFactor"><circularLoad :value="value" :loadFactor="loadFactor"></circularLoad></div>
  </div>
</template>

<script>
import circularLoad from './circularLoad.vue'

export default {
  components: { circularLoad },
  name: 'roomItem',
  props: {
    room: {
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
      default: 4
    }
  },
  computed: {
    loadFactor () {
      return this.currentSituation + '/' + this.capacity
    },
    value () {
      const factor = 100 / this.capacity
      return factor * this.currentSituation
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
