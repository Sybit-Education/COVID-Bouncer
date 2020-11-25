import { $db } from '@/services/firebase.js'

const COLLECTION_NAME = 'Config'

class ConfigService {
  fetchMasterPassword () {
    return $db()
      .collection(COLLECTION_NAME)
      .doc('password')
      .get()
      .then(doc => {
        return doc.data().value
      })
      .catch(e => console.log('No master password found'))
  }
}

export const configService = new ConfigService()
