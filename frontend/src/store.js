import {configureStore} from '@reduxjs/toolkit'
import {combineReducers} from 'redux'
import {productListReducer, productDetailsReducer, productDeleteReducer, productCreateReducer, productUpdateReducer} from './reducers/productReducers'
import {cartReducer} from './reducers/cartReducer'
import {userLoginReducer, userRegisterReducer, userDetailsReducer, userUpdateProfileReducer, userListReducer, userDeleteReducer, userUpdateReducer} from './reducers/userReducers'
import { orderCreateReducer, orderDetailsReducer, orderPayReducer, orderListMyReducer, orderListReducer, orderDeliverReducer } from './reducers/orderReducers'


const reducer = combineReducers({
    productList: productListReducer, 
    productDetails: productDetailsReducer,
    cart : cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer, 
    userUpdateProfile: userUpdateProfileReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderListMy: orderListMyReducer,
    orderList: orderListReducer,
    userList: userListReducer, 
    userDelete: userDeleteReducer,
    userUpdate: userUpdateReducer,
    productDelete: productDeleteReducer, 
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer, 
    orderDeliver: orderDeliverReducer

})

const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse
(localStorage.getItem('cartItems')) : []

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse
(localStorage.getItem('userInfo')) : null

const shippinAddressFromStorage = localStorage.getItem('shippingAddress') ? JSON.parse
(localStorage.getItem('shippingAddress')) : {}



const initialState = {
    cart: {cartItems: cartItemsFromStorage ,
    shippingAddress: shippinAddressFromStorage},
    userLogin: {userInfo: userInfoFromStorage}
}

const store  = configureStore({
    reducer, 
    preloadedState:initialState, 
    devTools: process.env.NODE_ENV !== 'production',
})




export default store