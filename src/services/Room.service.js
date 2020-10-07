import { $db } from '../services/firebase'
import { userService } from './User.service'
import { checkInService } from './CheckIn.service'

const COLLECTION_NAME = 'Room'
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
        this.list = []
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

  async getRoomByQrCode (qrCode) {
    const roomList = await this.getRoomList()
    const filteredList = roomList.filter(room => room.qrCode === qrCode)[0]
    return typeof filteredList === 'undefined' ? { error: 'No Room with the QR-Code found' } : filteredList
  }

  getUsersOfRoom (qrCode) {
    // eslint-disable-next-line no-unused-vars
    const room = this.getRoomByQrCode(qrCode)
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
}

export const roomService = new RoomService()
