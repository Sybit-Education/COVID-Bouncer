import { $db } from '@/services/firebase'
import { configService } from '@/services/Config.service.js'
import { roomService } from '@/services/RoomService'

const COLLECTION_NAME = 'User'

class UserService {
  constructor () {
    this.user = null
  }

  async signIn ({ firstName, lastName, initials, masterPassword }) {
    const loadedPassword = await configService.fetchMasterPassword()
    if (loadedPassword !== masterPassword) {
      return true
    } else {
      await this.fetchUserByInitials(initials)
        .then(user => {
          if (user) {
            return user
          } else {
            const user1 = {
              firstName,
              lastName,
              initials
            }
            return $db().collection(COLLECTION_NAME).add(user1).then(response => {
              user1.id = response.id
              return user1
            })
          }
        })
        .then(user2 => {
          this.user = user2
          localStorage.userId = user2.id
        })
    }
  }

  async fetchUserByInitials (initials) {
    const response = await $db().collection(COLLECTION_NAME).where('initials', '==', initials).get()
    response.forEach(userDoc => {
      const user = {
        id: userDoc.id,
        firstName: userDoc.data().firstName,
        lastName: userDoc.data().lastName,
        initials: userDoc.data().initials
      }
      return user
    })
  }

  async fetchUserById (userId) {
    const userDoc = await $db().collection(COLLECTION_NAME).doc(userId).get()
    return {
      id: userDoc.id,
      firstName: userDoc.data().firstName,
      lastName: userDoc.data().lastName,
      initials: userDoc.data().initials
    }
  }

  currentUser () {
    const userId = localStorage.getItem('userId')
    let result = null

    if (userId) {
      if (this.user && this.user.userId === userId) {
        result = this.user
      } else {
        result = this.fetchUserById(userId)
      }
    }
    return Promise.resolve(result)
  }

  isLoggedIn () {
    return !!localStorage.getItem('userId')
  }

  logout () {
    localStorage.removeItem('userId')
    this.user = null
  }

  async getSignedRoom (date) {
    let myRoom
    const currentUserID = await this.currentUser()
    const userRef = await $db().doc('User/' + currentUserID.id)
    const querySnapshot = await $db().collectionGroup('CheckIn').where('date', '==', date).get()
    querySnapshot.forEach((doc) => {
      const roomID = doc.ref.parent.parent.id
      const user = doc.data().user
      user.forEach(user => {
        if (user.id === userRef.id) {
          myRoom = roomID
        }
      })
    })
    return await roomService.getRoomByID(myRoom)
  }
}

export const userService = new UserService()
