import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Form,Button,Row,Col} from 'react-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {register} from '../actions/userActions'
import FormContainer from '../components/FormContainer'

const RegisterScreen = ({location,history}) => {
  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [confirmPassword,setConfirmPassword] = useState('')
  const [message,setMessage] = useState(null)
  const dispatch = useDispatch()

  const userRegister = useSelector(state => state.userRegister)

  const {loading,errors,userInfo} = userRegister
  const redirect = location.search ? location.search.split('=')[1] : '/'

   useEffect(() =>{
      if(userInfo){
        history.push(redirect)
      }
    },[history,userInfo,redirect])
  //提交函数
  const submitHandler = (e) => {
    e.preventDefault()
    //dispatch派发register函数
    if(password !== confirmPassword){
      setMessage('密码不匹配')
    }else{
      dispatch(register(name,email,password))
    }
  }
 
  return (
    <FormContainer>
      <h1>注册</h1>
      {message && <Message variant='danger'>{message}</Message>}
      {errors && <Message variant="danger">{errors}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
      <Form.Group controlId='name'>
          <Form.Label>姓名：</Form.Label>
          <Form.Control
          value={name}
          onChange={(e) => setName(e.target.value)}
          type='name' placeholder='请输入姓名'>

          </Form.Control>
        </Form.Group>
        <Form.Group controlId='email'>
          <Form.Label>邮箱地址：</Form.Label>
          <Form.Control
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type='email' placeholder='请输入邮箱'>

          </Form.Control>
        </Form.Group>
        <Form.Group controlId='password'>
          <Form.Label>密码：</Form.Label>
          <Form.Control
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type='password' placeholder='请输入密码'>

          </Form.Control>
        </Form.Group>
        <Form.Group controlId='confirmPassword'>
          <Form.Label>密码：</Form.Label>
          <Form.Control
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          type='password' placeholder='请确认密码'>

          </Form.Control>
        </Form.Group>
        <Button type='submit' variant='primary'>注册</Button>
      </Form>
      <Row className='py-3'>
        <Col>
        已有账户?<Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>去登录</Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default RegisterScreen
