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
import { addLeague } from '../../store/actions'
import { CLEAR_LEAGUE_STATE } from '../../store/types'

export default function AddLeague({ history }) {
  const [state, setState] = useState({
    image: DefaultImage,
    imageToDB: null,
    namaLiga: '',
  })

  const dispatch = useDispatch()
  const { addLeagueSuccess, addLeagueLoading } = useSelector(
    (state) => state.leagueReducer
  )

  useEffect(() => {
    if (addLeagueSuccess) {
      swal('Success', 'League created', 'success')
      dispatch({ type: CLEAR_LEAGUE_STATE })
      history.push('/admin/leagues')
    }
  }, [addLeagueSuccess, dispatch, history])

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

    if (state.imageToDB && state.namaLiga) {
      dispatch(addLeague(state))
    } else {
      swal(
        'Something Wrong!!!',
        "League name and it's logo are required ",
        'error'
      )
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
                    {addLeagueLoading ? (
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
