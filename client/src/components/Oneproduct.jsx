import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Grid,
  Typography,
  Rating,
  Divider,
  Button,
  IconButton,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import UndoIcon from "@mui/icons-material/Undo";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { jwtDecode } from "jwt-decode";
import Swal from "sweetalert2";

function One() {
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const location = useLocation();
  const navigate = useNavigate(); 
  const [userId, setUserId] = useState(null)
  const productId = location.state.productId;

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      setUserId(decoded.id);
    
    }
  }, []);
  useEffect(() => {
    if (productId) {
      axios
        .get(`http://localhost:5000/Client/products/${productId}`)
        .then((response) => {
          setProduct(response.data);
        })
        .catch((error) => {
          console.error("There was an error fetching the product!", error);
        });
    }
  }, [productId]);

  const PlusMinus = (increment) => {
    increment ? setQuantity(quantity + increment) : setQuantity(quantity + increment);
  };

  const addToCart = () => {
    let cartItems = JSON.parse(localStorage.getItem('Items')) || [];
    const existingItem = cartItems.find(item => item.id === product.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cartItems.push({ ...product, quantity: 1 });
    }
    localStorage.setItem('Items', JSON.stringify(cartItems));
    navigate("/cart"); 
  };
  const addToWishlist = async (e, product) => {
    e.stopPropagation();

    if (userId) {
      try {
        await axios.post("http://localhost:5000/Client/wishlist/add", { userId:userId, productId: product.id });

        Swal.fire({
          icon: 'success',
          title: 'Added to wishlist',
          text: `${product.name} has been added to your wishlist!`,
          showConfirmButton: false,
          timer: 1500
        });
      } catch (error) {
        console.error("Error adding to wishlist:", error);
        let errorMessage = 'There was an error adding the item to your wishlist.';
        if (error.response && error.response.data  === "Item is already in the wishlist") {
          errorMessage = 'Item is already in your wishlist.';
        }
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: errorMessage,
          showConfirmButton: false,
          timer: 1500
        });
      }
    } else {
      navigate('/signup');
    }
  };
  return (
    <div className="App">
      <Navbar />
      <Box sx={{ width: "90%", margin: "0 auto", mt: 4,mr: 2}}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <img
              src={product.picture}
              alt={product.name}
              style={{ width: "70%", height: "auto" }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
              {product.name}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
             
              <Typography variant="body1" sx={{ mr: 2 ,color:'green'}}>
                {product.stock ? "In Stock" : "Out of Stock"}
              </Typography>
            </Box>
            <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
              ${product.price}
            </Typography>
            <Typography variant="body1" component="p" sx={{ mb: 2 }}>
              {product.description}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <IconButton
                onClick={() => PlusMinus(-1)}
                disabled={quantity === 1}
              >
                <RemoveIcon />
              </IconButton>
              <TextField
                value={quantity}
                inputProps={{ style: { textAlign: "center" } }}
                sx={{ width: 50, mx: 1, p: 0.5 }} 
              />
              <IconButton onClick={() => PlusMinus(1)}>
                <AddIcon />
              </IconButton>
              <Button
                variant="contained"
                color="primary"
                sx={{
                  ml: 2,
                  p:2,
                  backgroundColor: "red",
                  width: "200px",
                  "&:hover": {
                    backgroundColor: "darkred",
                  },
                }}
                onClick={addToCart}
              >
                Buy Now
              </Button>
              <Box
                sx={{
                  border: "1px solid #ccc",
                  borderRadius: 1,
                  p: 1.5, 
                  ml: 1.5,
                }}
                onClick={(e)=>addToWishlist(e,product)} 
              >
                <FavoriteBorderIcon/>
              </Box>
            </Box>
            <Box
              sx={{
                maxWidth: 400,
                border: "1px solid #ccc",
                borderRadius: 2,
                padding: 2,
                mt: 2,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <LocalShippingIcon sx={{ mr: 1 }} />
                <Typography>Free Delivery</Typography>
              </Box>
              <Typography variant="body2" sx={{ mb: 2 }}>
                Enter your postal code for Delivery Availability
              </Typography>
              <Divider />
              <Box sx={{ display: "flex", alignItems: "center", mt: 2, mb: 1 }}>
                <UndoIcon sx={{ mr: 1 }} />
                <Typography>Return Delivery</Typography>
              </Box>
              <Typography variant="body2">
                Free 30 Days Delivery Returns. Details
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <hr width="90%" />
    </div>
  );
}

export default One;
