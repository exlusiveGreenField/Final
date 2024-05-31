import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Button, TextField, Modal, Box } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';

const styles = {
  header: {
    textAlign: 'center',
    backgroundColor: '#0a0a0a',
    color: '#e0e1dd',
    padding: '10px',
    borderRadius: '8px',
    marginBottom: '20px',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
  },
  tableHeadRow: {
    backgroundColor: '#023047',
  },
  tableHeadCell: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  modal: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  },
};

const OrdersTable = () => {
  const [orders, setOrders] = useState([]);
  const [modify, setModify] = useState(false);
  const [currentOrder, setCurrentOrder] = useState({
    id: "",
    client: "",
    product: "",
    quantity: "",
    total: "",
    date: "",
  });
  const [newOrder, setNewOrder] = useState({
    client: "",
    product: "",
    quantity: "",
    total: "",
    date: "",
  });

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:5000/admin/orders");
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const deleteOrder = async (orderId) => {
    try {
      await axios.delete(`http://localhost:5000/admin/orders/${orderId}`);
      setOrders(orders.filter((order) => order.id !== orderId));
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  const updateOrder = async () => {
    try {
      await axios.put(
        `http://localhost:5000/admin/orders/${currentOrder.id}`,
        currentOrder
      );
      fetchOrders();
      handleCloseModify();
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };

  const addOrder = async () => {
    try {
      await axios.post("http://localhost:5000/admin/orders/add", newOrder);
      fetchOrders();
      setNewOrder({
        client: "",
        product: "",
        quantity: "",
        total: "",
        date: "",
      });
    } catch (error) {
      console.error("Error adding order:", error);
    }
  };

  const handleOpenModify = (order) => {
    setCurrentOrder(order);
    setModify(true);
  };

  const handleCloseModify = () => {
    setModify(false);
    setCurrentOrder({
      id: "",
      client: "",
      product: "",
      quantity: "",
      total: "",
      date: "",
    });
  };

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h3" gutterBottom style={styles.header}>
        Orders
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow style={styles.tableHeadRow}>
              <TableCell style={styles.tableHeadCell}>Client</TableCell>
              <TableCell style={styles.tableHeadCell}>Product</TableCell>
              <TableCell style={styles.tableHeadCell}>Quantity</TableCell>
              <TableCell style={styles.tableHeadCell}>Total</TableCell>
              <TableCell style={styles.tableHeadCell}>Date</TableCell>
              <TableCell style={styles.tableHeadCell}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.client}</TableCell>
                <TableCell>{order.product}</TableCell>
                <TableCell>{order.quantity}</TableCell>
                <TableCell>{order.total}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpenModify(order)}>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => deleteOrder(order.id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal open={modify} onClose={handleCloseModify}>
        <Box sx={styles.modal}>
          <Typography variant="h6" gutterBottom>
            Modify Order
          </Typography>
          <TextField
            fullWidth
            label="Client"
            margin="normal"
            value={currentOrder.client}
            onChange={(e) => setCurrentOrder({ ...currentOrder, client: e.target.value })}
          />
          <TextField
            fullWidth
            label="Product"
            margin="normal"
            value={currentOrder.product}
            onChange={(e) => setCurrentOrder({ ...currentOrder, product: e.target.value })}
          />
          <TextField
            fullWidth
            label="Quantity"
            margin="normal"
            value={currentOrder.quantity}
            onChange={(e) => setCurrentOrder({ ...currentOrder, quantity: e.target.value })}
          />
          <TextField
            fullWidth
            label="Total"
            margin="normal"
            value={currentOrder.total}
            onChange={(e) => setCurrentOrder({ ...currentOrder, total: e.target.value })}
          />
          <TextField
            fullWidth
            label="Date"
            margin="normal"
            value={currentOrder.date}
            onChange={(e) => setCurrentOrder({ ...currentOrder, date: e.target.value })}
          />
          <Button variant="contained" color="primary" onClick={updateOrder} style={{ marginTop: '10px' }}>
            Update Order
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default OrdersTable;
