import React, { useState } from 'react';
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
  Link,
} from '@mui/material';
import { useAuth } from '../context/AuthContext';
import Navbar from '../Navbar';

function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('Client');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const { loginAction } = useAuth();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await loginAction(
        { userName: username, email: email, password: password, role: role },
        'signup'
      ).then(() => {
        setMessage('Signup successful!');
      });
    } catch (error) {
      setMessage('Signup failed. Please try again.');
    }
  };

  return (
    <div>
      <Navbar />
      <Box mt={4}>
        <Grid container justifyContent="center">
          <Grid item xs={12} md={9}>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              bgcolor="background.paper"
              boxShadow={4}
              borderRadius={2}
              p={4}
              width="90%"
              maxWidth="900px"
              margin="0 auto"
            >
              <Grid container spacing={4} alignItems="center">
                <Grid item xs={12} md={6}>
                  <img
                    src="https://www.shutterstock.com/image-vector/new-user-online-registration-sign-260nw-1982734163.jpg"
                    alt="Signup"
                    style={{ width: '100%', height: 'auto' }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <form onSubmit={handleSignup}>
                    <Typography variant="h5" gutterBottom>
                      Membership Application
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
                      label="Email"
                      variant="outlined"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
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
                        <MenuItem value="Client">Client</MenuItem>
                        <MenuItem value="Seller">Seller</MenuItem>
                      </Select>
                    </FormControl>
                    <Button type="submit" variant="contained" color="primary">
                      Sign Up
                    </Button>
                    <Typography variant="body1">
                      Already have an account?{' '}
                      <Link component="button" onClick={() => navigate('/login')}>
                        Login
                      </Link>
                    </Typography>
                    {message && (
                      <Box mt={2}>
                        <Typography>{message}</Typography>
                      </Box>
                    )}
                  </form>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default Signup;
