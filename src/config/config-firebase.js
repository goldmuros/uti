import firebase from 'firebase'
import 'firebase/firestore'

const config_firebase = {
  apiKey: '',
  authDomain: '',
  databaseURL: '',
  projectId: '',
  storageBucket: ''
}
 
firebase.initializeApp(config_firebase)

export const db = firebase.firestore()