import React,{useEffect,useState} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {Row,Col,Image,ListGroup,Card,Button,Form} from 'react-bootstrap';
import Rating from '../components/Rating';
import {listProductDetails} from '../actions/productActions';
import Loader from '../components/Loader';
import Message from '../components/Message';

const ProductScreen = ({history,match}) => {
  const [qty,setQty] = useState(1);
  const dispatch = useDispatch();
  const productDetails = useSelector(state => state.productDetails);
  const {loading,errors,product} = productDetails;

  useEffect(() =>{
    dispatch(listProductDetails(match.params.id))
  },[dispatch]);

  //添加到购物车事件
  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`)
  }

  return (
    <>
      <Link className='btn btn-dark my-3' to='/'>返回主页</Link>
      {loading ? <Loader /> : errors ? <Message variant='danger'>{errors}</Message> : (
         <Row>
         <Col md={6} ><Image fluid src={product.image} alt={product.name} /></Col>
         <Col md={3} >
           <ListGroup variant='flush'>
             <ListGroup.Item><h3>{product.name}</h3></ListGroup.Item>
             <ListGroup.Item>
               <Rating value={product.rating} text={`${product.numReviews}条评论`}  />
             </ListGroup.Item>
             <ListGroup.Item>价格：￥{product.price}</ListGroup.Item>
             <ListGroup.Item>描述：{product.description}</ListGroup.Item>
           </ListGroup>
         </Col>
         <Col md={3} >
           <Card>
             <ListGroup variant='flush'>
               <ListGroup.Item>
                 <Row>
                   <Col>价格:</Col>
                   <Col><strong>￥{product.price}</strong></Col>
                 </Row>
               </ListGroup.Item>
               <ListGroup.Item>
                 <Row>
                   <Col>库存:</Col>
                   <Col>
                     {product.countInStock > 0 ? '有货' : '没货'}
                   </Col>
                 </Row>
               </ListGroup.Item>
               <ListGroup.Item>
                 <Row>
                   <Col>数量</Col>
                   <Col>
                     <Form.Control as='select' value={qty} onChange={(e) => setQty(e.target.value)}>
                        
                        {[...Array(product.countInStock).keys()].map(i => (
                          <option key={i + 1} value={i + 1}>{i + 1}</option>
                        ))}
                     </Form.Control>
                   </Col>
                 </Row>
               </ListGroup.Item>
               <ListGroup.Item>
                 <Button onClick={addToCartHandler} type='button' className='btn-block' disabled={product.countInStock === 0}>添加到购物车</Button>
               </ListGroup.Item>
             </ListGroup>
           </Card>
         </Col>
       </Row>
      )}
    </>
  )
}

export default ProductScreen
