<template>
  <div class="home">
    <building-list :locationName=location></building-list>
  </div>
</template>
<script>
// @ is an alias to /src
import BuildingList from '@/components/BuildingList'

export default {
  name: 'BuildingView',
  data () {
    return {
      location: null
    }
  },
  components: {
    BuildingList
  },
  created () {
    this.location = this.$route.params.location
  }
}
</script>

<style lang="sass" scoped>
.home
  overflow-y: hidden
</style>
