import { Select, TableCell, TableContainer, TableHead, TableRow, TextField, Typography,Table,Paper, TableBody, Button, MenuItem } from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import React,{useState,useEffect} from 'react'
import '../AddPurchase/AddPurchase.css'

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
        <div>
            <h1>New Purchase Entry</h1>
        </div>
        <div className='purchase_main'>
        <label>Vendor</label><br/>
          <Select>

          </Select>
          <Typography>Purchase Date</Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker></DatePicker></LocalizationProvider>
          <Typography>Invoice/Reference No</Typography>
          <TextField variant='outlined'></TextField>
        </div>
        <div>
          <h3>Items</h3>
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
                    <TextField variant='standard' InputProps={{disableUnderline:true}} onChange={(e) => handleInputChange( index,'si_no', e.target.value)}></TextField>
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
          <div>          <Button onClick={handleAddRow}>+</Button>
          <h4>Subtotal:<TextField variant='standard' InputProps={{disableUnderline:true}}/></h4>
          <h4>Tax:<TextField variant='standard' InputProps={{disableUnderline:true}}/></h4>
          <h2>Total:<TextField variant='standard' InputProps={{disableUnderline:true}}/></h2></div>

<div>
  <label>Payment Terms</label>
  <Select>
    <MenuItem>Credit - 30 days</MenuItem>
    <MenuItem>Credit - 60 days</MenuItem>
    <MenuItem>Credit - 90 days</MenuItem>
    <MenuItem>Paid</MenuItem>
  </Select>
  <Typography>Purchase Date</Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker></DatePicker></LocalizationProvider>
</div>
<div>
  <label><TextField variant='outlined'/></label>
  <Button variant='outlined'>Cancel</Button>
  <Button variant='contained'>Save</Button>
</div>



        </div>
    </div>
  )
}

export default AddPurchase