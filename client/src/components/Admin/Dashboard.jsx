// Dashboard.js
import React, { useState } from "react";
import { Card, CardContent, Typography, Box, Grid } from "@mui/material";
import ClientsTable from "./ClientsTable";
import ProductsTable from "./ProductsTable";
import Sellers from "./Sellers";  
import NavAdmin from "./NavAdmin";

import SideBar from "./SideBar";

const Dashboard = () => {
  const [showClients, setShowClients] = useState(false);
  const [showProducts, setShowProducts] = useState(false);
  const [showSellers, setShowSellers] = useState(false);

  const seperateModule = (module) => {
    setShowClients(module === "clients");
    setShowProducts(module === "products");
    setShowSellers(module === "sellers");
  };

  const cardStyle = {
    margin: "20px",
    textAlign: "center",
    color: "#333",
    border: "none",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
    backgroundColor: "#fff",
  };

  const headerStyle = {
    margin: "20px",
    textAlign: "center",
    color: "#333",
    backgroundColor: "black",
    borderRadius: "8px",
    padding: "20px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    color: "white",
  };

  return (
    <div>
      <NavAdmin />
      <Box sx={{ display: 'flex' }}>
        <SideBar
          onProductsClick={() => seperateModule("products")}
          onClientsClick={() => seperateModule("clients")}
          onSellersClick={() => seperateModule("sellers")}
          onLogout={() => {}}
        />
        <Box sx={{ flexGrow: 1, padding: "20px" }}>
          <Card sx={headerStyle}>
            <CardContent>
              <Typography variant="h4" component="h1">
                Dashboard
              </Typography>
            </CardContent>
          </Card>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card sx={cardStyle}>
                <CardContent>
                  <Typography variant="h6" component="h2">
                    Total Earning
                  </Typography>
                  <Typography variant="h4" component="p" color="primary">
                    $24,895 <span style={{ color: "green" }}>▲ 10%</span>
                  </Typography>
                  <Typography variant="body2" component="p">
                    Compared to $84,325 last year
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card sx={cardStyle}>
                <CardContent>
                  <Typography variant="h6" component="h2">
                    Total Views
                  </Typography>
                  <Typography variant="h4" component="p" color="primary">
                    10k <span style={{ color: "green" }}>▲ 20%</span>
                  </Typography>
                  <Typography variant="body2" component="p">
                    Compared to 8,2K last year
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          <Box sx={{ marginTop: "20px" }}>
            {showClients && <ClientsTable />}
            {showProducts && <ProductsTable />}
            {showSellers && <Sellers />}
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default Dashboard;
