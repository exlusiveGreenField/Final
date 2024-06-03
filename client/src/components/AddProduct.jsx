import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
    const [userId, setUserId] = useState("");
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [picture, setPicture] = useState("");
    const [category, setCategory] = useState("");
    const [stock, setStock] = useState("");
    const [description, setDescription] = useState("");
    const navigate=useNavigate()
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decoded = jwtDecode(token);
            setUserId(decoded.id);
        }
    }, []);

    const addProduct = async () => {
        const newProduct = {
            name:name,
            price:price,
            picture:picture,
            category:category,
            stock:stock,
            description:description,
            userId:userId
        };

        try {
            await axios.post("http://localhost:5000/Seller/add", newProduct);
            setName("");
            setPrice("");
            setPicture("");
            setCategory("");
            setStock("");
            setDescription("");

            Swal.fire({
                title: 'Success!',
                text: 'Product added successfully',
                icon: 'success',
                confirmButtonText: 'OK'
            }).then(() => {
                navigate('/profile');
            });

        } catch (error) {
            console.error("Error adding product:", error);
            Swal.fire({
                title: 'Error!',
                text: 'There was an error adding the product',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addProduct();
    };

    return (
        <Box sx={{ width: '50%', margin: '0 auto', padding: 3, marginTop: '50px' }}>
            <Typography variant="h4" gutterBottom>Add New Product</Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    fullWidth
                    required
                    margin="normal"
                />
                <TextField
                    label="Price"
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    fullWidth
                    required
                    margin="normal"
                />
                <TextField
                    label="Picture URL"
                    value={picture}
                    onChange={(e) => setPicture(e.target.value)}
                    fullWidth
                    required
                    margin="normal"
                />
                <TextField
                    label="Category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    fullWidth
                    required
                    margin="normal"
                />
                <TextField
                    label="Stock"
                    type="number"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    fullWidth
                    required
                    margin="normal"
                />
                <TextField
                    label="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    fullWidth
                    required
                    margin="normal"
                />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
                    <Button type="submit" variant="contained" color="primary">
                        Add Product
                    </Button>
                </Box>
            </form>
        </Box>
    );
};

export default AddProduct;
