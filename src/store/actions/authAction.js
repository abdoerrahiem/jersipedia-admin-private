import swal from 'sweetalert'
import { LOGIN, CHECK_LOGIN, LOGOUT } from '../types'
import {
  auth,
  authSignInWithEmailAndPassword,
  authSignOut,
  database,
  databaseRef,
  databaseOnValue,
  dispatchLoading,
  dispatchSuccess,
  dispatchError,
} from '../../utils'

export const login = (email, password) => (dispatch) => {
  dispatchLoading(dispatch, LOGIN)

  authSignInWithEmailAndPassword(auth, email, password)
    .then((res) => {
      databaseOnValue(
        databaseRef(database, `users/${res.user.uid}`),
        (data) => {
          if (data.val()) {
            if (data.val().status === 'admin') {
              window.localStorage.setItem('user', JSON.stringify(data.val()))

              dispatchSuccess(dispatch, LOGIN, data.val())
            } else {
              dispatchError(dispatch, LOGIN, 'You are not an admin')
              swal('Error', 'You are not an admin', 'error')
            }
          }
        },
        {
          onlyOnce: true,
        }
      )
    })
    .catch((error) => {
      if (error.code === 'auth/wrong-password') {
        dispatchError(dispatch, LOGIN, "Email and password don't match")
        swal('Error', "Email and password don't match", 'error')
      } else if (error.code === 'auth/user-not-found') {
        dispatchError(dispatch, LOGIN, 'User not found')
        swal('Error', 'User not found', 'error')
      } else {
        dispatchError(dispatch, LOGIN, error.message)
        swal('Error', error.message, 'error')
      }
    })
}

export const checkLogin = (history) => (dispatch) => {
  dispatchLoading(dispatch, CHECK_LOGIN)

  if (window.localStorage.getItem('user')) {
    const user = JSON.parse(window.localStorage.getItem('user'))

    databaseOnValue(
      databaseRef(database, `users/${user.uid}`),
      (data) => {
        if (data.val()) {
          if (data.val().status === 'admin') {
            dispatchSuccess(dispatch, CHECK_LOGIN, data.val())
          } else {
            dispatchError(dispatch, CHECK_LOGIN, 'You are not an admin')
            swal('Error', 'You are not an admin', 'error')
            history.push('/login')
          }
        } else {
          dispatchError(dispatch, CHECK_LOGIN, 'You are not an admin')
          swal('Error', 'You are not an admin', 'error')
          history.push('/login')
        }
      },
      {
        onlyOnce: true,
      }
    )
  } else {
    dispatchError(dispatch, CHECK_LOGIN, 'Please login first')
    history.push('/login')
  }
}

export const logout = () => (dispatch) => {
  dispatchLoading(dispatch, LOGOUT)

  authSignOut(auth)
    .then((res) => {
      window.localStorage.removeItem('user')
      dispatchSuccess(dispatch, LOGOUT, res)
    })
    .catch((error) => {
      dispatchError(dispatch, LOGOUT, error.message)
      swal('Error', error.message, 'error')
    })
}
