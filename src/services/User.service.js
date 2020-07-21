import { $db } from 'src/services/firebase'
import { configService } from 'src/services/Config.service'
import { LocalStorage } from 'quasar'

const COLLECTION_NAME = 'user'

class UserService {
  constructor () {
    this.user = null
  }

  signIn ({ firstName, lastName, initials, masterPassword }) {
    return configService
      .fetchMasterPassword()
      .then(loadedPassword => {
        if (loadedPassword !== masterPassword) {
          return Promise.reject('The entered password does not match with the master password')
        } else {
          this.fetchUserByInitials(initials)
            .then(user => {
              if (user) {
                return user
              } else {
                const user = {
                  firstName,
                  lastName,
                  initials
                }
                return $db().collection(COLLECTION_NAME).add(user).then(response => {
                  user.id = response.id
                  return user
                })
              }
            })
            .then(user => {
              this.user = user
              LocalStorage.set('userId', user.id)
            })
        }
      })
  }

  fetchUserByInitials (initials) {
    return $db().collection(COLLECTION_NAME).where('initials', '==', initials).get().then(response => {
      let user = null
      response.forEach(userDoc => {
        user = {
          id: userDoc.id,
          firstName: userDoc.data().firstName,
          lastName: userDoc.data().lastName,
          initials: userDoc.data().initials
        }
      })
      return user
    })
  }

  fetchUserById (userId) {
    return $db().collection(COLLECTION_NAME).doc(userId).get().then(userDoc => {
      return {
        id: userDoc.id,
        firstName: userDoc.data().firstName,
        lastName: userDoc.data().lastName,
        initials: userDoc.data().initials
      }
    })
  }

  currentUser () {
    const userId = LocalStorage.getItem('userId')

    if (!userId) {
      return Promise.resolve(null)
    } else {
      if (this.user && this.user.userId === userId) {
        return Promise.resolve(this.user)
      }
      return this.fetchUserById(userId)
    }
  }

  isLoggedIn () {
    return !!LocalStorage.getItem('userId')
  }

  logout () {
    LocalStorage.remove('userId')
    this.user = null
  }
}

export const userService = new UserService()
