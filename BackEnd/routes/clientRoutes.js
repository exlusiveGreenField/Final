const express = require('express');
const router = express.Router();
const Product = require('../database/Product');
const User = require("../database/User");
// const Order = require('../database/Order');
const {logIn,signUp} = require('../database/Auth')

router.get('/products', Product.getAllproducts);
router.get('/products/FS', Product.getTopStockProducts);
router.get('/products/:productId', Product.getOneProduct);
router.get('/products/category/:category',Product.getByCategory)

 
// router.post('/order',Order.addOrder)

// router.get('/user',User.getAllUsers)
router.get('/:userid',User.getOneUser)
router.put('/:userid',User.updateUser)

router.post('/signup',signUp)
router.post('/login',logIn)

module.exports=router