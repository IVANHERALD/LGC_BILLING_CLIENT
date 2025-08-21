import { TableContainer,TableHead,Table,TableRow,TableCell,TabContext,TabList ,Box,Tab} from '@mui/material'
import React from 'react'
import { useLocation } from "react-router-dom";

function PurchaseVendorDisplay({}) {
     const location = useLocation();
  const vendor = location.state?.vendor; 
  return (
    <div>
        <div>
            <h1>Vendor Details:</h1>
             <div style={{ padding: "20px" }}>
      <h2>Vendor Details: {vendor.name}</h2>
      <p><strong>Contact:</strong> {vendor.vendor_account_holder_name}</p>
      <p><strong>Phone:</strong> {vendor.contact}</p>
      <p><strong>Email:</strong> {vendor.email}</p>
      <p><strong>GSTIN:</strong> {vendor.gstin}</p>
      <p><strong>Address:</strong> {vendor.address}</p>
      <p style={{ color: vendor.balance === 0 ? "green" : "red" }}>
        <strong>Current Balance:</strong> ₹{vendor.balance}
      </p>
      </div>
        </div>
        <div>
            <Box> 
                
                    <Tab label="Transaction History"/>
                    <Tab label="Outstanding Payments"/>



                
                </Box>
 
        </div>
        <div>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                Date
                            </TableCell>
                            <TableCell>
                                Type
                            </TableCell>
                            <TableCell>
                                Reference No
                            </TableCell>
                            <TableCell>
                                Description
                            </TableCell>
                            <TableCell>
                                Amount
                            </TableCell>
                            <TableCell>
                                Balance
                            </TableCell>
                            <TableCell>
                                Status
                            </TableCell>
                        </TableRow>
                    </TableHead>
                </Table>
            </TableContainer>
        </div>
    </div>
  )
}

export default PurchaseVendorDisplay