const express = require('express');
const router = express.Router();
const Product = require('../database/Product');
const User = require('../database/User');
const Order = require('../database/Order');
const { logIn, signUp } = require('../database/Auth');
const { protect,checkAdminRole } = require('../MiddleWares/MiddleWares');


router.get('/products', checkAdminRole,protect,Product.getAllproducts);
router.get('/products/:productId',checkAdminRole,protect, Product.getOneProduct);
router.get('/products/category/:category',checkAdminRole,protect, Product.getByCategory);


router.put('/products/:productId', Product.modifyProduct);
router.delete('/products/:productId',Product.removeProduct)
router.post('/products/add',Product.addProduct)


//JWT token
router.get('/users/:role',User.getAllUsers)
router.get('/orders', Order.getAllorders);
router.get('/orders/:orderId', Order.getOrder);
router.put('/orders/:orderId', Order.markOrder);
router.post('/orders/add', Order.addOrder);
// router.get('/orderId',Order.getOrder)
// router.get('/oreders',Order.getAllorders)


router.get('/:userid',User.getOneUser)
router.put('/:userid',User.updateUser)


/// just try 
router.post('/signup',signUp)
router.post('/login',logIn)
module.exports=router