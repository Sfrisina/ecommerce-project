import asyncHandler from 'express-async-handler'
import Product from '../models/Product.js'


// returns all products 
const getProducts = asyncHandler(async(creq, res) => {
const products = await Product.find({})

res.json(products)
})


// returns 1 specific product
const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if(product) {
        res.json(product)
    }else{
        res.status(404)
        throw new Error('Product not found')
    }
})

export {getProductById, getProducts}