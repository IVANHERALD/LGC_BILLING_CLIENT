import React, { useState,useEffect } from 'react'
import '../CustomerDisplay/CustomerDisplay.css'
import { fetchcustomer } from '../services/Customer';
import Navbar from '../Navbar/Navbar';
import { Button,TableContainer,Table,TableHead,TableRow,TableCell,TableBody,TextField,DialogActions,DialogTitle,DialogContent,Typography ,IconButton,Pagination,Dialog} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {Delete,Create} from '@mui/icons-material';



function CustomerDisplay() {
  const [customerDetails, setcustomerDetails] = useState([]);
  const [filteredCustomerDetails, setFilteredCustomerDetails] = useState([]); 
  const [searchQuery, setSearchQuery] = useState('');
  const [openDialog,setOpenDialog]=useState(false);
  const [deleteinvoice,setdeleteinvoice]=useState();
  const [isDeleteEnabled, setIsDeleteEnabled] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); 
  const itemsPerPage = 10; 
      
  const history=useNavigate();
   useEffect(() => {
  
      const fetchCustomerDetails = async () => {
          try {
              const response = await fetchcustomer();
              if (!response) {
                  throw new Error('Failed to fetch data');
              }
              const data = await response.json();
              console.log("fetch customer details" ,data.customers);
              setcustomerDetails(data.customers);
              setFilteredCustomerDetails(data.customers)
              console.log("console",data.customers);
          } catch (error) {
              console.log(error.message);
          }
      };
  
      fetchCustomerDetails();
  }, []);
  const handleSearchChange = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    if (query ==='') {
        setFilteredCustomerDetails(customerDetails);
    } else {
      const filteredData = customerDetails.filter((customer) =>
        customer.consignee_name.toLowerCase().includes(query)
      );
      setFilteredCustomerDetails(filteredData);
    }
  };
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCustomers = filteredCustomerDetails.slice(indexOfFirstItem, indexOfLastItem);
  
  return (
    <div className='customerdisplay'>
      <div><Navbar/></div><div className='table_container'>   
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
            variant="outlined"
            placeholder="Search by Consignee Name..."
            size="small"
            value={searchQuery}
            onChange={handleSearchChange}
            sx={{ marginLeft: 'auto', width: 300, backgroundColor: 'white', borderRadius: 1 }}
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
        S.No
    </TableCell>
    <TableCell sx={{
                  color: 'white', // White text
                  fontWeight: 'bold', // Bold font for readability
                }}>
        Consignee Name
    </TableCell>
    <TableCell  sx={{
                  color: 'white', // White text
                  fontWeight: 'bold', // Bold font for readability
                }}>
Consignee Address    </TableCell>
<TableCell  sx={{
                  color: 'white', // White text
                  fontWeight: 'bold', // Bold font for readability
                }}>
Consignee GSTIN    </TableCell>
    
    <TableCell  sx={{
                  color: 'white', // White text
                  fontWeight: 'bold', // Bold font for readability
                }}>
        Consignee State
    </TableCell>
    <TableCell  sx={{
                  color: 'white', // White text
                  fontWeight: 'bold', // Bold font for readability
                }}>
        Consignee State Code
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
    {currentCustomers.map((customer,index)=>(
        <TableRow key={index} >
            <TableCell>{index+1}</TableCell>
            <TableCell>{customer.consignee_name}</TableCell>
            <TableCell>{customer.consignee_address}</TableCell>
            <TableCell>{customer.consignee_gstin}</TableCell>
            <TableCell>{customer.consignee_state}</TableCell>
            <TableCell>{customer.consignee_state_code}</TableCell>
            
            <TableCell>
            <IconButton ><Create sx={{color:'green'}}/></IconButton>
                <IconButton ><Delete sx={{color:'red'}}/></IconButton>
            
            </TableCell>
            
        </TableRow>
    ))}
</TableBody>
</Table>
        </TableContainer>
        <div style={{ display: "flex", justifyContent: "center", margin: "20px 0" }}>
          <Pagination
            count={Math.ceil(filteredCustomerDetails.length / itemsPerPage)}
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
        To delete the invoice <strong>{}</strong>, type the invoice number to confirm:
      </Typography>
                <DialogContent>
                    <TextField variant='outlined' size="larger" sx={{
            width: '90%',
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
              fontSize:25
            },
          }}></TextField>

                </DialogContent>
                <DialogActions>
                    <Button  color='secondary' sx={{
            borderRadius: 2,
            textTransform: 'none',
            px: 3,
            fontSize:20
          }}>Cancel</Button>
                    <Button color='error' disabled={!isDeleteEnabled} sx={{
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

export default CustomerDisplay