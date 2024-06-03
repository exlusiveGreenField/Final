const express = require('express');
const router = express.Router();
const Product = require('../database/Product');
const User = require("../database/User");
const wishlist=require('../database/wishList')
const Order=require("../database/Order")
const {logIn,signUp} = require('../database/Auth')

router.get('/products', Product.getAllproducts);
router.get('/products/FS', Product.getTopStockProducts);
router.get('/products/:productId', Product.getOneProduct);
router.get('/products/category/:category',Product.getByCategory)

router.post('/order',Order.addOrder) 

router.get("/wishlist/:userId", wishlist.getWishlistByUserId);
router.post('/wishlist/add',wishlist.addToWishlist)
router.delete("/wishlist/:productId", wishlist.removeFromWishlist);

router.get('/get/:userId',User.getOneUser)
router.put('/up/:userId',User.updateUser)

router.post('/signup',signUp)
router.post('/login',logIn)

module.exports=router