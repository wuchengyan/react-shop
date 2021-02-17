import React,{useState,useEffect} from 'react';
import Product from '../components/Product';
import {Row,Col} from 'react-bootstrap';
import axios from 'axios';

const HomeScreen = () => {

  const [products,setProducts] = useState([]);

  useEffect(() =>{
    const fetchProducts = async () => {
      const {data} = await axios.get('/api/products');
      setProducts(data);
    }
    fetchProducts();
  },[products]);

  return (
    <>
      <h1>最新产品</h1>
      <Row>
       {
        products.map(product => (
          <Col key={product._id} sm={12} xl={4} md={6} lg={3}>
            <Product product={product} />
          </Col>
        ))
       }
      </Row>
    </>
  )
}

export default HomeScreen
