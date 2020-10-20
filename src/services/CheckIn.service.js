import { $db } from '../services/firebase'

const COLLECTION_NAME = 'CheckIn'
class CheckInService {
  async checkIn (user, room) {
    const dateString = this.getDateString(new Date())
    const collection = $db().collection(COLLECTION_NAME)
    // TODO persist user on room for checkin
    collection.doc(user.initials + '_' + dateString).set({
      user: user.id,
      room: room.id,
      date: new Date()
    }, { merge: true }).then(() => {
      console.log('checkin written to database')
    }).catch(error => {
      console.error('Error writing document: ', error)
    })
  }

  /**
   * Get the room of the user, where he is checked in today.
   */
  async getTodaysCheckin (user) {
    console.log('getTodaysCheckin: user=' + JSON.stringify(user))
    const docRef = $db().collection(COLLECTION_NAME).doc(user.initials + '_' + this.getDateString(new Date()))
    let checkin = null
    await docRef.get().then((doc) => {
      if (doc.exists) {
        checkin = {
          room: doc.data().room,
          user: doc.data().user,
          date: doc.data().date
        }
      } else {
        console.log('no checkin found')
        checkin = null
      }
    }).catch((error) => {
      console.log('Error getting document: ', error)
      checkin = null
    })
    return checkin
  }

  getTodaysUsersOfRoom (room) {
    const list = []
    // const dateString = this.getDateString(new Date())
    const collection = $db().collection(COLLECTION_NAME)
    collection.get()
      .then((querySnapshot) => {
        console.log('loading reservation list')
        querySnapshot.forEach((doc) => {
          list.push({
            id: doc.id,
            name: doc.data().name,
            maxPerson: doc.data().maxPerson,
            qrCode: doc.data().qrCode
          })
        })
      })
  }

  getDateString (date) {
    const year = date.getFullYear()
    const month = padDate(date.getMonth())
    const day = padDate(date.getDate())
    return year + month + day

    function padDate (number) {
      return number.toString().padStart(2, '0')
    }
  }
}

export const checkInService = new CheckInService()
