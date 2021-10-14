import {
  GET_LEAGUE,
  GET_LEAGUES,
  ADD_LEAGUE,
  UPDATE_LEAGUE,
  DELETE_LEAGUE,
} from '../types'
import {
  database,
  databaseRef,
  databasePush,
  databaseChild,
  databaseOnValue,
  databaseUpdate,
  databaseRemove,
  storage,
  storageRef,
  storageGetDownloadURL,
  storageUploadBytesResumable,
  storageDelete,
  dispatchLoading,
  dispatchSuccess,
  dispatchError,
} from '../../utils'

export const getLeagues = () => (dispatch) => {
  dispatchLoading(dispatch, GET_LEAGUES)

  databaseOnValue(
    databaseRef(database, 'ligas'),
    (res) => {
      const data = res.val()

      dispatchSuccess(dispatch, GET_LEAGUES, data)
    },
    {
      onlyOnce: true,
    }
  )
}

export const getLeague = (id) => (dispatch) => {
  dispatchLoading(dispatch, GET_LEAGUE)

  databaseOnValue(
    databaseRef(database, `ligas/${id}`),
    (res) => {
      const data = res.val()

      dispatchSuccess(dispatch, GET_LEAGUE, data)
    },
    {
      onlyOnce: true,
    }
  )
}

export const addLeague = (data) => (dispatch) => {
  dispatchLoading(dispatch, ADD_LEAGUE)

  const uploadTask = storageUploadBytesResumable(
    storageRef(
      storage,
      `leagues/${new Date().valueOf()}_${data.imageToDB.name}`
    ),
    data.imageToDB,
    {
      contentType: 'image/jpeg',
    }
  )

  uploadTask.on(
    'state_changed',
    (snapshot) => console.log(snapshot),
    (err) => console.log(err),
    () => {
      storageGetDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        const newData = {
          namaLiga: data.namaLiga,
          image: downloadURL,
        }

        const key = databasePush(
          databaseChild(databaseRef(database), 'ligas')
        ).key

        const updates = {}
        updates[`/ligas/${key}`] = newData

        databaseUpdate(databaseRef(database), updates)
          .then((data) => dispatchSuccess(dispatch, ADD_LEAGUE, data ?? []))
          .catch((error) => dispatchError(dispatch, ADD_LEAGUE, error))
      })
    }
  )
}

export const updateLeague = (data) => (dispatch) => {
  dispatchLoading(dispatch, UPDATE_LEAGUE)

  if (data.imageToDB) {
    storageDelete(storageRef(storage, data.imageLama))
      .then(() => {
        const uploadTask = storageUploadBytesResumable(
          storageRef(
            storage,
            `leagues/${new Date().valueOf()}_${data.imageToDB.name}`
          ),
          data.imageToDB,
          {
            contentType: 'image/jpeg',
          }
        )

        uploadTask.on(
          'state_changed',
          (snapshot) => console.log(snapshot),
          (err) => console.log(err),
          () => {
            storageGetDownloadURL(uploadTask.snapshot.ref).then(
              (downloadURL) => {
                const newData = {
                  namaLiga: data.namaLiga,
                  image: downloadURL,
                }

                const updates = {}
                updates[`/ligas/${data.id}`] = newData

                databaseUpdate(databaseRef(database), updates)
                  .then((data) =>
                    dispatchSuccess(dispatch, UPDATE_LEAGUE, data ?? [])
                  )
                  .catch((error) =>
                    dispatchError(dispatch, UPDATE_LEAGUE, error)
                  )
              }
            )
          }
        )
      })
      .catch((error) => dispatchError(dispatch, UPDATE_LEAGUE, error))
  } else {
    const newData = {
      namaLiga: data.namaLiga,
      image: data.image,
    }

    const updates = {}
    updates[`/ligas/${data.id}`] = newData

    databaseUpdate(databaseRef(database), updates)
      .then((data) => dispatchSuccess(dispatch, UPDATE_LEAGUE, data ?? []))
      .catch((error) => dispatchError(dispatch, UPDATE_LEAGUE, error))
  }
}

export const deleteLeague = (image, id) => (dispatch) => {
  dispatchLoading(dispatch, DELETE_LEAGUE)

  storageDelete(storageRef(storage, image))
    .then(() => {
      databaseRemove(databaseRef(database, `ligas/${id}`))
        .then((res) => dispatchSuccess(dispatch, DELETE_LEAGUE, res ?? []))
        .catch((error) => dispatchError(dispatch, DELETE_LEAGUE, error))
    })
    .catch((error) => dispatchError(dispatch, DELETE_LEAGUE, error))
}
