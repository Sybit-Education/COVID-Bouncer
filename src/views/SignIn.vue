<template>
    <div class="row">
  <div class="signIn w-100" @submit="onSubmit">
    <form>
      <b-col>
        <b-form-group id="input-group-first-name" label="Your Firstname:" label-for="input-first-name">
          <b-form-input
            id="input-first-name"
            class="w-100 input-styling"
            type="text"
            v-model="signIn.firstName"
            required
            placeholder="Max">
          </b-form-input>
        </b-form-group>
      </b-col>
      <b-col>
      <b-form-group id="input-group-last-name" label="Your Lastname:" label-for="input-last-name">
        <b-form-input
          id="input-last-name"
          type="text"
          class="w-100 input-styling"
          v-model="signIn.lastName"
          required
          placeholder="Mustermann">
        </b-form-input>
      </b-form-group>
      </b-col>
      <b-col>
      <b-form-group id="input-group-initials" label="Your Initials:" label-for="input-initials">
        <b-form-input
          id="input-initials"
          type="text"
          class="w-100 input-styling"
          v-model="signIn.initials"
          required
          placeholder="mmn"></b-form-input>
      </b-form-group>
      </b-col>
      <b-col>
      <b-form-group id="input-group-master-password" label="Master Password:" label-for="input-master-password">
        <b-form-input
          id="input-master-password"
          type="password"
          autocomplete="on"
          class="w-100 input-styling"
          v-model="signIn.masterPassword"
          required
          placeholder="Enter master password"
          ></b-form-input>
      </b-form-group>
      </b-col>
      <b-col>
        <b-button class="w-100 mt-4 sy-background signIn-button" @click="onSubmit">Sign In</b-button>
      </b-col>
    </form>
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
          this.$router.push({ name: 'Home' })
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
  border: none
  font-weight: bold

.input-first-name
  width: 100%
  border: none
  border-bottom: 2px solid black
  margin-bottom: 2rem

.input-styling:focus
  box-shadow: 0 0 0 0.2rem rgba(181, 22, 131, 0.25)
  border: none
</style>
