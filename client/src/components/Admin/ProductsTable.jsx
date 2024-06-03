import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Button, TextField, Modal, Box } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';

const styles = {
  header: {
    textAlign: 'center',
    backgroundColor: '#0a0a0a',
    color: '#e8eaf6',
    padding: '20px',
    borderRadius: '10px',
    marginBottom: '20px',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
  },
  tableHeadRow: {
    backgroundColor: '#5b3594',
  },
  tableHeadCell: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: '1.1rem',
  },
  tableBodyRow: {
    '&:nth-of-type(odd)': {
      backgroundColor: '#e8eaf6',
    },
  },
  modal: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: '#ffffff',
    boxShadow: 2434,
    p: 4,
    borderRadius: '10px',
  },
  input: {
    marginBottom: '15px',
  },
  button: {
    marginTop: '15px',
    backgroundColor: '#c42121',
    color: '#ffffff',
    '&:hover': {
      backgroundColor: '#0d0d0f',
    },
  },
};

const ProductsTable = () => {
  const [products, setProducts] = useState([]);
  const [modify, setModify] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({
    id: "",
    name: "",
    price: "",
    picture: "",
    category: "",
    stock: "",
    description: "",
  });
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    picture: "",
    category: "",
    stock: "",
    description: "",
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/admin/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const deleteProduct = async (productId) => {
    try {
      await axios.delete(`http://localhost:5000/admin/products/${productId}`);
      setProducts(products.filter((product) => product.id !== productId));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const updateProduct = async () => {
    try {
      await axios.put(
        `http://localhost:5000/admin/products/${currentProduct.id}`,
        currentProduct
      );
      fetchProducts();
      handleCloseModify();
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };



  const handleOpenModify = (product) => {
    setCurrentProduct(product)
    setModify(true)
  }

  const handleCloseModify = () => {
    setModify(false)
    setCurrentProduct({
      id: "",
      name: "",
      price: "",
      picture: "",
      category: "",
      stock: "",
      description: "",
    })
  }

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
            {products.map((product) => (
              <TableRow key={product.id} style={styles.tableBodyRow}>
                <TableCell>{product.name}</TableCell>
                <TableCell>
                  <img src={product.picture} alt={product.name} width={50} height={50} />
                </TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpenModify(product)}>
                    <Edit sx={{ color: '#5e35b1' }} />
                  </IconButton>
                  <IconButton onClick={() => deleteProduct(product.id)}>
                    <Delete sx={{ color: '#d32f2f' }} />
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
            Modify Product
          </Typography>
          <TextField
            fullWidth
            label="Name"
            margin="normal"
            value={currentProduct.name}
            onChange={(e) => setCurrentProduct({ ...currentProduct, name: e.target.value })}
            sx={styles.input}
          />
          <TextField
            fullWidth
            label="Price"
            margin="normal"
            value={currentProduct.price}
            onChange={(e) => setCurrentProduct({ ...currentProduct, price: e.target.value })}
            sx={styles.input}
          />
          <TextField
            fullWidth
            label="Picture URL"
            margin="normal"
            value={currentProduct.picture}
            onChange={(e) => setCurrentProduct({ ...currentProduct, picture: e.target.value })}
            sx={styles.input}
          />
          <TextField
            fullWidth
            label="Category"
            margin="normal"
            value={currentProduct.category}
            onChange={(e) => setCurrentProduct({ ...currentProduct, category: e.target.value })}
            sx={styles.input}
          />
          <TextField
            fullWidth
            label="Stock"
            margin="normal"
            value={currentProduct.stock}
            onChange={(e) => setCurrentProduct({ ...currentProduct, stock: e.target.value })}
            sx={styles.input}
          />
          <TextField
            fullWidth
            label="Description"
            margin="normal"
            value={currentProduct.description}
            onChange={(e) => setCurrentProduct({ ...currentProduct, description: e.target.value })}
            sx={styles.input}
          />
          <Button variant="contained" sx={styles.button} onClick={updateProduct}>
            Update Product
          </Button> 
        
        </Box>
      </Modal>
    </div>
  )
}

export default ProductsTable
