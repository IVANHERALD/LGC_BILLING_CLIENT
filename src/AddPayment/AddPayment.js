import React from 'react'
import { Select, TableCell, TableContainer, TableHead, TableRow, TextField, Typography,Table,Paper, TableBody, Button, MenuItem } from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'


function AddPayment() {
  return (
    <div>
        <div>
            <h6>Make Payment</h6>
            <Typography>Vendor</Typography><br/>
          <Select>

          </Select>
          <Typography>Purchase Date</Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker></DatePicker></LocalizationProvider>
          <Typography>Payment Reference No</Typography>
          <TextField variant='outlined'></TextField>
          <Typography>Payment Method</Typography>
          <Select>
            <MenuItem>Bank Transfer</MenuItem>
            <MenuItem>Cash</MenuItem>
            <MenuItem>Check</MenuItem>
            <MenuItem>UPI</MenuItem>
          </Select>

            </div>
            <div>
                
            </div>
    </div>
  )
}

export default AddPayment