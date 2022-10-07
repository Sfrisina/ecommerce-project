import {configureStore} from '@reduxjs/toolkit'
import {combineReducers} from 'redux'
import {productListReducer, productDetailsReducer} from './reducers/productReducers'
import {cartReducer} from './reducers/cartReducer'

const reducer = combineReducers({
    productList: productListReducer, 
    productDetails: productDetailsReducer,
    cart : cartReducer,

})

const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse
(localStorage.getItem('cartItems')) : []

const initialState = {
    cart: {cartItems: cartItemsFromStorage }
}

const store  = configureStore({
    reducer, 
    initialState, 
    devTools: process.env.NODE_ENV !== 'production',
})




export default store