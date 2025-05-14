import { Select, TableCell, TableContainer, TableHead, TableRow, TextField, Typography,Table,Paper, TableBody, Button, MenuItem,Box,Grid } from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import React,{useState,useEffect} from 'react'
import '../AddPurchase/AddPurchase.css'
import AddIcon from '@mui/icons-material/Add';
function AddPurchase() {
  const [items, setitems] = useState([
      {
         si_no:1 ,
         name: "",
         quantity: 0,
         rate: 0,
         tax: 0,
         amount: 0,
         
      },
    ]);
  const handleAddRow = (e) => {
    console.log(...items);
     e.preventDefault();
     const lastSiNo = items.length > 0 ? parseInt(items[items.length - 1].si_no) : 0;
   
     setitems([
       ...items,
       {
         si_no:lastSiNo+1 ,
         name: "",
         quantity: 0,
         rate: 0,
         tax: 0,
         amount: 0,
         
         
       },
     ]);
   };
   const handleInputChange = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index][field] = field === "quantity" || field === "rate" || field === "tax"
      ? parseFloat(value) || 0
      : value;
    setitems(updatedItems);
  };
  
 
  return (

    <div>
        <Box classname="purchase_main" p={3}>
        <Typography variant="h6" gutterBottom>New Purchase Entry</Typography>
        <Grid   container spacing={2} mb={3}>
        <Grid item xs={12} md={4}>
          <Typography variant="subtitle2">Vendor</Typography>
          <Select fullWidth defaultValue=""><MenuItem value="ABC">ABC Supplies</MenuItem></Select>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="subtitle2">Purchase Date</Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker slotProps={{ textField: { fullWidth: true } }} />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="subtitle2">Invoice/Reference No.</Typography>
          <TextField fullWidth variant="outlined" />
        </Grid>
      </Grid>
        
        <div>
        <Typography variant="subtitle1" mb={1}>Items</Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead sx={{fontWeight:'20px'}}>
                <TableRow>
                  <TableCell>S.I No</TableCell>
                  <TableCell>Name of Products</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Rate</TableCell>
                  <TableCell>Tax(%)</TableCell>
                  <TableCell>Amount</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              {(items).map((item, index) => (
              
                <TableRow key={index}>
                  <TableCell>
                    <TextField variant='standard' InputProps={{disableUnderline:true}} onChange={(e) => handleInputChange( index,'si_no', e.target.value)} value={item.si_no}></TextField>
                  </TableCell>
                  <TableCell>
                    <TextField variant='standard' InputProps={{disableUnderline:true}} onChange={(e) => handleInputChange( index,'name', e.target.value)}></TextField>
                  </TableCell>
                  <TableCell>
                    <TextField variant='standard' InputProps={{disableUnderline:true}} onChange={(e) => handleInputChange(index,'quantity', e.target.value)}></TextField>
                  </TableCell>
                  <TableCell>
                    <TextField variant='standard' InputProps={{disableUnderline:true}} onChange={(e) => handleInputChange(index,'rate', e.target.value)}></TextField>
                  </TableCell>
                  <TableCell>
                    <TextField variant='standard' InputProps={{disableUnderline:true}} onChange={(e) => handleInputChange(index,'tax', e.target.value)}></TextField>
                  </TableCell>
                  <TableCell>
                    <TextField variant='standard' InputProps={{disableUnderline:true}}onChange={(e) => handleInputChange( index,'amount', e.target.value)}></TextField>
                  </TableCell>
                </TableRow>))}
                              </TableBody>
                              

            </Table>
          </TableContainer>
          <Box display="flex" alignItems="center" mt={2}>
        <Button startIcon={<AddIcon />} onClick={handleAddRow}>Add Item</Button>
      </Box>

      <Box className="subtotals">
  <Grid container spacing={1} justifyContent="flex-end" mt={3}>
    <Grid item xs={12} md={4}>
      <Box display="flex" justifyContent="space-between">
        <Typography>Subtotal:</Typography>
           </Box>
      <Box display="flex" justifyContent="space-between" mt={1}>
        <Typography>Tax:</Typography>
              </Box>
      <Box display="flex" justifyContent="space-between" mt={1}>
        <Typography variant="h6" fontWeight="bold">Total:</Typography>
        
      </Box>
    </Grid>
  </Grid>
</Box>

      <Grid container spacing={2} mt={3}>
        <Grid item xs={12} md={4}>
          <Typography>Payment Terms</Typography>
          <Select fullWidth>
            <MenuItem value="30">Credit - 30 days</MenuItem>
            <MenuItem value="60">Credit - 60 days</MenuItem>
            <MenuItem value="paid">Paid</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography>Due Date</Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker slotProps={{ textField: { fullWidth: true } }} />
          </LocalizationProvider>
        </Grid>
      </Grid>
      <Box className="notes-field" mt={2}>
        <TextField fullWidth placeholder="Add notes about this purchase..." />
      </Box>
      <Box className="footer-buttons" mt={3} display="flex" justifyContent="flex-end" gap={2}>
        <Button variant="outlined">Cancel</Button>
        <Button variant="contained">Save</Button>
      </Box>



        </div>
        </Box>

    </div>
  )
}

export default AddPurchase