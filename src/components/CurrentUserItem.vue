<template>
  <span v-if="user">
    {{user.firstName}} {{user.lastName}} ({{user.initials}})
  </span>
</template>

<script>
import { userService } from '../services/User.service'

export default {
  name: 'UserItem',
  data () {
    return {
      user: {}
    }
  },
  created () {
    userService.currentUser().then((user) => {
      this.user = user
    })
  }
}
</script>

<style>

</style>
