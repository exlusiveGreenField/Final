const express = require('express');
const router = express.Router();
const Product = require('../database/Product');
 const User = require("../database/User");
// const Order = require('../database/Order');
const { logIn, signUp } = require('../database/Auth');
const {
  protect,
  validiSeller,
  checkAdminRole,
} = require('../MiddleWares/MiddleWares');

router.get('/products', Product.getOneProduct);
router.put('/products/:productId', protect, Product.modifyProduct);
router.delete('/products/category/:category', protect, Product.removeProduct);
router.post('/products/add', protect, Product.addProduct);

//JWT token


router.get('/:userid', User.getOneUser);
router.put('/:userid', protect, User.updateUser);

router.post('/add',Product.addProduct)
router.post('/signup', validiSeller, signUp);
router.post('/login', logIn);
module.exports = router;
