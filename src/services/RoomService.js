import { $db } from '../services/firebase'

class RoomService {
  async getRoomByID (id) {
    const room = await $db().doc('Rooms/' + id).get()
    return { roomID: id, roomData: room.data() }
  }
}

export const roomService = new RoomService()
