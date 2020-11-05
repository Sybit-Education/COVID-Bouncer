<template>
  <div id="app" class="container">
    <router-view/>
    <notifications group="error" position="top center"/>
  </div>
</template>

<style lang="sass">
.main-nav
  height: 60px
  margin-bottom: 3rem
</style>
