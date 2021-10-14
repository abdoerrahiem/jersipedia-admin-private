import { initializeApp } from 'firebase/app'
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import {
  getDatabase,
  ref,
  set,
  child,
  onValue,
  push,
  update,
  remove,
} from 'firebase/database'
import {
  getStorage,
  ref as refStorage,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyDZWLYpZmoyxZYAECwjDoEu2TDzhs-3sfM',
  authDomain: 'jersey-pedia.firebaseapp.com',
  databaseURL:
    'https://jersey-pedia-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'jersey-pedia',
  storageBucket: 'jersey-pedia.appspot.com',
  messagingSenderId: '234161216355',
  appId: '1:234161216355:web:b70df5fd9356dddc2d5156',
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const authSignInWithEmailAndPassword = signInWithEmailAndPassword
export const authSignOut = signOut
export const database = getDatabase(app)
export const databaseRef = ref
export const databaseSet = set
export const databaseChild = child
export const databaseOnValue = onValue
export const databasePush = push
export const databaseUpdate = update
export const databaseRemove = remove
export const storage = getStorage(app)
export const storageRef = refStorage
export const storageUploadBytesResumable = uploadBytesResumable
export const storageGetDownloadURL = getDownloadURL
export const storageDelete = deleteObject
