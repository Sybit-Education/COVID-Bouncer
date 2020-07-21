import { $db } from '../services/firebase'

const COLLECTION_NAME = 'Room'
class RoomService {
  async getRoomList () {
    const list = []
    await $db()
      .collection(COLLECTION_NAME)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          list.push({
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
    return list
  }

  async getRoomByQrCodeScanner (qrCode) {
    const roomList = await this.getRoomList()
    return roomList.filter(room => room.qrCode === qrCode)
  }
}

export const roomService = new RoomService()
