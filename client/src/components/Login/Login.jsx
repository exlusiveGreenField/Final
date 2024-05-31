import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('client');
  const [message, setMessage] = useState('');

  const { loginAction } = useAuth();
  const navigate = useNavigate();

  const handleLogIn = async (e) => {
    e.preventDefault();
    try {
      await loginAction({ userName: username, password: password, role: role });
      // Redirect to dashboard or home page after successful login
      navigate('/');
    } catch (error) {
      setMessage('Login failed. Please try again.');
    }
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ height: '100vh' }}
    >
      <Grid item xs={12} md={6}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          bgcolor="background.paper"
          boxShadow={4}
          borderRadius={2}
          p={4}
          width="90%"
          maxWidth="400px"
          margin="0 auto"
        >
          <form onSubmit={handleLogIn} style={{ width: '100%' }}>
            <Typography variant="h4" gutterBottom sx={{ textAlign: 'center' }}>
              Login
            </Typography>
            <TextField
              fullWidth
              label="Username"
              variant="outlined"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              sx={{ marginBottom: 2 }}
            />
            <TextField
              fullWidth
              label="Password"
              variant="outlined"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ marginBottom: 2 }}
            />
            <FormControl fullWidth variant="outlined" sx={{ marginBottom: 2 }}>
              <InputLabel id="role-label">Role</InputLabel>
              <Select
                labelId="role-label"
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                label="Role"
              >
                <MenuItem value="client">Client</MenuItem>
                <MenuItem value="seller">Seller</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
              </Select>
            </FormControl>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ marginBottom: 2 }}
            >
              Login
            </Button>
          </form>
          {message && (
            <Box mt={2} sx={{ textAlign: 'center', width: '100%' }}>
              <Typography color="error">{message}</Typography>
            </Box>
          )}
        </Box>
      </Grid>
    </Grid>
  );
}

export default Login;
