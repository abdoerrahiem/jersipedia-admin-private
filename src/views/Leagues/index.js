import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Table,
  Button,
  Spinner,
} from 'reactstrap'
import swal from 'sweetalert'

import { getLeagues, deleteLeague } from '../../store/actions'
import { CLEAR_LEAGUE_STATE } from '../../store/types'

export default function Leagues() {
  const dispatch = useDispatch()
  const {
    getLeaguesSuccess,
    getLeaguesLoading,
    deleteLeagueSuccess,
    deleteLeagueFail,
  } = useSelector((state) => state.leagueReducer)

  useEffect(() => {
    dispatch(getLeagues())
  }, [dispatch])

  useEffect(() => {
    if (deleteLeagueSuccess) {
      swal('Success', 'League deleted', 'success')
      dispatch({ type: CLEAR_LEAGUE_STATE })
      dispatch(getLeagues())
    }
  }, [deleteLeagueSuccess, dispatch])

  const handleRemove = (image, id) => dispatch(deleteLeague(image, id))

  console.log(deleteLeagueFail)

  return (
    <div className='content'>
      <Row>
        <Col md='12'>
          <Card>
            <CardHeader>
              <CardTitle tag='h4'>Master League</CardTitle>
              <Link
                to='/admin/leagues/add'
                className='btn btn-primary float-right'
              >
                <i className='nc-icon nc-simple-add'></i> Add League
              </Link>
            </CardHeader>
            <CardBody>
              <Table>
                <thead className='text-primary'>
                  <tr>
                    <th>Logo</th>
                    <th>League Name</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {getLeaguesSuccess ? (
                    Object.keys(getLeaguesSuccess).map((key) => (
                      <tr key={key}>
                        <td>
                          <img
                            src={getLeaguesSuccess[key].image}
                            width='100'
                            alt={getLeaguesSuccess[key].namaLiga}
                          />
                        </td>
                        <td>{getLeaguesSuccess[key].namaLiga}</td>
                        <td>
                          <Link
                            className='btn btn-warning'
                            to={'/admin/leagues/edit/' + key}
                          >
                            <i className='nc-icon nc-ruler-pencil'></i> Edit
                          </Link>

                          <Button
                            color='danger'
                            className='ml-2'
                            onClick={() =>
                              handleRemove(getLeaguesSuccess[key].image, key)
                            }
                          >
                            <i className='nc-icon nc-basket'></i>
                            <span>Delete</span>
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : getLeaguesLoading ? (
                    <tr>
                      <td colSpan='3' align='center'>
                        <Spinner color='primary' />
                      </td>
                    </tr>
                  ) : (
                    <tr>
                      <td colSpan='3' align='center'>
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
