import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Grid,
  Typography,
  Button,
  Stack,
} from "@mui/material";
import axios from "axios";
import ProductCard from "./ProductCard";
import Navbar from "./Navbar";
import Services from "./home/Services";

const categories = [
  "Women's fashion",
  "Men's fashion",
  "Electronics",
  "Home & lifestyle",
  "Sports & Outdoors",
  "Baby's toys",
  "Groceries & Pets",
  "Health & Beauty"
];

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [chosen, setChosen] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const category = location.state?.category || '';
  console.log(location.state);
  useEffect(() => {
    if (category) {
      setChosen(category);
      axios.get(`http://localhost:5000/Client/products/category/${category}`)
        .then((response) => {
          setProducts(response.data);
        })
        .catch((error) => {
          console.error("Error fetching products:", error);
        });
    }
  }, [category]);

  const chooseCategory = (newCategory) => {
    setChosen(newCategory);
    navigate('/shop', { state: { category: newCategory } });
  };

  return (
    <div>
      <Navbar />
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
        <Box sx={{ width: "90%", textAlign: "center" }}>
          <Typography 
            component="h2" 
            sx={{ 
              marginBottom: 2, 
              fontSize: "2rem", 
              fontWeight: "bold",
              textAlign: "left",
              marginLeft: "16px"
            }}
          >
            Our Shop
          </Typography>
          <Stack direction="row" spacing={2} sx={{marginTop:5, marginBottom: 2, justifyContent: "center" }}>
            {categories.map((cat) => (
              <Button 
                key={cat}
                variant="contained"
                style={{
                  backgroundColor: chosen === cat ? 'darkred' : 'red',
                  color: 'white'
                }}
                onClick={() => chooseCategory(cat)}
              >
                {cat}
              </Button>
            ))}
          </Stack>
          <Box>
            <Grid container spacing={3}  sx={{marginTop:5}}>
              {products.map((product) => (
                <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                  <ProductCard product={product} />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      </Box>
      <Services/>
    </div>
  );
};

export default Shop;
