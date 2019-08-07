import firebase from 'firebase'
import 'firebase/firestore'

const config_firebase = {
  apiKey: 'AIzaSyALfkNVI8TJLw9FvSYzDE7SMIFIoV6QQ6w',
  authDomain: 'uti-terapia.firebaseapp.com',
  databaseURL: 'https://uti-terapia.firebaseio.com',
  projectId: 'uti-terapia',
  storageBucket: 'uti-terapia.appspot.com'
}

// const config_firebase = {
//   apiKey: '',
//   authDomain: '',
//   databaseURL: '',
//   projectId: '',
//   storageBucket: ''
// }

firebase.initializeApp(config_firebase)

export const db = firebase.firestore()