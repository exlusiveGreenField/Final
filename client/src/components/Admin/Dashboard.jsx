import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  List,
  ListItem,
  Grid
} from "@mui/material";
import { Link } from "react-router-dom";
import ClientsTable from "./ClientsTable";
import ProductsTable from "./ProductsTable";
import Sellers from "./Sellers";  

import StatCard from "./StatCard";

const Dashboard = () => {
  const [showClients, setShowClients] = useState(false);
  const [showProducts, setShowProducts] = useState(false);
  const [showSellers, setShowSellers] = useState(false); 
  const [showPieChart, setShowPieChart] = useState(false);
  const [showBarChart, setShowBarChart] = useState(false);

  const seperateClients = () => {
    setShowClients(!showClients)
    setShowProducts(false)
    setShowSellers(false)
    setShowPieChart(false)
    setShowBarChart(false)
  }

  const seperateProducts = () => {
    setShowProducts(!showProducts)
    setShowClients(false)
    setShowSellers(false)
    setShowPieChart(false)
    setShowBarChart(false)
  }

  const seperateSellers = () => { 
    setShowSellers(!showSellers)
    setShowClients(false)
    setShowProducts(false)
    setShowPieChart(false)
    setShowBarChart(false)
  }

  const showPie = () => {
    setShowPieChart(!showPieChart)
    setShowClients(false)
    setShowProducts(false)
    setShowSellers(false)
    setShowBarChart(false)
  };

  const showBar = () => {
    setShowBarChart(!showBarChart);
    setShowPieChart(false);
    setShowClients(false);
    setShowProducts(false);
    setShowSellers(false);
  };

  const cardStyle = {
    maxWidth: 1800,
    margin: "auto",
    padding: "20px",
    textAlign: "center",
    color: "black",
    border: "solid",
    backgroundColor: "#47a3fc",
  };

  const dashStyle = {
    maxWidth: 1800,
    margin: "auto",
    textAlign: "center",
    color: "black",
    border: "solid",
    backgroundColor: "#e4f0e7",
  };

  const buttonStyle = {
    marginRight: "40px",
    backgroundColor: "#47a3fc",
    width: "150px",
    color: "black",
    border: "solid",
    fontWeight: "bold",
    '&:hover': {
      backgroundColor: "#e4f0e7",
    },
  }
  const GridStyle = {
    margin: "auto",
    padding: "20px",
    textAlign: "center",
    color: "black",
    border: "solid",
    backgroundColor: "#e4f0e7",
  }

  const Logout = () => {
    // navigate('/')
  };

 

  return (
    <div>
      <Box sx={cardStyle}>
     
        <Box display="flex" justifyContent="center" alignItems="center" mt={2}>
          
        
           <Grid sx={GridStyle}>
            <Card sx={dashStyle}>
              <CardContent>
                <Typography variant="h5" component="h2">
                  Total Earning
                </Typography>
                <Typography variant="h4" component="p">
                  $24,895 <span style={{ color: "green" }}>▲ 10%</span>
                </Typography>
                <Typography variant="body1" component="p">
                  Compared to $84,325 last year
                </Typography>
                <Typography variant="body2" component="p">
                  Zipcar: $24,895.65
                </Typography>
                <Typography variant="body2" component="p">
                  Bitbank: $8,650.20
                </Typography>
              </CardContent>
            </Card>

            <Card sx={dashStyle}>
              <CardContent>
                <Typography variant="h5" component="h2">
                  Total Views
                </Typography>
                <Typography variant="h4" component="p">
                 10k <span style={{ color: "green" }}>▲ 20%</span>
                </Typography>
                <Typography variant="body1" component="p">
                  Compared to 8,2K last year
                </Typography>
             
              </CardContent>
            </Card>
          </Grid>
        </Box>
      </Box>
      <Card sx={dashStyle}>
        <CardContent>
          <Typography variant="h1" component="h2" gutterBottom>
            Dashboard
          </Typography>
        </CardContent>
      </Card>
      <Box sx={{ display: "flex", marginTop: "0px" }}>
        <Box
          sx={{
            width: "2000px",
            height: "1000px",
            border: "3px solid black",
            borderRadius: "10px",
            padding: "90px",
            backgroundColor: "#47a3fc",
            display: "flex",
            justifyContent: "start",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              width: "20%",
              height: "100%",
              backgroundColor: "#e4f0e7",
              border: "3px solid black",
              borderRadius: "10px",
              padding: "5px",
            }}
          >
            <List style={{ marginTop: "10px", color: "black" }}>
              <ListItem>
                <Button
                  variant="contained"
                  sx={buttonStyle}
                  onClick={seperateProducts}
                >
                  Products
                </Button>
              </ListItem>

              <ListItem>
                <Button
                  variant="contained"
                  sx={buttonStyle}
                  onClick={seperateClients}
                >
                  Clients
                </Button>
              </ListItem>
              <ListItem>
                <Button
                  variant="contained"
                  sx={buttonStyle}
                  onClick={seperateSellers}  
                >
                  Sellers
                </Button>
              </ListItem>

              <ListItem>
                <Button
                  variant="contained"
                  component={Link}
                  to="/admin/orders"
                  sx={buttonStyle}
                >
                  Orders
                </Button>
              </ListItem>

              <ListItem>
                <Button
                  variant="contained"
                  sx={buttonStyle}
                  onClick={showPie}
                >
                  Pie Chart
                </Button>
              </ListItem>

              <ListItem>
                <Button
                  variant="contained"
                  sx={buttonStyle}
                  onClick={showBar}
                >
                  Bar Chart
                </Button>
              </ListItem>

              <ListItem>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={Logout}
                  sx={buttonStyle}
                >
                  Logout
                </Button>
              </ListItem>
            </List>
          </Box>

          <Box
            sx={{
              width: "80%",
              height: "100%",
              backgroundColor: "#e4f0e7",
              border: "3px solid black",
              borderRadius: "10px",
              padding: "5px",
              overflow: "auto",
            }}
          >
            {showClients && <ClientsTable />}
            {showProducts && <ProductsTable />}
            {showSellers && <Sellers />} 
            {showPieChart && <PieChart chartData={chartData} />}
            {showBarChart && <BarChart chartData={chartData} />}
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default Dashboard;
