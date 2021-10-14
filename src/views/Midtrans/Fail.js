import React from 'react'
import { Col, Row, Card, CardHeader, CardBody } from 'reactstrap'

import Logo from '../../assets/img/logoUtama.svg'

export default function Fail() {
  const search = window.location.search
  const params = new URLSearchParams(search)
  const order_id = params.get('order_id')
  const transaction_status = params.get('transaction_status')

  return (
    <Row className='justify-content-center mt-5'>
      <Col md='4' className='mt-5'>
        <img src={Logo} className='rounded mx-auto d-block' alt='logo' />
        <Card>
          <CardHeader tag='h4' align='center'>
            Sorry, Your transaction is failed due to some reasons. Please try
            again!
          </CardHeader>
          <CardBody className='text-center'>
            <p>ORDER ID : {order_id}</p>
            <p>TRANSACTION STATUS : {transaction_status}</p>

            {/* <Button color='primary' type='submit'>
              Lanjutkan
            </Button> */}
          </CardBody>
        </Card>
      </Col>
    </Row>
  )
}
