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

  getDateString (date) {
    const year = date.getFullYear()
    const month = date.getMonth() < 10 ? '0' + date.getMonth() : date.getMonth()
    const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()

    return year + month + day
  }
}

export const checkInService = new CheckInService()
