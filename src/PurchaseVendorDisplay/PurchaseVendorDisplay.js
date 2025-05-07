import { TableContainer,TableHead,Table,TableRow,TableCell,TabContext,TabList ,Box,Tab} from '@mui/material'
import React from 'react'

function PurchaseVendorDisplay() {
  return (
    <div>
        <div>
            <h1>Vendor Details:</h1>
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