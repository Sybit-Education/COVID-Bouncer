import { $db } from '../services/firebase'
import { userService } from './User.service'
import { checkInService } from './CheckIn.service'

const COLLECTION_NAME = 'Room'
const COLLECTION_CHECKIN = 'CheckIn'

class RoomService {
  list = []

  async getRoomList () {
    if (this.list && this.list.length > 0) {
      return this.list
    }
    await $db()
      .collection(COLLECTION_NAME)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.list.push({
            id: doc.id,
            name: doc.data().name,
            maxPerson: doc.data().maxPerson,
            qrCode: doc.data().qrCode
          })
        })
      })
      .catch((error) => {
        console.log('Error getting room list: ' + error)
      })
    return this.list
  }

  async getRoomById (id) {
    const roomList = await this.getRoomList()
    const filteredList = roomList.filter(room => room.id === id)[0]
    return typeof filteredList === 'undefined' ? { error: 'No Room with the id ' + id + ' found' } : filteredList
  }

  async getRoomByQrCode (qrCode) {
    const roomList = await this.getRoomList()
    const filteredList = roomList.filter(room => room.qrCode === qrCode)[0]
    return typeof filteredList === 'undefined' ? { error: 'No Room with the QR-Code ' + qrCode + 'found' } : filteredList
  }

  getUsersOfRoom (qrCode) {
    const room = this.getRoomByQrCode(qrCode)
    console.log(room)
    return [{ initials: 'ssr', firstName: 'Stephan', lastName: 'Strittmatter' }]
  }

  // persist user on room for checkin
  checkIn (qrCode) {
    userService.currentUser().then(user => {
      this.getRoomByQrCode(qrCode).then(room => {
        checkInService.checkIn(user, room)
      })
    })
  }

  // persist user on room for reservation
  reserve (qrCode) {
    const user = userService.currentUser()
    console.log('reserve room: ' + qrCode + ' for user ' + user)

    // TODO persist user on room for reservation
  }

  removeMe (qrCode) {
    const user = userService.currentUser()
    console.log('remove user ' + user + ' from room qrCode: ' + qrCode)

    // TODO persist
  }

  async getBookings () {
    const bookingList = []
    await $db()
      .collection(COLLECTION_CHECKIN)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          bookingList.push({
            id: doc.id,
            userId: doc.data().user,
            roomId: doc.data().room,
            bookingDate: doc.data().date.toDate().toDateString()
          })
        })
      })
      .catch((error) => {
        console.log('Error getting checkIn list: ' + error)
      })
    return bookingList
  }

  async getCurrentBookedRoomOfUser () {
    const currentUser = await userService.currentUser()
    checkInService.getTodaysCheckin(currentUser)
      .then(async (checkin) => {
        let bookedRoom = null
        if (checkin != null) {
          bookedRoom = await this.getRoomById(checkin.room)
        } else {
          console.log('no checkin room')
          bookedRoom = null
        }
        console.log(bookedRoom)
        return bookedRoom
      })
  }
}

export const roomService = new RoomService()
