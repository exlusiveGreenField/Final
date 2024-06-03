import React, { useEffect, useState } from "react";
import axios from "axios";
import { Grid, Box, Button } from "@mui/material";
import ProductCard from "./ProductCard";
import Navbar from "./Navbar";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [userId, setUserId] = useState(null);
 const navigate=useNavigate()
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      setUserId(decoded.id);
    }
  }, []);

  useEffect(() => {
    const fetchWishlist = async () => {
      if (userId) {
        try {
          const response = await axios.get(
            `http://localhost:5000/Client/wishlist/${userId}`
          );
          setWishlistItems(response.data);
        } catch (error) {
          console.error("Error fetching wishlist items", error);
        }
      }
    };

    fetchWishlist();
  }, [userId,wishlistItems]);

  const moveAllToBag = async () => {
    try {
      const cartItems = JSON.parse(localStorage.getItem('Items')) || [];
      for (const product of wishlistItems) {
        cartItems.push({
          ...product,
          quantity: 1,
          discountedPrice: product.discountedPrice,
          discount: product.discount
        });
      }
      localStorage.setItem('Items', JSON.stringify(cartItems));
      navigate('/cart')
    } catch (error) {
      console.error("Error moving all items to cart", error);
    }
  };

  return (
    <div>
      <Navbar />
      <div style={{ width: "90%", margin: "0 auto" }}>
        <Box sx={{ padding: 3, marginTop: "50px" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Box sx={{ flexGrow: 1 }}>
              <h2>Wishlist</h2>
            </Box>
            <Button
              variant="contained"
              style={{ color: "white", backgroundColor: "red" }}
              onClick={moveAllToBag}
            >
              Move All to Bag
            </Button>
          </Box>
          <Grid container spacing={3}>
            {wishlistItems.map((product) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                <ProductCard product={product} isWishlist={true} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </div>
    </div>
  );
};

export default Wishlist;
