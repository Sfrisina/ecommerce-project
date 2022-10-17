import React, { useEffect} from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import {Table, Button} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { useNavigate } from 'react-router-dom'
import { listOrders } from '../actions/orderActions'




const OrderListScreen = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const orderList = useSelector(state => state.orderList)
    const {loading, error, orders} = orderList
   
    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin
   
    const userDelete = useSelector(state => state.userDelete)
    const {success: successDelete} = userDelete

    useEffect(() => {
        if(userInfo && userInfo.isAdmin){
        dispatch(listOrders()) 
    }else{
        navigate('/login')
    }
    }, [dispatch, navigate, userInfo, successDelete])


// const deleteHandler = (id) => {
//     if(window.confirm('Are you sure?')){
//     dispatch(deleteUser(id))
// }}

    return (
        <>
        <h1>Orders</h1>
        {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> 
        : (
            <Table striped bordered hover responsive className='table-sm'>
                <thead>
                    <tr>
                        <th>NAME</th>
                        <th>ID</th>
                        <th>DATE</th>
                        <th>PRICE</th>
                        <th>PAID STATUS</th>
                        <th>DELIVERED STATUS</th>
                        <th>VIEW ORDER</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                        <tr key={order._id}>
                            <td>{order.user && order.user.name}</td>
                            <td>{order._id}</td>
                            <td>{order.createdAt.substring(0,10)}</td>
                            <td>${order.totalPrice.toFixed(2)}</td>
                            <td>{order.isPaid ? (order.paidAt.substring(0, 10)) : (
                                <i className='fas fa-times' style={{color: 'red'}}></i>
                            )}</td>
                            <td>{order.isDelivered ? (order.deliveredAt.substring(0, 10)) : (
                                <i className='fas fa-times' style={{color: 'red'}}></i>
                            )}</td>
                            <td>
                          <LinkContainer to={`/order/${order._id}`}>
                                    <Button variant='primary'  className='btn-sm'>
                                       DETAILS
                                    </Button>
                                </LinkContainer>
                            </td>      
                        </tr>
                    ))}
                </tbody>
            </Table>
            )}
            </>
    )
}

export default OrderListScreen