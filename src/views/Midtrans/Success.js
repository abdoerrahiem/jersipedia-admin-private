import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Col,
  Row,
  Card,
  CardHeader,
  CardBody,
  Button,
  Spinner,
} from 'reactstrap'

import { updateOrder } from '../../store/actions'
import Logo from '../../assets/img/logoUtama.svg'

export default function Success() {
  const [order_id, setOrder_id] = useState('')
  const [transaction_status, setTransaction_status] = useState('')

  const dispatch = useDispatch()
  const { updateOrderFail, updateOrderLoading } = useSelector(
    (state) => state.orderReducer
  )

  useEffect(() => {
    const search = window.location.search
    const params = new URLSearchParams(search)
    const order_id = params.get('order_id')
    const transaction_status = params.get('transaction_status')

    if (order_id) {
      setOrder_id(order_id)
      setTransaction_status(transaction_status)

      dispatch(updateOrder(order_id, transaction_status))
    }
  }, [dispatch])

  const toHistory = () => window.ReactNativeWebView.postMessage('Success')

  return (
    <Row className='justify-content-center mt-5'>
      {updateOrderLoading ? (
        <Spinner color='primary' />
      ) : updateOrderFail ? (
        <Col md='4' className='mt-5'>
          <img src={Logo} className='rounded mx-auto d-block' alt='logo' />
          <Card>
            <CardHeader tag='h4' align='center'>
              Opps!!!
            </CardHeader>
            <CardBody className='text-center'>
              <p>We can not find what your order</p>
            </CardBody>
          </Card>
        </Col>
      ) : (
        <Col md='4' className='mt-5'>
          <img src={Logo} className='rounded mx-auto d-block' alt='logo' />
          <Card>
            <CardHeader tag='h4' align='center'>
              Congrats! Transaction Success
            </CardHeader>
            <CardBody className='text-center'>
              <p>
                {transaction_status === 'pending' &&
                  'Next, please finish your payment and update your payment history after that'}
              </p>

              <p>ORDER ID : {order_id}</p>
              <p>
                TRANSACTION STATUS :{' '}
                {transaction_status === 'settlement' ||
                transaction_status === 'capture'
                  ? 'LUNAS'
                  : transaction_status}
              </p>

              <Button color='primary' type='submit' onClick={() => toHistory()}>
                Continue
              </Button>
            </CardBody>
          </Card>
        </Col>
      )}
    </Row>
  )
}
