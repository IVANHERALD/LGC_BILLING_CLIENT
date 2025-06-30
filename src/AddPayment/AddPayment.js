import React, { useState,useEffect } from 'react';
import {
  Box,
  Grid,
  Typography,
  Select,
  MenuItem,
  TextField,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Button,
  TableContainer
} from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { fetchVendor } from '../services/Vendor';
import { fetchPurchasebilldetails } from '../services/PurchaseBill';

function AddPayment() {
  const [vendor, setVendor] = useState('');
  const [paymentDate, setPaymentDate] = useState(dayjs());
  const [paymentMethod, setPaymentMethod] = useState('');
  const [referenceNo, setReferenceNo] = useState('');
  const [payNow, setPayNow] = useState({ 0: 21320, 1: 3180 });
  const [vendordetails,setvendordetails]=useState([]);
  const [selectedVendor,setSelectedVendor]=useState();
  const [PurchasebillDetails,setPurchasebillDetails]=useState([]);

  const invoices = [
    {
      invoiceNo: 'INV-2025042',
      date: '15/04/2025',
      dueDate: '15/05/2025',
      totalAmount: 21320,
      paidAmount: 0,
    },
    {
      invoiceNo: 'INV-2025038',
      date: '05/04/2025',
      dueDate: '05/05/2025',
      totalAmount: 8500,
      paidAmount: 5320,
    },
  ];
  useEffect(() => {
    
    const fetchVendorDetails = async () => {
      try {
        const response = await fetchVendor();
        if (!response) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        console.log("fetch vendor details", data.vendors);
        setvendordetails(data.vendors);
        console.log("", data.vendors);
      } catch (error) {
        console.log(error.message);
      }
    };
            const fetchPurchasebill = async () => {
                try {
                    const response = await fetchPurchasebilldetails();
                    if (!response) {
                        throw new Error('Failed to fetch data');
                    }
                    const data = await response.json();
                    console.log("fetch Purchasebill details" ,data.getPurchaseBill );
                    setPurchasebillDetails(data.getPurchaseBill);
                    
                    
                } catch (error) {
                    console.log(error.message);
                }
            };
        
            
        
    fetchVendorDetails();
    fetchPurchasebill();
  }, []);

  return (
    <Box p={3} component={Paper} elevation={3}>
      <Typography variant="h6" gutterBottom>
        Make Payment
      </Typography>

      <Grid container spacing={2} alignItems="center" mb={3}>
        <Grid item xs={4}>
          <Typography variant="subtitle2">Vendor</Typography>
          <Select fullWidth value={selectedVendor} onChange={(e) => setSelectedVendor(e.target.value)}>{vendordetails.map((vendor, index) => (
    <MenuItem key={index} value={vendor.vendor_name}>
      {vendor.vendor_name}
    </MenuItem>
  ))}</Select>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="subtitle2">Payment Date</Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              format="DD/MM/YYYY"
              value={paymentDate}
              onChange={(newValue) => setPaymentDate(newValue)}
              slotProps={{ textField: { fullWidth: true } }}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="subtitle2">Payment Reference No.</Typography>
          <TextField
            fullWidth
            value={referenceNo}
            onChange={(e) => setReferenceNo(e.target.value)}
          />
        </Grid>
      </Grid>

      <Grid container spacing={2} mb={3}>
        <Grid item xs={4}>
          <Typography variant="subtitle2">Payment Method</Typography>
          <Select
            fullWidth
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <MenuItem value="Bank Transfer">Bank Transfer</MenuItem>
            <MenuItem value="Cash">Cash</MenuItem>
            <MenuItem value="Check">Check</MenuItem>
            <MenuItem value="UPI">UPI</MenuItem>
          </Select>
        </Grid>
      </Grid>

      <Typography variant="subtitle2" gutterBottom>
        Outstanding Invoices
      </Typography>

      <TableContainer component={Paper} variant="outlined" sx={{ mb: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Invoice No.</strong></TableCell>
              <TableCell><strong>Date</strong></TableCell>
              <TableCell><strong>Due Date</strong></TableCell>
              <TableCell><strong>Total Amount</strong></TableCell>
              <TableCell><strong>Paid Amount</strong></TableCell>
              <TableCell><strong>Balance</strong></TableCell>
              <TableCell><strong>Pay Now</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {PurchasebillDetails.map((invoice, index) => {
              const balance = invoice.totalAmount - invoice.paidAmount;
              return (
                <TableRow key={index}>
                  <TableCell>{invoice.invoice_no}</TableCell>
                  <TableCell>{invoice.purchase_date}</TableCell>
                  <TableCell>{invoice.purchase_due_date}</TableCell>
                  <TableCell>₹{invoice.total}</TableCell>
                  <TableCell>₹{invoice.paidAmount}</TableCell>
                  <TableCell>₹{balance}</TableCell>
                  <TableCell>
                    <TextField
                      variant="outlined"
                      fullWidth
                      value={payNow[index]}
                      onChange={(e) =>
                        setPayNow({ ...payNow, [index]: Number(e.target.value) || 0 })
                      }
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <Box display="flex" justifyContent="space-between" alignItems="center">
        <TextField
          multiline
          rows={2}
          fullWidth
          placeholder="Add notes about this payment..."
          sx={{ maxWidth: '50%' }}
        />
        <Box textAlign="right">
          <Typography variant="h6">
            Total Payment: ₹24,500
          </Typography>
          <Box mt={1}>
            <Button variant="outlined" sx={{ mr: 2 }}>
              Cancel
            </Button>
            <Button variant="contained">Pay</Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default AddPayment;
