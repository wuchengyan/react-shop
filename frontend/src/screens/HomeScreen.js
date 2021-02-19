import React,{useEffect} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import Product from '../components/Product';
import {Row,Col} from 'react-bootstrap';
import {listProducts} from '../actions/productActions';
import Loader from '../components/Loader';
import Message from '../components/Message';


const HomeScreen = () => {
  const dispatch = useDispatch();
  const productList = useSelector(state => state.productList)
  const {loading,errors,products} = productList;

  useEffect(() =>{
   dispatch(listProducts())
  },[dispatch]);


  return (
    <>
      <h1>最新产品</h1>
      {loading ? (<Loader />) : errors ? (<Message variant='danger'>{errors}</Message>) : (
         <Row>
       {
        products.map(product => (
          <Col key={product._id} sm={12} xl={4} md={6} lg={3}>
            <Product product={product} />
          </Col>
        ))
       }
      </Row>
      )}
     
    </>
  )
}

export default HomeScreen
