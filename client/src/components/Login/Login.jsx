import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';

import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Link,
} from '@mui/material';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Client');
  const [message, setMessage] = useState('');

  const { loginAction } = useAuth();
  const navigate = useNavigate();

  const handleLogIn = async (e) => {
    e.preventDefault();
    try {
      await loginAction({
        userName: username,
        password: password
      });
      setMessage('Welcome!');
      navigate('/');
    } catch (error) {
      setMessage('Log in failed. Please sign up before logging in.');
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
                  <Grid>
                    <img
                      src="https://s3-alpha-sig.figma.com/img/75f3/94c0/a1c7dc5b68a42239311e510f54d8cd59?Expires=1717977600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=nxMmcLhDtU4rZjNqF~3dko2JRdwdfpOvZKhGTpTt1aHOlqVteTtrRlBp3HeK~hYWrTe7a8rpwm7LFLhnHGTGVc~NcfXoWkEMV1ibyMuNzL92tUIQ-O4H9fbZ1FRiyJEYfAotxkSleK15Z~REekYxnCE5yYmsDBfRLkgOFYUHOqm1veciY3mvSruMfp0d8ivEFPyP58797yqnYeAnlVR4kYi0F588gMvxhjpUcKk8FHRAorAPnnBhQKe2SEs9UkKmJyQ6PEEAPc04~Zfh9plGg9K6WtZ2rwjU70Y6VhuG~HnaAqlnJ5n2fj5kw0D6zVDiTA-oEDeLoj4uPhVPNb51-A__"
                      alt="Login"
                      style={{ width: '320px', height: '350px' }}
                    />
                  </Grid>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box>
                    <Typography variant="h5" gutterBottom>
                      Log in To Exclusive
                    </Typography>
                  </Box>
                  <form onSubmit={handleLogIn}>
                    <Typography variant="p">
                      Enter your details below
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
                    
                    <Button
                      type="submit"
                      variant="contained"
                      color="secondary"
                      sx={{
                        backgroundColor: '#ff0000',
                        '&:hover': { backgroundColor: '#cc0000' },
                      }}
                    >
                      Login
                    </Button>
                    <Typography variant="body1">
                      Don't have an account?{' '}
                      <Link
                        component="button"
                        onClick={() => navigate('/signup')}
                        sx={{ color: '#ff0000' }}
                      >
                        Sign Up
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

export default Login;
