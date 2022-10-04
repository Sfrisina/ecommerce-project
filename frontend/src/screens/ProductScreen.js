import React, { useState, useEffect} from 'react'
import { Link, useParams } from 'react-router-dom'
import {useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {Row, Col, Image, ListGroup, ListGroupItem, Card, Button } from 'react-bootstrap'
import { listProductDetails } from '../actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'


 const ProductScreen = () => {
    const navigate = useNavigate()
    const [qty, setQty] = useState(0);
    const params = useParams()
    const dispatch = useDispatch()

    

    const productDetails = useSelector((state) => state.productDetails)
    // console.log(productDetails)

    const { loading, error, product } = productDetails
    // console.log(product)

   

    useEffect(() => {
        dispatch(listProductDetails(params.id))
    }, [dispatch, params])

   


    return (
      <>
        <Link className='btn btn-primary my-3' to={'/'}>
          Go Back
        </Link>
        {loading ? (<Loader />) : error ? (<Message variant='danger'>{error}</Message>): (
     <Row>
         <Col md={6}>
             <Image src={product.image} alt ={product.name} fluid />
         </Col>
         <Col md={3}>
             <ListGroup variant='flush'>
                 <ListGroup.Item>
                     <h3>{product.name}</h3>
                 </ListGroup.Item>
                <ListGroup.Item>
                    Price: ${product.price}
                </ListGroup.Item>
                <ListGroup.Item>
                    Description:   {product.description}
                </ListGroup.Item>
            </ListGroup>
        </Col>
        <Col md={3}>
            <Card>
            <ListGroup variant='flush'>
                <Row>
                    <Col>
                    Price:
                    </Col>
                    <Col>
                    <strong>${product.price}</strong>
                    </Col>
                </Row>
            </ListGroup>
            <ListGroup.Item>
                <Row>
                    <Col>Status:</Col>
                    <Col>
                    {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                    </Col>
                </Row>
            </ListGroup.Item>
            <ListGroup.Item>
                <Button className='btn-block' type='button' disabled={product.countInStock === 0}>Add To Cart</Button>
            </ListGroup.Item>
            </Card>
        </Col>
    </Row>
    )}
    </>
    )
    
}

export default ProductScreen
