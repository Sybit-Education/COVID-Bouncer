<template>
  <b-container>
    <b-row>
  <div class="signIn" @submit="onSubmit">
    <b-form>
      <b-col>
      <b-form-group
        id="input-group-first-name"
        label="Your first name:"
        label-for="input-first-name">
        <b-form-input
          id="input-first-name"
          v-model="signIn.firstName"
          type="text"
          required
          placeholder="Enter first name"></b-form-input>
      </b-form-group>
      </b-col>

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

      <b-col>
      <b-button type="submit" variant="primary">Sign-in</b-button>
      </b-col>
    </b-form>
  </div>
    </b-row>
  </b-container>
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
