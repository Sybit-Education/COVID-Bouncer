<template>
  <div class="row justify-center items-center content-center">
    <div class="col-12 col-md-8 co-lg-6">
    <q-card class="my-card">
        <q-card-section>
          <div class="text-h6">COVID Bouncer</div>
        </q-card-section>
        <q-separator light inset />
        <q-card-section>

          <q-form
              @submit="onSubmit"
              class="q-gutter-md"
          >
            <q-input
                filled
                v-model="signInForm.firstName"
                label="Your first name *"
                hint="First name"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Please tell me your first name']"
            />

            <q-input
                filled
                v-model="signInForm.lastName"
                label="Your last name *"
                hint="Last name"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Please tell me your last name']"
            />

            <q-input
                filled
                v-model="signInForm.initials"
                label="Your initials *"
                hint="Initials"
                lazy-rules
                :rules="[ val => val && val.length === 3 || 'Please tell me your initials']"
            />

            <q-input
                filled
                type="password"
                v-model="signInForm.masterPassword"
                label="Master password *"
                hint="Master password"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Please enter the master password ']"
            />

            <div>
              <q-btn label="Submit" type="submit" color="primary"/>
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </div>
  </div>

</template>

<script>
import { userService } from 'src/services/User.service'

export default {
  name: 'SignIn',
  data () {
    return {
      signInForm: {
        firstName: '',
        lastName: '',
        initials: '',
        masterPassword: ''
      }
    }
  },
  methods: {
    onSubmit () {
      this.signInForm.initials = this.signInForm.initials.toLowerCase()
      userService
        .signIn(this.signInForm)
        .then(userId => {
          this.$router.push({ name: 'home' })
        })
        .catch(e => {
          console.log(e)
          this.showNotification(e)
        })
    },

    showNotification (message) {
      this.$q.notify({
        message,
        color: 'negative',
        position: 'top',
        actions: { label: 'Ok', color: 'white', handler: () => { /* console.log('wooow') */ } },
        timeout: 10000
      })
    }
  }

}
</script>
