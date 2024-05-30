import React from 'react';
import { Typography, Table, TableHead, TableBody, TableRow, TableCell, Paper } from '@mui/material';

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
    backgroundColor: '#023047',
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

const Sellers = () => {
  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h3" gutterBottom style={styles.header}>
        Sellers
      </Typography>
      <Paper style={styles.paper}>
        <Table>
          <TableHead>
            <TableRow style={styles.tableHeadRow}>
              <TableCell style={styles.tableHeadCell}>ID</TableCell>
              <TableCell style={styles.tableHeadCell}>Name</TableCell>
              <TableCell style={styles.tableHeadCell}>Email</TableCell>
              <TableCell style={styles.tableHeadCell}>Password</TableCell>
              <TableCell style={styles.tableHeadCell}>Action</TableCell> 
            </TableRow>
          </TableHead>
          <TableBody>
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
};

export default Sellers;
