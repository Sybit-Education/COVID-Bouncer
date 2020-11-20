<template>
  <b-col class="card">
    <b-row class="h-100">
    <b-col cols="8" class="h-100 d-flex justify-content-center">
    <h2 class="align-self-center">{{ name }}</h2>
    </b-col>
    <b-col v-if="occupancy" cols="4" class="h-100 d-flex justify-content-center">
      <radial-progress-bar :diameter="55" :completed-steps="occupancy" :total-steps="capacity"
        :strokeWidth="5" :innerStrokeWidth="5" innerStrokeColor="transparent"
        startColor="#000" stopColor="#000" class="align-self-center">
          <b-row>
            <p class="my-0">{{ occupancy }} / </p>
            <p class="my-0">{{ capacity }}</p>
          </b-row>
        </radial-progress-bar>
    </b-col>
    </b-row>
  </b-col>
</template>

<script>

import RadialProgressBar from 'vue-radial-progress'
export default {
  props: ['name', 'occupancyProp', 'capacityProp'],
  data: function () {
    return {
      occupancy: this.occupancyProp,
      capacity: this.capacityProp
    }
  },
  components: {
    RadialProgressBar
  }
}
</script>

<style lang="sass" scoped>
.card
  height: 80px
  border: 2px solid black
  border-radius: 8px
  margin-bottom: 2rem
  color: black
</style>
