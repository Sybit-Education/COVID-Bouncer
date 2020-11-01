<template>
  <div id="app" class="container">
    <div id="nav" class="row main-nav">
      <div class="col-2 align-self-center text-center"><div v-if="isIndex"><div @click="$router.go(-1)" class="sy-color"><font-awesome-icon :icon="['fas', 'chevron-left']" /></div></div></div>
      <div class="col-8 align-self-center text-center"><h1 class="mt-0 mb-0 ">SyRooms</h1></div>
      <div class="col-2 align-self-center text-center"></div>
    </div>
    <router-view/>
  </div>
</template>

<style lang="sass">
.main-nav
  height: 60px
  margin-bottom: 3rem
</style>

<script>
export default {
  computed: {
    isIndex () {
      if (window.history.length > 2) {
        return this.$route.name !== 'Home'
      }
      return false
    }
  }
}
</script>
