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
