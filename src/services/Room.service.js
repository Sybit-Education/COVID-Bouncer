import { $db } from '../services/firebase'

class RoomService {
  async getOccupancyOfRoomByID (id) {
    const currentDate = new Date().toISOString().slice(0, 10)
    let occupancy = null

    await $db()
      .collection('Rooms/' + id + '/CheckIn')
      .where('date', '==', currentDate)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach((checkIn) => {
          occupancy = checkIn.data().user.length
        })
      })
    return occupancy
  }
}

export const roomService = new RoomService()
