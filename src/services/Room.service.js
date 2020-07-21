import 'firebase/firestore'
import '../firebase-config'

const COLLECTION_NAME = 'Room'

export class RoomService {
  getRoomList () {
    const list = []
    $db
      .collection(COLLECTION_NAME)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          list.push({
            id: doc.id,
            title: doc.data().title
          })
          console.log('Room: ' + doc)
        })
      })
      .catch((error) => {
        console.err('Error getting room list: ' + error)
      })
    return list
  }
}
