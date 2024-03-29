import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {Link, useParams, useNavigate} from 'react-router-dom'
import {Form, Button} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import {listProductDetails, updateProduct} from '../actions/productActions'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'


const ProductEditScreen = () => {
   
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState('')
    const [description, setDescription] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [uploading, setUploading] = useState(false)

    const params = useParams()
    const productId = params.id
    const navigate = useNavigate()
    console.log(params.id)


    const dispatch = useDispatch()

    
  

    const productDetails = useSelector(state => state.productDetails)
    const {loading, error, product} = productDetails
    
    const productUpdate = useSelector(state => state.productUpdate)
    const {loading: loadingUpdate, error: errorUpdate, success: successUpdate} = productUpdate
   

    useEffect(() =>  {
        if(successUpdate) {
            dispatch({type: PRODUCT_UPDATE_RESET})
            navigate('/admin/productlist')
        }else{
            if(!product.name || product._id !== productId){
                dispatch(listProductDetails(productId))
              }else{
                  setName(product.name)
                  setPrice(product.price)
                  setImage(product.image)
                  setDescription(product.description)
                  setCountInStock(product.countInStock)
              }}
        } , [product, dispatch, productId, navigate, successUpdate])

        const uploadFileHandler = async (e) => {
            const file = e.target.files[0]
            const formData = new FormData()
            formData.append('image', file)
            setUploading(true)

            try {
                const config = {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
                const {data} = await axios.post('/api/upload', formData, config)
                setImage(data)
                setUploading(false)
            }catch (error) {
                console.error(error)
                setUploading(false)
            }
        }


    const submitHandler  = (e) => {
        e.preventDefault()
        dispatch(updateProduct({
            _id: productId, 
            name, price, image, description, countInStock
        }))
}




    return (
        <>
        <Link to='/admin/productlist' className='btn btn-light my-3'>
            Go Back</Link>
        <FormContainer>
            <h1>Edit Product</h1>
            {loadingUpdate && <Loader />}
            {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
            {loading ? (<Loader /> ) : error ? (<Message variant='danger'>{error}</Message>) : (
  <Form onSubmit={submitHandler}>
  <Form.Group controlId='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control type='name'
           placeholder='Enter Name'
            value={name}
             onChange={(e) => setName(e.target.value)}>
             </Form.Control>
      </Form.Group>
      <Form.Group controlId='price'
       className='my-3'>
          <Form.Label>Price</Form.Label>
          <Form.Control type='number'
           placeholder='Enter Price'
            value={price}
             onChange={(e) => setPrice(e.target.value)}>
             </Form.Control>
      </Form.Group>
      <Form.Group controlId='formfileMultiple'
       className='my-3'>
      <Form.Label>Image</Form.Label>
          <Form.Control type='text'
            placeholder='Enter Image URL'
             value={image}
              onChange={(e) => setImage(e.target.value)}>
              </Form.Control>
              <Form.Control  type='file' accept="image/jpg, image/jpeg, image/png" label="choose file" multiple='true' onChange={uploadFileHandler}> 
              </Form.Control>
              {uploading && <Loader />}
      </Form.Group>
      <Form.Group controlId='description' className='my-3'>
      <Form.Label>Description</Form.Label>
          <Form.Control type='text' 
           placeholder='Enter Description'
            value={description} onChange={(e) => setDescription(e.target.value)}>
            </Form.Control>
      </Form.Group>
      <Form.Group controlId='countInStock'
       className='my-3'>
      <Form.Label>Count In Stock</Form.Label>
          <Form.Control type='number'
            placeholder='Enter Count In Stock'
             value={countInStock}
              onChange={(e) => setCountInStock(e.target.value)}>
              </Form.Control>
      </Form.Group>
      <Button type="submit" variant="primary">Update</Button>
  </Form>
            )}
        </FormContainer>
        </>
    )
}

export default ProductEditScreen