import React,{useEffect,useState} from 'react'
import { useNavigate } from 'react-router-dom';

import '../InvoiceDisplay/InvoiceDisplay.css'
import Navbar from '../Navbar/Navbar';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField,Typography,TablePagination,Pagination} from '@mui/material'
import {Delete,Create} from '@mui/icons-material';
import { deleteBill, fetchbilldetails } from '../services/bill';
function InvoiceDisplay() {
    const [billDetails,setbillDetails]=useState([]);
    const [openDialog,setOpenDialog]=useState(false);
    const [deleteinvoice,setdeleteinvoice]=useState();
    const [isDeleteEnabled, setIsDeleteEnabled] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredBillDetails, setFilteredBillDetails] = useState([]);
    const itemsPerPage = 10;
    const history=useNavigate();
     useEffect(() => {
    
        const fetchbill = async () => {
            try {
                const response = await fetchbilldetails();
                if (!response) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                console.log("fetch bill details" ,data.Bill);
                setbillDetails(data.Bill);
                setFilteredBillDetails(data.Bill);
                
            } catch (error) {
                console.log(error.message);
            }
        };
    
        fetchbill();
    }, []);
    if (!billDetails) {
        return <div>Loading...</div>;
      }
     const handledelete=(index,bill)=>{
        setOpenDialog(true);
        setdeleteinvoice(bill.invoice_no);
        

     }
     const handleEdit=()=>{

     }
     const handleCancel=()=>{
        setOpenDialog(false);
     }
     const handleInvoiceChange=(e)=>{
        console.log("target",e.target.value);
        if(e.target.value===deleteinvoice){
            setIsDeleteEnabled(true);
        }
        else{
            setIsDeleteEnabled(false);
        }
     }
    const handleConfirmDelete=async(invoice_no)=>{
        try {
            const response = await deleteBill(invoice_no);
            if (response) {
                console.log("Bill deleted successfully");
                setOpenDialog(false);
                setSuccessMessage("Invoice deleted Sucessfully");
                setTimeout(()=>{
                    setSuccessMessage("");
                    window.location.reload();

                },5000);
                
                
            } else {
                console.error("Error in deletion");
            }
        } catch (error) {
            console.error('Error deleting Bill:', error);
        }

    }
    const handlePageChange = (event, value) => {
      setCurrentPage(value);
    };
    const handleSearch = (query) => {
      setSearchQuery(query); // ✅ Store the search query
    
      if (query.trim() === '') {
        setFilteredBillDetails(billDetails); // ✅ Reset to full list when empty
      } else {
        const filteredData = billDetails.filter((bill) =>{
          const matchesInvoice = bill.invoice_no.toString().toLowerCase().startsWith(query.toLowerCase());
      
      // ✅ Partial match for consignee name (can be anywhere in the text)
      const matchesConsignee = bill.consignee_name.toLowerCase().includes(query.toLowerCase());

      return matchesInvoice || matchesConsignee;
    });
        setFilteredBillDetails(filteredData);
      }
    };
  
    // Pagination logic
    const reversedBills=[...filteredBillDetails].reverse()
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentBills = reversedBills.slice(indexOfFirstItem, indexOfLastItem);
  return (
    
    <div className='invoice_display'>
        
        <div className="navbar-container">
          
          <Navbar />
        </div>
   {/* Display the success message at the top of the window */}
   {successMessage && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            backgroundColor: '#ffff',  // Green background
            color: 'black',               // White text
            padding: '15px',
            textAlign: 'center',
            fontWeight: 'bold',
            zIndex: 1000,                // Ensures it appears on top
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Slight shadow for pop effect
          }}
        >
          {successMessage}
        </div>
      )}
      <div className='table_container'>   
      <div className="table-actions">
            <Button variant="contained" color="primary" sx={{ fontSize: 16 }} onClick={()=>history('/invoices')} >
                 Invoices
            </Button>
            <Button variant="contained" color="secondary" sx={{ fontSize: 16, ml: 2 }} onClick={()=>history('/customerdisplay')} >
                Customer
            </Button>
            <Button variant="contained" color="secondary" sx={{ fontSize: 16, ml: 2 }} onClick={()=>history('/castingdisplay')}>
                Casting
            </Button>
            <TextField
  placeholder="Search by Invoice No. or Consignee Name"
  variant="outlined"
  
  value={searchQuery}
  onChange={(e) => handleSearch(e.target.value)}
  sx={{  width: 300, backgroundColor: 'white', borderRadius: 1 }}
  size='small'
/>

        </div>    
        <TableContainer>
            <Table>
<TableHead>
<TableRow sx={{backgroundColor:'#333',}}>
    <TableCell  sx={{
                  color: 'white', // White text
                  fontWeight: 'bold', // Bold font for readability
                }}>
        Invoice.No
    </TableCell>
    <TableCell  sx={{
                  color: 'white', // White text
                  fontWeight: 'bold', // Bold font for readability
                }}>
Date    </TableCell>
    
    <TableCell sx={{
                  color: 'white', // White text
                  fontWeight: 'bold', // Bold font for readability
                }}>
        Billed To
    </TableCell>
    <TableCell  sx={{
                  color: 'white', // White text
                  fontWeight: 'bold', // Bold font for readability
                }}>
        Shipped To
    </TableCell>
    <TableCell  sx={{
                  color: 'white', // White text
                  fontWeight: 'bold', // Bold font for readability
                }}>
        Quantity(Nos)
    </TableCell>
    <TableCell  sx={{
                  color: 'white', // White text
                  fontWeight: 'bold', // Bold font for readability
                }}>
        Weight(Kgs)
    </TableCell>
    <TableCell sx={{
                  color: 'white', // White text
                  fontWeight: 'bold', // Bold font for readability
                }}>
        Amount(Before Tax)
    </TableCell>
    
    <TableCell sx={{
                  color: 'white', // White text
                  fontWeight: 'bold', // Bold font for readability
                }}>
        Amount(After Tax)
    </TableCell>
    <TableCell  sx={{
                  color: 'white', // White text
                  fontWeight: 'bold', // Bold font for readability
                }}>
        Action
    </TableCell>

</TableRow>
</TableHead>
<TableBody>
    {currentBills.map((bill,index)=>(
        <TableRow key={index} >
            <TableCell>{bill.invoice_no}</TableCell>
            <TableCell>{bill.invoice_date}</TableCell>
            <TableCell>{bill.receiver_name}</TableCell>
            <TableCell>{bill.consignee_name}</TableCell>
            <TableCell>{bill.totalquantity}</TableCell>
            <TableCell>{(parseFloat(bill.totalweight)).toFixed(2)}</TableCell>
            <TableCell>{parseFloat(bill.total_before_tax).toFixed(2)}</TableCell>
            <TableCell>{parseFloat(bill.grand_total).toFixed(2)}</TableCell>
            <TableCell>
            <IconButton onClick={()=>handleEdit(index,bill)}><Create sx={{color:'green'}}/></IconButton>
                <IconButton onClick={()=>handledelete(index,bill)}><Delete sx={{color:'red'}}/></IconButton>
            
            </TableCell>
            
        </TableRow>
    ))}
</TableBody>
</Table>
        </TableContainer>
        <div style={{ display: "flex", justifyContent: "center", margin: "20px 0" }}>
          <Pagination
            count={Math.ceil(currentBills.length / itemsPerPage)}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
          />
        </div>
        <div>
            <Dialog open={openDialog} PaperProps={{
        sx: {
          borderRadius: 3,
          padding: 2,
          width: 400,
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
        },
      }}>
                <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', flexGrow: 1, textAlign: 'center' }}>Delete Invoice</Typography>
                    
                </DialogTitle>
                <Typography sx={{ px: 3, fontSize: 24, mb: 1 }}>
        To delete the invoice <strong>{deleteinvoice}</strong>, type the invoice number to confirm:
      </Typography>
                <DialogContent>
                    <TextField variant='outlined' onChange={handleInvoiceChange} size="larger" sx={{
            width: '90%',
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
              fontSize:25
            },
          }}></TextField>

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancel} color='secondary' sx={{
            borderRadius: 2,
            textTransform: 'none',
            px: 3,
            fontSize:20
          }}>Cancel</Button>
                    <Button color='error'onClick={()=>handleConfirmDelete(deleteinvoice)} disabled={!isDeleteEnabled} sx={{
            borderRadius: 2,
            textTransform: 'none',
            px: 3,
                        fontSize:20
          }}> Delete</Button>
                </DialogActions>

            </Dialog>
        </div>
        </div>
 
    </div>
  )
}

export default InvoiceDisplay