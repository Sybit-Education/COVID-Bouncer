import { $db } from 'src/services/firebase'

class UserService {
  signIn ({ firstName, lastName, initials, masterPassword }) {
    $db().collection('config').doc('password').get().then(doc => {
      return doc.value
    }).catch(e => console.log('No master password found'))

    return $db().collection('user').add({
      firstName,
      lastName,
      initials
    }).then(response => {
      return response.id
    }).catch(e => {
      console.log('error:', e)
    })
  }
}

export const userService = new UserService()
