<template>
  <div id="app" class="container">
    <navbar></navbar>
    <router-view/>
    <notifications group="error" position="top center"/>
  </div>
</template>

<script>
import Navbar from '@/components/base/Navbar'

export default {
  components: {
    Navbar
  }
}
</script>

<style lang="sass">
.main-nav
  height: 60px
  margin-bottom: 3rem
</style>
