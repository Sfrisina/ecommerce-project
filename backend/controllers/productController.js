import asyncHandler from 'express-async-handler'
import Product from '../models/Product.js'


// returns all products 
const getProducts = asyncHandler(async(req, res) => {
    const pageSize = 8
    const page = Number(req.query.pageNumber) || 1
const keyword = req.query.keyword ? {
    name: {
        $regex: req.query.keyword,
        $options: 'i',
    },
} : {}

const count = await Product.count({...keyword})
const products = await Product.find({...keyword}).limit(pageSize).skip(pageSize * (page - 1))

res.json({products, page, pages: Math.ceil(count / pageSize)})
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


//deletes 1 product - admin only
const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if(product) {
        await product.remove()
        res.json({message: 'Product deleted'})
    }else{
        res.status(404)
        throw new Error('Product not found')
    }
})

//POST create product
const createProduct = asyncHandler(async (req, res) => {
 const product = new Product ({
    name: 'sample name',
    user: req.user._id,
    price: '0', 
    image: 'enter url',
    countInStock: 0, 
    description: 'sample description'
})

const createdProduct = await product.save()
res.status(201).json(createdProduct)

})

//PUT update product
const updateProduct = asyncHandler(async (req, res) => {
  const {name, price, image, description, countInStock} = req.body

  const product = await Product.findById(req.params.id)

  if(product){
    product.name = name
    product.price = price
    product.image = image
    product.description = description
    product.countInStock = countInStock
    const updatedProduct = await product.save()
    res.json(updatedProduct)
  }else{
    res.status(404)
    throw new Error('Product not found')
  }
   
   
   
   })

export {getProductById, getProducts, deleteProduct, createProduct, updateProduct}