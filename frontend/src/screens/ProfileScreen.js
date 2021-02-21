import React,{useState,useEffect} from 'react'
import {Form,Button,Row,Col} from 'react-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {getUserDetails} from '../actions/userActions'

const ProfileScreen = ({location,history}) => {
  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [confirmPassword,setConfirmPassword] = useState('')
  const [message,setMessage] = useState(null)
  const dispatch = useDispatch()

  const userDetails = useSelector(state => state.userDetails)
  const {loading,errors,user} = userDetails
  const userLogin = useSelector(state => state.userLogin)
  const {userInfo} = userLogin

  console.log(userInfo)


   useEffect(() =>{
      if(userInfo){
        history.push('/login')
      }else{
        if(!user.name){
          dispatch(getUserDetails('profile'))
        }else{
          setName(user.name)
          setEmail(user.email)
        }
      }
    },[dispatch,history,userInfo,user])
  //提交函数,更新用户资料
  const submitHandler = (e) => {
    e.preventDefault()
    //dispatch派发update函数
    
  }
 
  return (
   <Row>
     <Col md={3}>
     <h1>个人资料</h1>
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
        <Button type='submit' variant='primary'>更改资料</Button>
      </Form>
     </Col>
     <Col md={9}><h2>我的订单</h2></Col>

   </Row>
  )
}

export default ProfileScreen
