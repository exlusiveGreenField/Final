const express = require('express');
const router = express.Router();
const Product = require('../database/Product');
const User = require('../database/User');
const Order = require('../database/Order');
const { logIn, signUp } = require('../database/Auth');
const { protect } = require('../MiddleWares/MiddleWares');

router.get('/products', Product.getAllproducts);
router.get('/products/:productId', Product.getOneProduct);
router.get('/products/category/:category',Product.getByCategory)
router.put('/products/:productId', Product.modifyProduct);
router.delete('/products/:productId',Product.removeProduct)
router.post('/products/add',Product.addProduct)

//JWT token

router.get('/orders', Order.getAllorders);
router.get('/orders/:orderId', Order.getOrder);
router.put('/orders/:orderId', Order.markOrder);
router.post('/orders/add', Order.addOrder);
// router.get('/orderId',Order.getOrder)
// router.get('/oreders',Order.getAllorders)


/// just try 
router.post('/signup',signUp)
router.post('/login',logIn)
module.exports=router