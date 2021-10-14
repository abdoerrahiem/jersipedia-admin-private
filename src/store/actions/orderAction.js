import { GET_ORDERS, UPDATE_ORDER } from '../types'
import {
  database,
  databaseRef,
  databaseOnValue,
  databaseUpdate,
  dispatchLoading,
  dispatchSuccess,
  dispatchError,
} from '../../utils'

export const getOrders = () => (dispatch) => {
  dispatchLoading(dispatch, GET_ORDERS)

  databaseOnValue(
    databaseRef(database, 'histories'),
    (res) => {
      const data = res.val()

      dispatchSuccess(dispatch, GET_ORDERS, data)
    },
    {
      onlyOnce: true,
    }
  )
}

export const updateOrder = (order_id, transaction_status) => (dispatch) => {
  dispatchLoading(dispatch, UPDATE_ORDER)

  databaseOnValue(
    databaseRef(database, `histories/${order_id}`),
    (res) => {
      const data = res.val()

      if (data) {
        const status =
          transaction_status === 'settlement' ||
          transaction_status === 'capture'
            ? 'lunas'
            : transaction_status

        const newData = { ...data }
        newData.status = status

        const updates = {}
        updates[`/histories/${order_id}`] = newData

        databaseUpdate(databaseRef(database), updates)
          .then((data) => dispatchSuccess(dispatch, UPDATE_ORDER, data ?? []))
          .catch((error) => dispatchError(dispatch, UPDATE_ORDER, error))
      } else {
        dispatchError(dispatch, UPDATE_ORDER, 'History not found')
      }
    },
    {
      onlyOnce: true,
    }
  )
}
