import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import Icon from "@mui/material/Icon";

const StatCard = ({ title, count, percentage, icon }) => {
  return (
    <Card sx={{ maxWidth: 900, margin: "60px", backgroundColor: "#f0f4f8" }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
              {title.text}
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              {count}
            </Typography>
            <Typography color={percentage.color} sx={{ fontWeight: "bold" }}>
              {percentage.text}
            </Typography>
          </Box>
          <Icon color={icon.color} sx={{ fontSize: 40 }}>
            {icon.component}
          </Icon>
        </Box>
      </CardContent>
    </Card>
  );
};

export default StatCard;
