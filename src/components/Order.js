import React from 'react'
import { Row, Col } from 'reactstrap'

import { rupiahFormatter } from '../utils'

export default function Orders({ order }) {
  return (
    <div>
      {Object.keys(order).map((key) => {
        return (
          <Row key={key}>
            <Col md={2}>
              <img
                src={order[key].product.gambar[0]}
                width='200'
                alt={order[key].product.nama}
              />
            </Col>

            <Col md={5}>
              <p>{order[key].product.nama}</p>
              <p>Rp. {rupiahFormatter(order[key].product.harga)}</p>
            </Col>

            <Col md={5}>
              <p>Pesan : {order[key].jumlahPesan}</p>
              <p>Total Harga : Rp. {rupiahFormatter(order[key].totalHarga)}</p>
            </Col>
          </Row>
        )
      })}
    </div>
  )
}
