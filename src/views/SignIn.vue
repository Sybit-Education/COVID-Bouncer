<template>
  <div class="container">
    <div class="row">
  <div class="signIn" @submit="onSubmit">
    <form>
      <div class="col">
        <input
          id="input-first-name"
          class="input-first-name"
          v-model="signIn.firstName"
          type="text"
          required
          placeholder="Enter first name"/>
      </div>
      <b-col>
      <b-form-group id="input-group-last-name" label="Your last name:" label-for="input-last-name">
        <b-form-input
          id="input-last-name"
          v-model="signIn.lastName"
          required
          placeholder="Enter last name">
        </b-form-input>
      </b-form-group>
      </b-col>
      <b-col>
      <b-form-group id="input-group-initials" label="Your initials:" label-for="input-initials">
        <b-form-input
          id="input-initials"
          v-model="signIn.initials"
          required
          placeholder="Enter your initials (3 digits)"></b-form-input>
      </b-form-group>
      </b-col>

      <b-col>
      <b-form-group id="input-group-master-password" label="Master password:" label-for="input-master-password">
        <b-form-input
          id="input-master-password"
          v-model="signIn.masterPassword"
          required
          placeholder="Master password"></b-form-input>
      </b-form-group>
      </b-col>

      <div class="col">
      <button class="signIn-button" type="submit" variant="primary">Sign-in</button>
      </div>
    </form>
  </div>
    </div>
  </div>
</template>

<script>
import { userService } from '@/services/UserService'

export default {
  name: 'SignIn',
  data () {
    return {
      signIn: {
        firstName: '',
        lastName: '',
        initials: '',
        masterPassword: ''
      }
    }
  },
  methods: {
    onSubmit () {
      this.signIn.initials = this.signIn.initials.toLowerCase()
      userService
        .signIn(this.signIn)
        .then(() => {
          this.$router.push({ name: 'home' })
        })
        .catch(e => {
          this.signIn.masterPassword = ''
          this.showNotification(e)
        })
    },
    showNotification (message) {
      this.notify({
        message,
        color: 'negative',
        position: 'top',
        timeout: 10000
      })
    }
  }
}
</script>

<style lang="sass" scoped>
.signIn-button
  background-color: green

.input-first-name
  width: 100%
  border: none
  border-bottom: 2px solid black
  margin-bottom: 2rem
</style>
