import React from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  InputBase,
  IconButton,
} from "@mui/material";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


const Navbar = () => {
  const user=localStorage.getItem('user')
 
  return (
    <AppBar
      position="sticky"
      style={{ color: "black", backgroundColor: "white" }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Button color="inherit" component={Link} to="/">
            <b>exclusive</b>
          </Button>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/contact">
            Contact
          </Button>
          <Button color="inherit" component={Link} to="/about">
            About
          </Button>
          <Button color="inherit" component={Link} to="/signup">
            SignUp
          </Button>
         
          
        </Box>
        <Box
            sx={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "lightgrey",
              borderRadius: 1,
              marginLeft: 25,
              padding: "0 10px",
            }}
          >
            <InputBase placeholder="What are you looking for?" />
            <IconButton color="inherit">
              <SearchIcon />
            </IconButton>
          </Box>
        <Box sx={{ display: "flex", alignItems: "center", marginRight: 10 }}>
            <IconButton color="inherit" component={Link} to="/wishlist">
              <FavoriteBorderIcon />
            </IconButton>
            <IconButton color="inherit" component={Link} to="/cart">
              <ShoppingCartIcon />
            </IconButton>
            {user && <IconButton color="inherit" component={Link} to="/profile" >
              <AccountCircleIcon />
            </IconButton>}
            
          </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
