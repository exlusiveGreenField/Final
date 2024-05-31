import React from "react";
import {
  Box,
  List,
  ListItem,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const images = [
  "https://slidechef.net/wp-content/uploads/2023/09/Iphone-15-Presentation-Template.jpg",
  "https://static.wixstatic.com/media/1c92ab_a0c05a895d1045e89bc3b81e71d31a7d~mv2.jpg",
  "https://mspoweruser.com/wp-content/uploads/2020/06/9CA72E16-7D11-4966-AD64-1946F889BA6F.jpeg",
  "https://asset1.ruecdn.com/images/content/events/780019/780019_banner_tablet_hires.jpg",
];

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const Navbanner = () => {
  const navigate = useNavigate();

  const clicked = (category) => {
    navigate('/shop', { state: { category } });
  };

  return (
    <Box>
      <Box sx={{ display: "flex", marginTop: "50px" }}>
        <Box sx={{ overflow: "auto" }}>
          <List style={{ marginTop: "50px", color: "black" }}>
            <ListItem>
              <Button style={{ color: "black" }} onClick={() => clicked("Women's fashion")}>Women's fashion</Button>
            </ListItem>
            <ListItem>
              <Button style={{ color: "black" }} onClick={() => clicked("Men's fashion")}>Men's fashion</Button>
            </ListItem>
            <ListItem>
              <Button style={{ color: "black" }} onClick={() => clicked("Electronics")}>Electronics</Button>
            </ListItem>
            <ListItem>
              <Button style={{ color: "black" }} onClick={() => clicked("Home & lifestyle")}>Home & lifestyle</Button>
            </ListItem>
            <ListItem>
              <Button style={{ color: "black" }} onClick={() => clicked("Sports & Outdoors")}>Sports & Outdoors</Button>
            </ListItem>
            <ListItem>
              <Button style={{ color: "black" }} onClick={() => clicked("Baby's toys")}>Baby's toys</Button>
            </ListItem>
            <ListItem>
              <Button style={{ color: "black" }} onClick={() => clicked("Groceries & Pets")}>Groceries & Pets</Button>
            </ListItem>
            <ListItem>
              <Button style={{ color: "black" }} onClick={() => clicked("Health & Beauty")}>Health & Beauty</Button>
            </ListItem>
          </List>
        </Box>
        <Box component="main" sx={{ flexGrow: 1, p: 3, width: "55%" }}>
          <Slider {...settings}>
            {images.map((src, index) => (
              <Box key={index}>
                <img src={src} style={{ width: "90%", height: "500px", marginLeft: "80px" }} alt={`Slide ${index}`} />
              </Box>
            ))}
          </Slider>
        </Box>
      </Box>
      <hr  />
    </Box>
  );
};

export default Navbanner;
