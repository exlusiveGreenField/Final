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

//JWT token

// router.get('/orderId',Order.getOrder)
// router.get('/oreders',Order.getAllorders)

router.get('/:userid',User.getOneUser)
router.put('/:userid',User.updateUser)

router.post('/signup', signUp);
router.post('/login', logIn);
module.exports = router;
