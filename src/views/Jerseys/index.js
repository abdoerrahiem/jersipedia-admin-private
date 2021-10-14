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
  Button,
} from 'reactstrap'
import { Link } from 'react-router-dom'
import { getJerseys, deleteJersey } from '../../store/actions'
import swal from 'sweetalert'
import { CLEAR_JERSEY_STATE } from '../../store/types'

export default function Jerseys() {
  const dispatch = useDispatch()
  const {
    getJerseysSuccess,
    getJerseysFail,
    getJerseysLoading,

    deleteJerseySuccess,
  } = useSelector((state) => state.jerseyReducer)

  useEffect(() => {
    dispatch(getJerseys())
  }, [dispatch])

  useEffect(() => {
    if (deleteJerseySuccess) {
      swal('Success', 'Jersey deleted', 'success')
      dispatch({ type: CLEAR_JERSEY_STATE })
      dispatch(getJerseys())
    }
  }, [deleteJerseySuccess, dispatch])

  const handleDelete = (images, key) => dispatch(deleteJersey(images, key))

  return (
    <div className='content'>
      <Row>
        <Col md='12'>
          <Card>
            <CardHeader>
              <CardTitle tag='h4'>Master Jersey</CardTitle>
              <Link
                to='/admin/jerseys/add'
                className='btn btn-primary float-right'
              >
                <i className='nc-icon nc-simple-add'></i> Add Jersey
              </Link>
            </CardHeader>
            <CardBody>
              <Table>
                <thead className='text-primary'>
                  <tr>
                    <th>Photo</th>
                    <th>Jersey Name</th>
                    <th>Price</th>
                    <th>Weight</th>
                    <th>Type</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {getJerseysSuccess ? (
                    Object.keys(getJerseysSuccess).map((key) => (
                      <tr key={key}>
                        <td>
                          <img
                            src={getJerseysSuccess[key].gambar[0]}
                            width='100'
                            alt={getJerseysSuccess[key].nama}
                          />
                        </td>
                        <td>{getJerseysSuccess[key].nama}</td>
                        <td>Rp. {getJerseysSuccess[key].harga}</td>
                        <td>{getJerseysSuccess[key].berat} kg</td>
                        <td>{getJerseysSuccess[key].jenis} </td>
                        <td>
                          <Link
                            className='btn btn-warning'
                            to={'/admin/jerseys/edit/' + key}
                          >
                            <i className='nc-icon nc-ruler-pencil'></i> Edit
                          </Link>

                          <Button
                            color='danger'
                            className='ml-2'
                            onClick={() =>
                              handleDelete(getJerseysSuccess[key].gambar, key)
                            }
                          >
                            <i className='nc-icon nc-basket'></i> Hapus
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : getJerseysLoading ? (
                    <tr>
                      <td colSpan='6' align='center'>
                        <Spinner color='primary' />
                      </td>
                    </tr>
                  ) : getJerseysFail ? (
                    <tr>
                      <td colSpan='6' align='center'>
                        {getJerseysFail}
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
