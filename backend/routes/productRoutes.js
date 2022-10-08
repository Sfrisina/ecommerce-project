import express from 'express'
const router = express.Router()
import {getProducts, getProductById} from '../controllers/productController.js'

// returns all products 
router.route('/').get(getProducts)

//returns one product 
router.route('/:id').get(getProductById)


export default router 