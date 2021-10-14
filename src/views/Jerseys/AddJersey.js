import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  FormGroup,
  Input,
  Label,
  Row,
  Spinner,
} from 'reactstrap'
import swal from 'sweetalert'
import DefaultImage from '../../assets/img/default-image.jpg'
import { addJersey, uploadJersey } from '../../store/actions'
import { getLeagues } from '../../store/actions'
import { CLEAR_JERSEY_STATE } from '../../store/types'

export default function AddJersey({ history }) {
  const [state, setState] = useState({
    image1: DefaultImage,
    image2: DefaultImage,
    imageToDB1: false,
    imageToDB2: false,

    nama: '',
    harga: 0,
    berat: 0,
    jenis: '',
    ukurans: ['S', 'M', 'L', 'XL', 'XXL'],
    ukuranSelected: [],
    ready: true,
    liga: '',
  })

  const dispatch = useDispatch()
  const { getLeaguesSuccess } = useSelector((state) => state.leagueReducer)
  const { uploadJerseySuccess, addJerseySuccess, addJerseyLoading } =
    useSelector((state) => state.jerseyReducer)

  useEffect(() => {
    dispatch(getLeagues())
  }, [dispatch])

  useEffect(() => {
    if (uploadJerseySuccess) {
      setState((oldState) => ({
        ...oldState,
        [uploadJerseySuccess.imageToDB]: uploadJerseySuccess.image,
      }))
      swal('Success', 'Photo uploaded', 'success')
    }

    if (addJerseySuccess) {
      swal('Success', 'Jersey added', 'success')
      history.push('/admin/jerseys')
      dispatch({ type: CLEAR_JERSEY_STATE })
    }
  }, [uploadJerseySuccess, addJerseySuccess, dispatch, history])

  const handleChange = (event) =>
    setState((oldState) => ({
      ...oldState,
      [event.target.name]: event.target.value,
    }))

  const handleCheck = (event) => {
    const checked = event.target.checked
    const value = event.target.value

    if (checked) {
      setState((oldState) => ({
        ...oldState,
        ukuranSelected: [...state.ukuranSelected, value],
      }))
    } else {
      const ukuranBaru = state.ukuranSelected
        .filter((ukuran) => ukuran !== value)
        .map((filterUkuran) => filterUkuran)

      setState((oldState) => ({
        ...oldState,
        ukuranSelected: ukuranBaru,
      }))
    }
  }

  const handleImage = (event, imageToDB) => {
    if (event.target.files[0]) {
      const img = event.target.files[0]
      setState((oldState) => ({
        ...oldState,
        [event.target.name]: URL.createObjectURL(img),
      }))

      dispatch(uploadJersey(img, imageToDB))
    }
  }

  const handleSubmit = (event) => {
    const {
      berat,
      harga,
      nama,
      liga,
      ukuranSelected,
      jenis,
      imageToDB1,
      imageToDB2,
    } = state

    event.preventDefault()

    if (
      nama &&
      liga &&
      harga &&
      berat &&
      ukuranSelected &&
      jenis &&
      imageToDB1 &&
      imageToDB2
    ) {
      dispatch(addJersey(state))
    } else {
      swal('Error', 'All fields are required', 'error')
    }
  }

  const {
    berat,
    harga,
    image1,
    image2,
    imageToDB1,
    imageToDB2,
    jenis,
    liga,
    nama,
    ready,
    ukurans,
  } = state

  return (
    <div className='content'>
      <Row>
        <Col>
          <Link to='/admin/jerseys' className='btn btn-primary'>
            Back
          </Link>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card>
            <CardHeader tag='h4'>Add Jersey</CardHeader>
            <CardBody>
              <form onSubmit={(event) => handleSubmit(event)}>
                <Row>
                  <Col md={6}>
                    <Row>
                      <Col>
                        <img
                          src={image1}
                          width='300'
                          alt='Foto Jersey (Depan)'
                        />
                        <FormGroup>
                          <label>Foto Jersey (Depan)</label>
                          <Input
                            type='file'
                            name='image1'
                            onChange={(event) =>
                              handleImage(event, 'imageToDB1')
                            }
                          />
                        </FormGroup>
                        {image1 !== DefaultImage ? (
                          //selesai upload / proses upload
                          imageToDB1 ? (
                            <p>
                              <i className='nc-icon nc-check-2'></i> Selesai
                              Upload
                            </p>
                          ) : (
                            <p>
                              <i className='nc-icon nc-user-run'></i> Proses
                              Upload
                            </p>
                          )
                        ) : (
                          //belum upload
                          <p>
                            <i className='nc-icon nc-cloud-upload-94'></i> Belum
                            Upload
                          </p>
                        )}
                      </Col>
                      <Col>
                        <img
                          src={image2}
                          width='300'
                          alt='Foto Jersey (Belakang)'
                        />
                        <FormGroup>
                          <label>Foto Jersey (Belakang)</label>
                          <Input
                            type='file'
                            name='image2'
                            onChange={(event) =>
                              handleImage(event, 'imageToDB2')
                            }
                          />
                        </FormGroup>
                        {image2 !== DefaultImage ? (
                          //selesai upload / proses upload
                          imageToDB2 ? (
                            <p>
                              <i className='nc-icon nc-check-2'></i> Selesai
                              Upload
                            </p>
                          ) : (
                            <p>
                              <i className='nc-icon nc-user-run'></i> Proses
                              Upload
                            </p>
                          )
                        ) : (
                          //belum upload
                          <p>
                            <i className='nc-icon nc-cloud-upload-94'></i> Belum
                            Upload
                          </p>
                        )}
                      </Col>
                    </Row>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <label>Nama Jersey</label>
                      <Input
                        type='text'
                        value={nama}
                        name='nama'
                        onChange={(event) => handleChange(event)}
                      />
                    </FormGroup>

                    <Row>
                      <Col md={6}>
                        <FormGroup>
                          <label>Liga</label>
                          <Input
                            type='select'
                            name='liga'
                            value={liga}
                            onChange={(event) => handleChange(event)}
                          >
                            <option value=''>--Pilih--</option>
                            {getLeaguesSuccess &&
                              Object.keys(getLeaguesSuccess).map((key) => (
                                <option value={key} key={key}>
                                  {getLeaguesSuccess[key].namaLiga}
                                </option>
                              ))}
                          </Input>
                        </FormGroup>
                      </Col>
                      <Col md={6}>
                        <FormGroup>
                          <label>Harga (Rp.)</label>
                          <Input
                            type='number'
                            value={harga}
                            name='harga'
                            onChange={(event) => handleChange(event)}
                          />
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Col md={6}>
                        <FormGroup>
                          <label>Berat (kg)</label>
                          <Input
                            type='number'
                            value={berat}
                            name='berat'
                            onChange={(event) => handleChange(event)}
                          />
                        </FormGroup>
                      </Col>
                      <Col md={6}>
                        <FormGroup>
                          <label>Jenis</label>
                          <Input
                            type='text'
                            value={jenis}
                            name='jenis'
                            onChange={(event) => handleChange(event)}
                          />
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Col md={6}>
                        <label>Ukuran</label>
                        <FormGroup check>
                          {ukurans.map((ukuran, index) => (
                            <Label key={index} check className='mr-2'>
                              <Input
                                type='checkbox'
                                value={ukuran}
                                onChange={(event) => handleCheck(event)}
                              />
                              {ukuran}
                              <span className='form-check-sign'>
                                <span className='check'></span>
                              </span>
                            </Label>
                          ))}
                        </FormGroup>
                      </Col>
                      <Col md={6}>
                        <FormGroup>
                          <label>Ready</label>
                          <Input
                            type='select'
                            name='ready'
                            value={ready}
                            onChange={(event) => handleChange(event)}
                          >
                            <option value={true}>Ada</option>
                            <option value={false}>Kosong</option>
                          </Input>
                        </FormGroup>
                      </Col>
                    </Row>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    {addJerseyLoading ? (
                      <Button
                        type='submit'
                        color='primary'
                        className='float-right'
                        disabled
                      >
                        <Spinner size='sm' color='light' /> Loading . . .
                      </Button>
                    ) : (
                      <Button
                        type='submit'
                        color='primary'
                        className='float-right'
                      >
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
