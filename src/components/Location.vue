<template>
<div>
    <div>
        <div class="row justify-around location--background">
        <div class="col text" @click="switchLocation(1)">JHB</div>
        <div class="col text" @click="switchLocation(2)">pforzheim</div>
        <div class="col text" @click="switchLocation(3)">schiesser</div>
        <div class="col text" @click="switchLocation(4)">offenbach</div>
        </div>
    </div>
    <locationItem></locationItem>
</div>
</template>

<script>
import locationItem from 'components/LocationItem.vue'
export default {
  components: { locationItem },
  data () {
    return {
      location: 1
    }
  },
  methods: {
    switchLocation (loc) {
      console.log('switchLocation -> loc', loc)
      this.location = loc
    }
  }
}
</script>

<style lang="sass" scoped>
.location--background
  background-color: $primary
  color: $secondary
  padding: 8px
  font-size: 16px
  border-radius: 8px
  margin-top: 8px

.text
  text-align: center
  padding: 0px 8px
  color: whitesmoke
  &:active
    font-weight: bold

</style>
