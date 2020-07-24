import { $db } from '../services/firebase'
import { userService } from './User.service'

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
        console.log('loading room list')
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

  async getRoomByQrCodeScanner (qrCode) {
    const roomList = await this.getRoomList()
    const filteredList = roomList.filter(room => room.qrCode === qrCode)[0]
    return typeof filteredList === 'undefined' ? { error: 'No Room with the QR-Code found' } : filteredList
  }

  // persist user on room for checkin
  checkin (qrCode) {
    const user = userService.currentUser()
    console.log('check in room: ' + qrCode + ' for user ' + user)

    // TODO persist user on room for checkin
  }

  // persist user on room for reservation
  reserve (qrCode) {
    const user = userService.currentUser()
    console.log('reserve room: ' + qrCode + ' for user ' + user)

    // TODO persist user on room for reservation
  }
}

export const roomService = new RoomService()
