import React from 'react'
import { Button, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import './VendorDashBoard.css'
import { useNavigate } from 'react-router-dom';
const vendorData = [
    {
      name: 'ABC Supplies',
      contact: 'John Doe - 555-1234',
      balance: 24500,
      lastTransaction: 'Apr 28, 2025',
    },
    {
      name: 'XYZ Hardware',
      contact: 'Jane Smith - 555-5678',
      balance: 12750,
      lastTransaction: 'Apr 28, 2025',
    },
    {
      name: 'Metalworks Inc.',
      contact: 'Mike Johnson - 555-9012',
      balance: 8400,
      lastTransaction: 'Apr 29, 2025',
    },
    {
      name: 'Quality Tools Co.',
      contact: 'Sarah Lee - 555-3456',
      balance: 0,
      lastTransaction: 'Apr 25, 2025',
    }
  ];
function VendorDashBoard() {
    const history=useNavigate();
  return (
    <div className='dashboard-container'><h2>Vendor Management Dashboard</h2>
    <div className="dashboard-header">
      <div className="search-filter">
        <TextField label="Search vendors..." variant="outlined" size="small" />
        <TextField label="Filter by" variant="outlined" size="small" />
      </div>
      <Button variant="contained" className="add-vendor-button" onClick={()=>{
        console.log('clicked')
        history('/vendor')}}>+ Add New Vendor</Button>
    </div>

    <TableContainer component={Paper} className="vendor-table">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Vendor Name</TableCell>
            <TableCell>Contact Info</TableCell>
            <TableCell>Current Balance</TableCell>
            <TableCell>Last Transaction</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {vendorData.map((vendor, index) => (
            <TableRow key={index}>
              <TableCell>{vendor.name}</TableCell>
              <TableCell>{vendor.contact}</TableCell>
              <TableCell style={{ color: vendor.balance === 0 ? 'green' : 'red' }}>
                ₹{vendor.balance.toLocaleString()}
              </TableCell>
              <TableCell>{vendor.lastTransaction}</TableCell>
              <TableCell>
                <Button variant="contained" size="small" color="primary" style={{ marginRight: 5 }}>View</Button>
                <Button variant="contained" size="small" style={{ backgroundColor: '#4CAF50', color: 'white', marginRight: 5 }}>Purchase</Button>
                <Button variant="contained" size="small" style={{ backgroundColor: '#FFA500', color: 'white' }}>Pay</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

    </div>
  )
}

export default VendorDashBoard