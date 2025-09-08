import { TableContainer,TableHead,Table,TableRow,TableCell,TabContext,TabList ,Box,Tab,Grid,Typography,Paper} from '@mui/material'
import React from 'react'
import { useLocation } from "react-router-dom";

function PurchaseVendorDisplay({}) {
     const location = useLocation();
  const vendor = location.state?.vendor; 
  console.log("vendor details in display page",vendor);
  return (
    <div>
        <div>
            
             <div style={{ padding: "20px" }}>
                 <Box sx={{ p: 3 }}>
                    <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
      Vendor Details: {vendor.name}</Typography>
       <Paper elevation={2} sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography><strong>Contact:</strong> {vendor.vendor_account_holder_name || "N/A"}</Typography>
            <Typography><strong>Phone:</strong> {vendor.contact || "N/A"}</Typography>
            <Typography><strong>Email:</strong> {vendor.email || "N/A"}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography><strong>GSTIN:</strong> {vendor.gstin || "N/A"}</Typography>
            <Typography><strong>Address:</strong>  {vendor.address || ""},{vendor.city || ""},{vendor.state || ""}</Typography>
            <Typography>
              <strong>Current Balance:</strong>{" "}
              <span style={{ color: vendor.balance === 0 ? "green" : "red", fontWeight: "bold" }}>
                ₹{vendor.balance || 0}
              </span>
            </Typography>
          </Grid>
        </Grid>
      </Paper></Box>
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