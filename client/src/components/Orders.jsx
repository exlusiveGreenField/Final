import React, { useState, useEffect } from 'react';
import { Box, Button, List, ListItem, ListItemText } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import Navbar from './Navbar';

const OrdersList = () => {
    const [user, setUser] = useState({});
    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decoded = jwtDecode(token);
            setUser(decoded);  
            fetchOrders(decoded.id);
        }
    }, []);

    const fetchOrders = async (userId) => {
        try {
            const response = await axios.get("http://localhost:5000/admin/orders");
            const userOrders = response.data.filter(order => order.userId === userId);
            setOrders(userOrders);
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    };

    useEffect(() => {
        axios.get('http://localhost:5000/Client/products')
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the products!', error);
            });
    }, []);

    const prodNames = (id) => {
        const product = products.find(prod=> prod.id === id);
        if(product) return product.name 
    };

    const logOut = () => {
        setUser({});
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        navigate('/login');
    };

    return (
        <div>
            <Navbar />
            <Box sx={{ width: '90%', margin: '0 auto', padding: 3, marginTop: '50px' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <h2>My Orders List</h2>
                </Box>
                <List>
                    {orders.map(order => (
                        <ListItem key={order.id}>
                            <ListItemText
                                primary={`Order ID: ${order.id}`}
                                secondary={`Products: ${JSON.parse(order.products).map(product => prodNames(product[0])).join(', ')}, Status: ${order.status}, Total: $${order.totalAmount}`}
                            />
                        </ListItem>
                    ))}
                </List>
            </Box>
        </div>
    );
};

export default OrdersList;
