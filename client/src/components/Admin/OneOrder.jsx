import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Typography, Card, CardContent, List, ListItem, ListItemText } from '@mui/material';
import Dashboard from './Dashboard';

const OneOrder = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
 console.log(order);
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/Admin/orders/${orderId}`);
        setOrder(response.data);
      } catch (error) {
        console.error('Error fetching the order details:', error);
      }
    };

    fetchOrder();
  }, [orderId]);

  if (!order) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Dashboard/>
      <Card style={{ maxWidth: 800, margin: '20px auto', padding: '20px', textAlign: 'center' }}>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            Order ID: {order.id}
          </Typography>
          <Typography variant="h6" gutterBottom>
            Customer ID: {order.userId}
          </Typography>
          <Typography variant="h6" gutterBottom>
            Total Amount: ${order.totalAmount}
          </Typography>
          <Typography variant="h6" gutterBottom>
            Status: {order.status}
          </Typography>
          <Typography variant="h6" gutterBottom>
            Date: {new Date(order.createdAt).toLocaleDateString()}
          </Typography>
          <Typography variant="h6" gutterBottom>
            Products:
          </Typography>
          <List>
            {JSON.parse(order.products).map(([productId, quantity]) => (
              <ListItem key={productId}>
                <ListItemText primary={`Product ID: ${productId}, Quantity: ${quantity}`} />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
    </div>
  );
};

export default OneOrder;