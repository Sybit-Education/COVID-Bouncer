<template>
  <b-row id="nav" class=" main-nav" v-if="showHeader">
    <b-col class="col-2 align-self-center text-center"><div v-if="showBackButton"><div @click="$router.go(-1)" class="sy-color"><font-awesome-icon :icon="['fas', 'chevron-left']" /></div></div></b-col>
    <b-col class="col-8 align-self-center text-center"><h1 class="mt-0 mb-0 ">SyRooms</h1></b-col>
    <b-col class="col-2 align-self-center text-center"></b-col>
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
