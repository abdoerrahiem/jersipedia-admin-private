import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  FormGroup,
  Input,
  Button,
  Spinner,
} from 'reactstrap'
import swal from 'sweetalert'

import DefaultImage from '../../assets/img/default-image.jpg'
import { getLeague, updateLeague } from '../../store/actions'
import { CLEAR_LEAGUE_STATE } from '../../store/types'

export default function EditLeague({ history, match }) {
  const [state, setState] = useState({
    id: match.params.id,
    imageLama: DefaultImage,
    image: DefaultImage,
    imageToDB: null,
    namaLiga: '',
  })

  const dispatch = useDispatch()
  const { updateLeagueSuccess, updateLeagueLoading, getLeagueSuccess } =
    useSelector((state) => state.leagueReducer)

  useEffect(() => {
    dispatch(getLeague(match.params.id))
  }, [dispatch, match.params.id])

  useEffect(() => {
    if (updateLeagueSuccess) {
      swal('Success', 'League updated', 'success')
      dispatch({ type: CLEAR_LEAGUE_STATE })
      history.push('/admin/leagues')
    }

    if (getLeagueSuccess) {
      setState((oldState) => ({
        ...oldState,
        image: getLeagueSuccess.image,
        namaLiga: getLeagueSuccess.namaLiga,
        imageLama: getLeagueSuccess.image,
      }))
    }
  }, [updateLeagueSuccess, getLeagueSuccess, dispatch, history])

  const handleChange = (event) =>
    setState((oldState) => ({
      ...oldState,
      [event.target.name]: event.target.value,
    }))

  const handleImage = (event) => {
    if (event.target.files[0]) {
      const img = event.target.files[0]
      setState((oldState) => ({
        ...oldState,
        image: URL.createObjectURL(img),
        imageToDB: img,
      }))
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (state.namaLiga) {
      dispatch(updateLeague(state))
    } else {
      swal('Something Wrong!!!', 'League name is required ', 'error')
    }
  }

  return (
    <div className='content'>
      <Row>
        <Col>
          <Link to='/admin/leagues' className='btn btn-primary'>
            Back
          </Link>
        </Col>
      </Row>
      <Row>
        <Col md='12'>
          <Card>
            <CardHeader>
              <CardTitle tag='h4'>Add League</CardTitle>
            </CardHeader>
            <CardBody>
              <Row>
                <Col>
                  <img src={state.image} width='200' alt='Logo Liga' />
                </Col>
              </Row>
              <form onSubmit={(event) => handleSubmit(event)}>
                <Row>
                  <Col md={6}>
                    <FormGroup>
                      <label>League Logo</label>
                      <Input
                        type='file'
                        onChange={(event) => handleImage(event)}
                      />
                    </FormGroup>
                  </Col>

                  <Col md={6}>
                    <FormGroup>
                      <label>League Name</label>
                      <Input
                        type='text'
                        value={state.namaLiga}
                        name='namaLiga'
                        onChange={(event) => handleChange(event)}
                      />
                    </FormGroup>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    {updateLeagueLoading ? (
                      <Button color='primary' type='submit' disabled>
                        <Spinner size='sm' color='light' /> Loading
                      </Button>
                    ) : (
                      <Button color='primary' type='submit'>
                        Submit
                      </Button>
                    )}
                  </Col>
                </Row>
              </form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  )
}
