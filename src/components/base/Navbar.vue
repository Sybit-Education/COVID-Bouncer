<template>
  <b-row v-if="showHeader" id="nav" class=" main-nav">
    <b-col cols="2" class="align-self-center text-center">
      <div v-if="showBackButton">
        <div @click="$router.go(-1)" class="sy-color">
          <font-awesome-icon :icon="['fas', 'chevron-left']" />
        </div>
      </div>
    </b-col>
    <b-col cols="8" class="text-center align-self-center"><h1 class="my0 ">Rooms</h1></b-col>
    <b-col cols="2"></b-col>
  </b-row>
</template>
<script>
export default {
  computed: {
    showBackButton () {
      return this.$route.meta.displayHeaderBackButton ?? true
    },
    showHeader () {
      return this.$route.meta.displayHeader ?? true
    }
  }
}
</script>

<style lang="sass">
.main-nav
  height: 60px
  margin-bottom: 3rem
</style>
