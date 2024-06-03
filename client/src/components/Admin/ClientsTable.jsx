import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, Table, TableHead, TableBody, TableRow, TableCell, Paper, IconButton, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

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
  paper: {
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
  },
  tableHeadRow: {
    backgroundColor: 'red',
  },
  tableHeadCell: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  tableBodyRow: {
    '&:hover': {
      backgroundColor: '#f1f1f1',
    },
  },
  deleteButton: {
    color: '#d32f2f',
  },
};

const ClientsTable = () => {
  const [clients, setClients] = useState([]);

  const fetchUsersByRole = async (role) => {
    try {
      const response = await axios.get(`http://localhost:5000/Admin/users/${role}`);
      setClients(response.data);
    } catch (error) {
      console.log('error fetching: ', error);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:5000/Clients/${userId}`);
      setClients(clients.filter(client => client.id !== userId));
    } catch (error) {
      console.error('Error deleting user: ', error);
    }
  };

  const handleSwitchToSeller = async (userId) => {
    try {
      await axios.put(`http://localhost:5000/admin/users/switch/${userId}`, { role: 'seller' });
      fetchUsersByRole('client');
    } catch (error) {
      console.error('Error switching user to seller: ', error);
    }
  };

  useEffect(() => {
    fetchUsersByRole('client');
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h3" gutterBottom style={styles.header}>
        Clients
      </Typography>
      <Paper style={styles.paper}>
        <Table>
          <TableHead>
            <TableRow style={styles.tableHeadRow}>
              <TableCell style={styles.tableHeadCell}>ID</TableCell>
              <TableCell style={styles.tableHeadCell}>userName</TableCell>
              <TableCell style={styles.tableHeadCell}>Email</TableCell>
              <TableCell style={styles.tableHeadCell}>Password</TableCell>
              <TableCell style={styles.tableHeadCell}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clients.map(client => (
              <TableRow key={client.id} style={styles.tableBodyRow}>
                <TableCell>{client.id}</TableCell>
                <TableCell>{client.userName}</TableCell>
                <TableCell>{client.email}</TableCell>
                <TableCell>{client.password}</TableCell>
                <TableCell>
                  <IconButton
                    aria-label="delete"
                    style={styles.deleteButton}
                    onClick={() => handleDeleteUser(client.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleSwitchToSeller(client.id)}
                  >
                    Switch to Seller
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
};

export default ClientsTable;
