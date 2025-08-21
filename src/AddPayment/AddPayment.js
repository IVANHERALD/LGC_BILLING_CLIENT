import {
  Box,
  Button,
  Grid,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import React, { useEffect, useState } from 'react';
import { fetchTotalPaidAmount, recordVendorPayment } from '../services/Purchasepayment';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { fetchPurchasebilldetails } from '../services/PurchaseBill';
import { fetchVendor } from '../services/Vendor';

function AddPayment() {
  const [vendor, setVendor] = useState('');
  const [paymentDate, setPaymentDate] = useState(dayjs());
  const [paymentMethod, setPaymentMethod] = useState('');
  const [referenceNo, setReferenceNo] = useState('');
  const [PayNow, setPayNow] = useState();
  const [vendordetails,setvendordetails]=useState([]);
  const [selectedVendor,setSelectedVendor]=useState();
  const [PurchasebillDetails,setPurchasebillDetails]=useState([]);
const [totalPaidMap, setTotalPaidMap] = useState({});
const [selectedInvoice, setSelectedInvoice] = useState();

 
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
                    console.log("Purchasebill details", data.getPurchaseBill);
                    const sortedBills = data.getPurchaseBill.sort((a, b) => 
        new Date(b.purchase_date) - new Date(a.purchase_date)
      );
                    console.log("fetch Purchasebill details" ,sortedBills );
                    setPurchasebillDetails(sortedBills);
                    
                    
                } catch (error) {
                    console.log(error.message);
                }
            };
            const fetchPaidAmounts = async () => {
      try {
        const response = await fetchTotalPaidAmount();
        if (!response.ok) throw new Error('Failed to fetch total paid data');
        const data = await response.json();
        console.log(data);

        // 🔸 Create a map of invoice_id → totalPaid
        const paidMap = {};
        data.forEach(entry => {
          paidMap[entry.invoice_no] = entry.totalPaid;
          
        });
        setTotalPaidMap(paidMap);
        console.log("Total Paid Map:", paidMap);
      } catch (error) {
        console.log(error.message);
      }
    };
        
            
        
    fetchVendorDetails();
    fetchPurchasebill();
    fetchPaidAmounts();
  }, []);
  const handlepay = async() => {
    console.log("Paying for invoice:", selectedInvoice);
     const paymentData = {
    
    //vendor_id: invoice.vendor_id, // You’ll need to resolve this from `vendor_name`
      date: paymentDate.format("DD/MM/YYYY"),
      method: paymentMethod,
      reference_no: referenceNo,
      amount_paid: parseFloat(PayNow), // Validate before sending
      payment_note: "payment ui" 
    // Implement payment logic here
  }
  console.log("Payment Data:", paymentData);
  console.log("Selected Invoice:", selectedInvoice);
  try {
    const response = await recordVendorPayment({ invoice_id: selectedInvoice, payment: paymentData });

    if (response.ok) {
      alert('Payment recorded successfully');
    } else {
      alert('Error: ' + response.message);
    }
  } catch (error) {
    console.error('Payment error:', error);
  }
  console.log("Payment Data:", paymentData);
}





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
            {PurchasebillDetails.filter((invoice, index) => {
              const paidAmount = totalPaidMap[invoice.invoice_no] ?? 0;
              const balance=invoice.total-paidAmount;
              if (selectedVendor && invoice.vendor_name !== selectedVendor) {
        return false;
      }
      if (balance <= 0) return false;

      return true;
    }).slice(0,5)
    .map((invoice, index) => {
      const paidAmount = totalPaidMap[invoice.invoice_no] ?? 0;
      const balance = invoice.total - paidAmount;
             
              
              return (
                <TableRow key={index}>
                  <TableCell>{invoice.invoice_no}</TableCell>
                  <TableCell>{invoice.purchase_date}</TableCell>
                  <TableCell>{invoice.purchase_due_date}</TableCell>
                  <TableCell>₹{invoice.total}</TableCell>
                  <TableCell>₹{paidAmount}</TableCell>
                  <TableCell>₹{balance}</TableCell>
                  <TableCell>
                    <TextField
                      variant="outlined"
                      fullWidth
                           onClick={() =>setSelectedInvoice(invoice.invoice_no)}     
            onChange={(e) => setPayNow(e.target.value)}          
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
           
          </Typography>
          <Box mt={1}>
            <Button variant="outlined" sx={{ mr: 2 }}>
              Cancel
            </Button>
            <Button variant="contained" onClick={handlepay} >Pay</Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default AddPayment;
