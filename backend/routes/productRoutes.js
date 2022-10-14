import express from 'express'
const router = express.Router()
import {getProducts, getProductById, deleteProduct, createProduct, updateProduct} from '../controllers/productController.js'
import {protect, admin} from '../middleware/authMiddleware.js'

// returns all products 
router.route('/').get(getProducts).post(protect, admin, createProduct)

//returns one product 
router.route('/:id').get(getProductById).delete(protect, admin, deleteProduct).put(protect, admin, updateProduct)



export default router 