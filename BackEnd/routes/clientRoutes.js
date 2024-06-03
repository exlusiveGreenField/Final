const express = require('express');
const router = express.Router();
const Product = require('../database/Product');
const User = require('../database/User');
const Order = require('../database/Order');
const { logIn, signUp } = require('../database/Auth');
const {
  validiSeller,
  protect,
  checkAdminRole,
} = require('../MiddleWares/MiddleWares');

router.get('/products', Product.getAllproducts);
router.get('/products/FS', Product.getTopStockProducts);
router.get('/products/:productId', Product.getOneProduct);
router.get('/products/category/:category', Product.getByCategory);

router.post('/order', protect, Order.addOrder);

router.get('/get/:userid',User.getOneUser);
router.put('/up/:userid', protect, User.updateUser);


router.post('/signup', validiSeller, signUp);
router.post('/login', logIn);

module.exports = router;


