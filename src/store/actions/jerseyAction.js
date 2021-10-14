import {
  GET_JERSEYS,
  GET_JERSEY,
  ADD_JERSEY,
  UPLOAD_JERSEY,
  UPDATE_JERSEY,
  DELETE_JERSEY,
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

export const getJerseys = () => (dispatch) => {
  dispatchLoading(dispatch, GET_JERSEYS)

  databaseOnValue(
    databaseRef(database, 'jerseys'),
    (res) => {
      const data = res.val()

      dispatchSuccess(dispatch, GET_JERSEYS, data)
    },
    {
      onlyOnce: true,
    }
  )
}

export const getJersey = (id) => (dispatch) => {
  dispatchLoading(dispatch, GET_JERSEY)

  databaseOnValue(
    databaseRef(database, `jerseys/${id}`),
    (res) => {
      const data = res.val()

      dispatchSuccess(dispatch, GET_JERSEY, data)
    },
    {
      onlyOnce: true,
    }
  )
}

export const uploadJersey = (image, imageToDB) => (dispatch) => {
  dispatchLoading(dispatch, UPLOAD_JERSEY)

  const uploadTask = storageUploadBytesResumable(
    storageRef(storage, `jerseys/${new Date().valueOf()}_${image.name}`),
    image,
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
          image: downloadURL,
          imageToDB,
        }

        dispatchSuccess(dispatch, UPLOAD_JERSEY, newData)
      })
    }
  )
}

export const addJersey = (data) => (dispatch) => {
  dispatchLoading(dispatch, ADD_JERSEY)

  const newData = {
    gambar: [data.imageToDB1, data.imageToDB2],
    nama: data.nama,
    harga: data.harga,
    berat: data.berat,
    jenis: data.jenis,
    ready: data.ready,
    ukuran: data.ukuranSelected,
    liga: data.liga,
  }

  const key = databasePush(databaseChild(databaseRef(database), 'ligas')).key

  const updates = {}
  updates[`/jerseys/${key}`] = newData

  databaseUpdate(databaseRef(database), updates)
    .then((data) => dispatchSuccess(dispatch, ADD_JERSEY, data ?? []))
    .catch((error) => dispatchError(dispatch, ADD_JERSEY, error))
}

export const updateJersey = (data) => (dispatch) => {
  dispatchLoading(dispatch, UPDATE_JERSEY)

  const newData = {
    gambar: [
      data.imageToDB1 ? data.imageToDB1 : data.imageLama1,
      data.imageToDB2 ? data.imageToDB2 : data.imageLama2,
    ],
    nama: data.nama,
    harga: data.harga,
    berat: data.berat,
    jenis: data.jenis,
    ready: data.ready,
    ukuran: data.ukuranSelected,
    liga: data.liga,
  }

  const updates = {}
  updates[`/jerseys/${data.id}`] = newData

  databaseUpdate(databaseRef(database), updates)
    .then(() => {
      if (data.imageToDB1) {
        storageDelete(storageRef(storage, data.imageLama1)).catch((error) =>
          dispatchError(dispatch, UPDATE_JERSEY, error)
        )
      }

      if (data.imageToDB2) {
        storageDelete(storageRef(storage, data.imageLama2)).catch((error) =>
          dispatchError(dispatch, UPDATE_JERSEY, error)
        )
      }

      dispatchSuccess(dispatch, UPDATE_JERSEY, 'Jersey updated')
    })
    .catch((error) => dispatchError(dispatch, UPDATE_JERSEY, error))
}

export const deleteJersey = (images, id) => (dispatch) => {
  dispatchLoading(dispatch, DELETE_JERSEY)

  storageDelete(storageRef(storage, images[0]))
    .then(() => {
      storageDelete(storageRef(storage, images[1]))
        .then(() => {
          databaseRemove(databaseRef(database, `jerseys/${id}`))
            .then(() =>
              dispatchSuccess(dispatch, DELETE_JERSEY, 'Jersey deleted')
            )
            .catch((error) => dispatchError(dispatch, DELETE_JERSEY, error))
        })
        .catch((error) => dispatchError(dispatch, DELETE_JERSEY, error))
    })
    .catch((error) => dispatchError(dispatch, DELETE_JERSEY, error))
}
