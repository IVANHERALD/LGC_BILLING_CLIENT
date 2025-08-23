import { Select, TableCell, TableContainer, TableHead, TableRow, TextField, Typography,Table,Paper, TableBody, Button, MenuItem,Box,Grid,InputAdornment } from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { useState } from 'react'
import '../AddPurchase/AddPurchase.css'
import AddIcon from '@mui/icons-material/Add';
import { fetchVendor } from '../services/Vendor'
import { newPurchasebill } from '../services/PurchaseBill'
import Navbar from '../Navbar/Navbar'
function AddPurchase() {
  const [vendordetails,setvendordetails]=useState([]);
  const [selectedVendor,setSelectedVendor]=useState();
  const [purchaseDate, setPurchaseDate] = useState(null);
  const [invoice_no,setinvoice_no]=useState();
  const [subtotal, setSubtotal] = useState(0);
const [totalTax, setTotalTax] = useState(0);
const [grandTotal, setGrandTotal] = useState(0);
const [items, setitems] = useState([{si_no:1 ,name: "", quantity: 0, rate: 0, tax: 0, amount: 0,},]);
const [Paymentterm,setPaymentterm]=useState('');
const [purchaseDueDate, setPurchaseDueDate] = useState(null);
const [notes,setnotes]=useState('');
    useEffect(()=>{
      let sub=0;
      let tax=0;

      items.forEach(item=>{
        const quantity = item.quantity || 0;
    const rate = item.rate || 0;
    const taxRate = item.tax || 0;

    const baseAmount = quantity * rate;
    const taxAmount = (taxRate / 100) * baseAmount;

    sub += baseAmount;
    tax += taxAmount;
  });

  setSubtotal(parseFloat(sub.toFixed(2)));
  setTotalTax(parseFloat(tax.toFixed(2)));
  setGrandTotal(parseFloat((sub + tax).toFixed(2)));
}, [items]);

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
        fetchVendorDetails();
      }, []);
  const handleAddRow = (e) => {
    console.log(...items);
    e.preventDefault();
    const lastSiNo = items.length > 0 ? parseInt(items[items.length - 1].si_no) : 0;

    setitems([
      ...items,
      {
        si_no: lastSiNo + 1,
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
    const parsedValue = field === "quantity" || field === "rate" || field === "tax"
    ? parseFloat(value) || 0
    : value;
    updatedItems[index][field] = parsedValue;
    const quantity = updatedItems[index].quantity || 0;
  const rate = updatedItems[index].rate || 0;
  const tax = updatedItems[index].tax || 0;

  const baseAmount = quantity * rate;
  const taxAmount = (tax / 100) * baseAmount;
  updatedItems[index].amount = parseFloat((baseAmount + taxAmount).toFixed(2)); // Rounded to 2 decimals

  setitems(updatedItems);

  };
  const handlepurchasebillsave = async () => {
    const formattedDate = purchaseDate ? purchaseDate.format('DD-MM-YYYY') : '';
    const formattedDueDate = purchaseDueDate ? purchaseDueDate.format('DD-MM-YYYY') : '';
    
    const purchasebilldetails={vendor_name:selectedVendor, purchase_date:formattedDate,invoice_no:invoice_no,items:items,  subtotal:subtotal,total_tax:totalTax,  total:grandTotal,payment_terms:Paymentterm,purchase_due_date:formattedDueDate, purchase_note:notes};
    try {
          // Call the addnewbill service to save the bill details
          const response = await newPurchasebill(purchasebilldetails);
          if (response.ok) {
            const data = await response.json();
            console.log("Bill Saved Successfully:", data);
            alert("Bill saved successfully!");
                   } else {
            const errorData = await response.json();
            console.error("Error saving bill:", errorData);
            alert(`Error: ${errorData.message || 'Failed to save the bill'}`);
          }
        } catch (error) {
          console.error("Error during saving bill:", error);
          alert("An unexpected error occurred while saving the bill.");
        }
    
    
  }
  
 
  return (

    <div>
      
        <Box classname="purchase_main" p={3}>
        <Typography variant="h4" gutterBottom>New Purchase Entry</Typography>
        <Grid   container spacing={2} mb={3}>
        <Grid item xs={12} md={4}>
          <Typography variant="subtitle2">Vendor</Typography>
          <Select fullWidth value={selectedVendor} onChange={(e) => setSelectedVendor(e.target.value)}>{vendordetails.map((vendor, index) => (
    <MenuItem key={index} value={vendor.vendor_name}>
      {vendor.vendor_name}
    </MenuItem>
  ))}</Select>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="subtitle2">Purchase Date</Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker  value={purchaseDate} format="DD/MM/YYYY"
    onChange={(newValue) => setPurchaseDate(newValue)} slotProps={{ textField: { fullWidth: true } }} />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="subtitle2">Invoice/Reference No.</Typography>
          <TextField fullWidth variant="outlined" onChange={(e) => setinvoice_no(e.target.value)}/>
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
                    <TextField variant='standard' InputProps={{disableUnderline:true}} onChange={(e) => handleInputChange(index,'name', e.target.value)}></TextField>
                  </TableCell>
                  <TableCell>
                    <TextField variant='standard' InputProps={{ disableUnderline: true }} onChange={(e) => handleInputChange(index, 'quantity', e.target.value)}></TextField>
                  </TableCell>
                  <TableCell>
                    <TextField variant='standard' InputProps={{disableUnderline:true,startAdornment: <InputAdornment position="start">₹</InputAdornment>}} onChange={(e) => handleInputChange(index,'rate', e.target.value)}></TextField>
                  </TableCell>
                  <TableCell>
                    <TextField variant='standard' InputProps={{disableUnderline:true,endAdornment: <InputAdornment position="end" sx={{ marginLeft: '-58px' }}>%</InputAdornment>}} onChange={(e) => handleInputChange(index,'tax', e.target.value)}></TextField>
                  </TableCell>
                  <TableCell>
                    <TextField variant='standard' InputProps={{disableUnderline:true,startAdornment: <InputAdornment position="start">₹</InputAdornment>}} value={item.amount}></TextField>
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
        <Typography>Subtotal:₹{subtotal}</Typography>
           </Box>
      <Box display="flex" justifyContent="space-between" mt={1}>
        <Typography>Tax:₹{totalTax}</Typography>
              </Box>
      <Box display="flex" justifyContent="space-between" mt={1}>
        <Typography variant="h6" fontWeight="bold">Total:₹{grandTotal}</Typography>
        
      </Box>
    </Grid>
  </Grid>
</Box>

      <Grid container spacing={2} mt={3}>
        <Grid item xs={12} md={4}>
          <Typography>Payment Terms</Typography>
          <Select fullWidth value={Paymentterm}
  onChange={(e) => setPaymentterm(e.target.value)}>
            <MenuItem value="30">Credit - 30 days</MenuItem>
            <MenuItem value="60">Credit - 60 days</MenuItem>
            <MenuItem value="paid">Paid</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography>Due Date</Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker value={purchaseDueDate} format="DD/MM/YYYY"
    onChange={(newValue) => setPurchaseDueDate(newValue)}  slotProps={{ textField: { fullWidth: true } }} />
          </LocalizationProvider>
        </Grid>
      </Grid>
      <Box className="notes-field" mt={2}>
        <TextField fullWidth placeholder="Add notes about this purchase..."  onChange={(e) => setnotes(e.target.value)}/>
      </Box>
      <Box className="footer-buttons" mt={3} display="flex" justifyContent="flex-end" gap={2}>
        <Button variant="outlined">Cancel</Button>
        <Button variant="contained" onClick={handlepurchasebillsave}>Save</Button>
      </Box>



        </div>
        </Box>

    </div>
  )
}

export default AddPurchase