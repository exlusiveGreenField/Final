import React, { useState } from "react";
import Swal from "sweetalert2";
import {
  Card,
  CardContent,
  Typography,
  Button,
  IconButton,
  Box,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const ProductCard = ({ product, onClick }) => {
  const [AddToCart, setAddToCart] = useState(false);

  const MouseHover = () => {
    setAddToCart(!AddToCart);
  };

  const addToCart = (e, product) => {
    e.stopPropagation();
    let cartItems = JSON.parse(localStorage.getItem('Items')) || [];
    const existingItem = cartItems.find(item => item.id === product.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cartItems.push({ 
        ...product, 
        quantity: 1,
        discountedPrice: product.discountedPrice,
        discount: product.discount
      });
    }
    localStorage.setItem('Items', JSON.stringify(cartItems));

    Swal.fire({
      icon: 'success',
      title: 'Added to cart',
      text: `${product.name} has been added to your cart!`,
      showConfirmButton: false,
      timer: 1500
    });
  };

  return (
    <Card
      onClick={onClick}
      onMouseEnter={MouseHover}
      onMouseLeave={MouseHover}
      sx={{ position: "relative", maxWidth: "340px", cursor: "pointer" }}
    >
      <div
        style={{
          position: "relative",
          overflow: "hidden",
          width: "340px",
          height: "340px",
          margin: "auto",
        }}
      >
        <img
          src={product.picture}
          alt={product.name}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        {product.discount && (
          <Box sx={{
            position: 'absolute',
            top: 8,
            left: 8,
            backgroundColor: 'red',
            color: 'white',
            padding: '2px 6px',
            borderRadius: '4px',
            fontSize: '0.875rem'
          }}>
            -{product.discount}%
          </Box>
        )}
        <Button
          sx={{
            position: "absolute",
            width: "100%",
            bottom: 0,
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "black",
            color: "white",
            display: AddToCart ? "flex" : "none",
            alignItems: "center",
            justifyContent: "center",
            "&:hover": { backgroundColor: "black" },
          }}
          disableRipple
          onClick={(e) => addToCart(e, product)}
        >
          Add to cart <ShoppingCartIcon sx={{ ml: 1 }} />
        </Button>
      </div>
      <CardContent sx={{ textAlign: "center", padding: "10px" }}>
        <Typography variant="h6" component="div" sx={{ mb: 1 }}>
          {product.name}
        </Typography>
        {product.discount ? (
          <>
            <Typography variant="body2" sx={{ textDecoration: 'line-through', color: 'black' }}>
              ${product.price}
            </Typography>
            <Typography variant="h6" sx={{ color: 'red' }}>
              ${product.discountedPrice}
            </Typography>
          </>
        ) : (
          <Typography variant="h6" sx={{ color: 'red' }}>
            ${product.price}
          </Typography>
        )}
        <IconButton
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
            color: "black",
            display: "block",
          }}
        >
          <FavoriteBorderIcon />
        </IconButton>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
