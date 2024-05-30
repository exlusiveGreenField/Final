import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, Table, TableHead, TableBody, TableRow, TableCell, Paper } from '@mui/material';
import AdminLayout from './AdminLayout';
// import DeleteIcon from "@mui/icons-material/Delete";
const ClientsPage = () => {

  return (
    <div>
      <AdminLayout />
      <Typography variant="h3" gutterBottom style={{textAlign:"center", backgroundColor:"#FFB703",color:"#e0e1dd"}}>
        clients
      </Typography>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Password</TableCell>
              <TableCell>Action</TableCell> 
            </TableRow>
          </TableHead>
          <TableBody>
            {clients.map(client => (
              <TableRow key={client.id}>
                <TableCell>{client.id}</TableCell>
                <TableCell>{client.userName}</TableCell>
                <TableCell>{client.email}</TableCell>
                <TableCell>{client.password}</TableCell>
                <TableCell>
                  {/* <IconButton
                    aria-label="delete"
                    onClick={() => DeleteClient(client.id)}
                  > */}
                    {/* <DeleteIcon />
                  </IconButton> */}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
};

export default ClientsPage;
