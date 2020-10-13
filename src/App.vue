<template>
  <div id="app">
    <div id="nav" class="row main-nav">
      <div class="col-2 align-self-center text-center"><div v-if="isIndex"><router-link :to="-1" class="sy-color"><font-awesome-icon :icon="['fas', 'chevron-left']" /></router-link></div></div>
      <div class="col-8 align-self-center text-center"><h1 class="mt-0 mb-0 ">SyRooms</h1></div>
      <div class="col-2 align-self-center text-center"></div>
    </div>
    <router-view/>
  </div>
</template>

<style lang="sass">
.main-nav
  margin-left: 12px
  margin-right: 12px
  height: 60px
  margin-bottom: 1rem
</style>

<script>
export default {
  computed: {
    isIndex () {
      return this.$route.name !== 'Home'
    }
  }
}
</script>
