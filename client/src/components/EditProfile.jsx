import React, { useState, useEffect } from 'react';
import { useProfile } from './context/ProfileContext'
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import {
  Container,
  Box,
  Typography,
  Grid,
  TextField,
  Button,
} from '@mui/material';
import Swal from 'sweetalert2';

function EditProfile() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const {user,updateUser} =useProfile()
 
  const navigate = useNavigate();


  const rakahProfile = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      setMessage('New passwords do not match.');
      return;
    }
    try {
      await updateUser(user.id, { 
        userName: username || user.userName,
        email: email || user.email,
        address: address || user.address,
        currentPassword: currentPassword || user.password,
        newPassword: newPassword || user.password,
      });
      setMessage('Profile updated successfully!');
      navigate('/profile');
  
      
      Swal.fire({
        icon: 'success',
        title: 'Profile Updated',
        text: 'Your profile has been successfully updated.',
      });
    } catch (error) {
      setMessage('Profile update failed. Please try again.');
  
     
      Swal.fire({
        icon: 'error',
        title: 'Update Failed',
        text: 'An error occurred while updating your profile. Please try again.',
      });
    }
  };

  return (
    <div>
      <Navbar />
      <Container>
        <Box mt={4}>
          <div style={{ textAlign: 'center' }}>
            <Typography variant="h5" gutterBottom>
              Edit Your Profile
            </Typography>
          </div>
          <Grid container justifyContent="center">
            <Grid item xs={12} md={8}>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                bgcolor="background.paper"
                boxShadow={4}
                borderRadius={2}
                p={4}
                width="100%"
              >
                <form onSubmit={rakahProfile}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        variant="outlined"
                        value={username || user.userName}
                        onChange={(e) => setUsername(e.target.value)}
                        sx={{ marginBottom: 2 }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth 
                        variant="outlined"
                        type="email"
                        value={email||user.email}
                      
                        onChange={(e) => setEmail(e.target.value)}
                        sx={{ marginBottom: 2 }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        variant="outlined"
                        value={address|| user.address}
                        onChange={(e) => setAddress(e.target.value)}
                        sx={{ marginBottom: 2 }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="subtitle1">
                        Password Changes
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label=" Current Password"
                        variant="outlined"
                        type="password"
                        value={currentPassword || user.currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        sx={{ marginBottom: 2 }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label=" New Password"
                        variant="outlined"
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        sx={{ marginBottom: 2 }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Confirm New Password"
                        variant="outlined"
                        type="password"
                        value={confirmNewPassword}
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                        sx={{ marginBottom: 2 }}
                      />
                    </Grid>
                    <Grid item xs={12} display="flex" justifyContent="flex-end">
                      <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        sx={{ marginRight: 2 }}
                      >
                        Save Changes
                      </Button>
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => navigate('/')}
                      >
                        Cancel
                      </Button>
                    </Grid>
                    {message && (
                      <Grid item xs={12}>
                        <Typography color="error">{message}</Typography>
                      </Grid>
                    )}
                  </Grid>
                </form>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </div>
  );
}

export default EditProfile;