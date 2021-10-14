import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Table,
  Spinner,
} from 'reactstrap'

import { getOrders } from '../store/actions'
import { rupiahFormatter } from '../utils'
import Order from '../components/Order'

export default function Orders() {
  const dispatch = useDispatch()
  const { getOrdersSuccess, getOrdersFail, getOrdersLoading } = useSelector(
    (state) => state.orderReducer
  )

  useEffect(() => {
    dispatch(getOrders())
  }, [dispatch])

  return (
    <div className='content'>
      <Row>
        <Col md='12'>
          <Card>
            <CardHeader>
              <CardTitle tag='h4'>Master Orders</CardTitle>
            </CardHeader>
            <CardBody>
              <Table>
                <thead className='text-primary'>
                  <tr>
                    <th>Date & Order ID</th>
                    <th>Order</th>
                    <th>Status</th>
                    <th>Total Price</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {getOrdersSuccess ? (
                    Object.keys(getOrdersSuccess).map((key) => (
                      <tr key={key}>
                        <td>
                          <p>{getOrdersSuccess[key].tanggal}</p>
                          <p>({getOrdersSuccess[key].order_id})</p>
                        </td>
                        <td>
                          <Order order={getOrdersSuccess[key].orders} />
                        </td>
                        <td>{getOrdersSuccess[key].status}</td>
                        <td align='right'>
                          <p>
                            Total Price : Rp.{' '}
                            {rupiahFormatter(getOrdersSuccess[key].totalHarga)}
                          </p>

                          <p>
                            Ongkir : Rp.{' '}
                            {rupiahFormatter(getOrdersSuccess[key].ongkir)}
                          </p>

                          <p>
                            <strong>
                              Total : Rp.{' '}
                              {rupiahFormatter(
                                getOrdersSuccess[key].totalHarga +
                                  getOrdersSuccess[key].ongkir
                              )}
                            </strong>
                          </p>
                        </td>
                        <td>
                          <a
                            href={getOrdersSuccess[key].url}
                            className='btn btn-primary'
                            target='_blank'
                            rel='noreferrer'
                          >
                            <i className='nc-icon nc-money-coins'></i> Midtrans
                          </a>
                        </td>
                      </tr>
                    ))
                  ) : getOrdersLoading ? (
                    <tr>
                      <td colSpan='6' align='center'>
                        <Spinner color='primary' />
                      </td>
                    </tr>
                  ) : getOrdersFail ? (
                    <tr>
                      <td colSpan='6' align='center'>
                        {getOrdersFail}
                      </td>
                    </tr>
                  ) : (
                    <tr>
                      <td colSpan='6' align='center'>
                        Data Kosong
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  )
}
