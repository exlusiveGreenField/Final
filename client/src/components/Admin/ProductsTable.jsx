// ProductsTable.js
import React from 'react';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

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
};

const ProductsTable = () => {
  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h3" gutterBottom style={styles.header}>
        Products
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow style={styles.tableHeadRow}>
              <TableCell style={styles.tableHeadCell}>Name</TableCell>
              <TableCell style={styles.tableHeadCell}>Image</TableCell>
              <TableCell style={styles.tableHeadCell}>Category</TableCell>
              <TableCell style={styles.tableHeadCell}>Price</TableCell>
              <TableCell style={styles.tableHeadCell}>Stock</TableCell>
              <TableCell style={styles.tableHeadCell}>Description</TableCell>
              <TableCell style={styles.tableHeadCell}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Render product rows here */}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ProductsTable;
