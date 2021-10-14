import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Col,
  Row,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Label,
  Input,
  Button,
  Spinner,
} from 'reactstrap'
import swal from 'sweetalert'

import { login } from '../store/actions'
import Logo from '../assets/img/logoUtama.svg'

export default function Login({ history }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const { loginLoading, user } = useSelector((state) => state.authReducer)

  useEffect(() => {
    if (user) {
      history.push('/admin/dashboard')
    }
  }, [user, history])

  const handleSubmit = (event) => {
    event.preventDefault()

    if (email && password) {
      dispatch(login(email, password))
    } else {
      swal('Error', 'Email and password are required', 'error')
    }
  }

  return (
    <Row className='justify-content-center mt-5'>
      <Col md='4' className='mt-5'>
        <img src={Logo} className='rounded mx-auto d-block' alt='logo' />
        <Card>
          <CardHeader tag='h4'>Login</CardHeader>
          <CardBody>
            <form onSubmit={(event) => handleSubmit(event)}>
              <FormGroup>
                <Label for='email'>Email Address</Label>
                <Input
                  type='email'
                  name='email'
                  value={email}
                  placeholder='Enter Email'
                  onChange={(event) => setEmail(event.target.value)}
                />
              </FormGroup>

              <FormGroup>
                <Label for='password'>Password</Label>
                <Input
                  type='password'
                  name='password'
                  value={password}
                  placeholder='Enter Password'
                  onChange={(event) => setPassword(event.target.value)}
                />
              </FormGroup>

              {loginLoading ? (
                <Button color='primary' type='submit' disabled>
                  <Spinner size='sm' color='light' /> Loading
                </Button>
              ) : (
                <Button color='primary' type='submi'>
                  Login
                </Button>
              )}
            </form>
          </CardBody>
        </Card>
      </Col>
    </Row>
  )
}
