<template>
  <div class="container">
    <div class="row">
  <div class="signIn" @submit="onSubmit">
    <form>
      <b-col>
        <b-form-group id="input-group-first-name" label="Your first name:" label-for="input-first-name">
          <b-form-input
            id="input-first-name"
            class="w-100"
            type="text"
            v-model="signIn.firstName"
            required
            placeholder="Max">
          </b-form-input>
        </b-form-group>
      </b-col>

      <b-col>
      <b-form-group id="input-group-last-name" label="Your last name:" label-for="input-last-name">
        <b-form-input
          id="input-last-name"
          type="text"
          class="w-100"
          v-model="signIn.lastName"
          required
          placeholder="Mustermann">
        </b-form-input>
      </b-form-group>
      </b-col>

      <b-col>
      <b-form-group id="input-group-initials" label="Your initials:" label-for="input-initials">
        <b-form-input
          id="input-initials"
          type="text"
          class="w-100"
          v-model="signIn.initials"
          required
          placeholder="Example: mmn"></b-form-input>
      </b-form-group>
      </b-col>

      <b-col>
      <b-form-group id="input-group-master-password" label="Master password:" label-for="input-master-password">
        <b-form-input
          id="input-master-password"
          type="password"
          class="w-100"
          v-model="signIn.masterPassword"
          required></b-form-input>
      </b-form-group>
      </b-col>

      <b-col>
        <b-button @click="onSubmit">Sign-in</b-button>
      </b-col>
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
      this.$notify({
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
