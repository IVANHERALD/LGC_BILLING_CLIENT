import { useEffect, useState } from 'react';
import React from 'react'
import { fetchcasting } from '../services/Casting';
import '../CastingDisplay/CastingDisplay.css'
import Navbar from '../Navbar/Navbar';
import { Button,TableContainer,Table,TableHead,TableRow,TableCell,TableBody,TextField,DialogActions,DialogTitle,DialogContent,Typography ,IconButton,Pagination,Dialog} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {Delete,Create} from '@mui/icons-material';

function CastingDisplay() {
  
  const [castingDetails,setcastingDetails]=useState([]);
  const [openDialog,setOpenDialog]=useState(false);
  const [deleteinvoice,setdeleteinvoice]=useState();
  const [isDeleteEnabled, setIsDeleteEnabled] = useState(false);
  const [filteredCastingDetails, setFilteredCastingDetails] = useState([]); // Holds filtered data
  const [searchQuery, setSearchQuery] = useState('');
   const [currentPage, setCurrentPage] = useState(1);
   const [selectedIndex, setSelectedIndex] = useState(null); // Store selected casting index
const [userInputIndex, setUserInputIndex] = useState(""); // Track user input for confirmation

    const itemsPerPage = 10;
  
    
  const history=useNavigate();
  useEffect(() => {
      const fetchCastingDetails = async () => {
        try {
          const response = await fetchcasting();
          if (!response) {
            throw new Error("Failed to fetch data");
          }
          const data = await response.json();
          setcastingDetails(data.casting);
          setFilteredCastingDetails(data.casting);
        } catch (error) {
          console.log(error.message);
        }
      };
      fetchCastingDetails();
    }, []);
    const handleSearchChange = (event) => {
      const query = event.target.value.toLowerCase();
      setSearchQuery(query);
  
      if (query === '') {
        setFilteredCastingDetails(castingDetails); // Reset to all data if no search input
      } else {
        const filteredData = castingDetails.filter(casting =>
          casting.casting_name.toLowerCase().includes(query)
        );
        setFilteredCastingDetails(filteredData);
      }
    };
    const handlePageChange = (event, value) => {
      setCurrentPage(value);
    };
    
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentCasting = filteredCastingDetails.slice(indexOfFirstItem, indexOfLastItem);
    const handleDeleteClick = (index) => {
      setSelectedIndex(index); // Store the selected row index
      setOpenDialog(true); // Open the confirmation dialog
    };
    const handleIndexChange = (e) => {
      const input = e.target.value;
      setUserInputIndex(input);
    
      // Enable delete button only if input matches the selected index
      setIsDeleteEnabled(input === selectedIndex.toString());
    };
    const handleConfirmDelete = () => {
      if (selectedIndex !== null) {
        console.log(`Deleting casting at index: ${selectedIndex}`);
        setOpenDialog(false);
        setSelectedIndex(null); // Reset selection
        setUserInputIndex(""); // Reset input field
        setIsDeleteEnabled(false); // Disable delete button
      }
    };
    
    
  return (
    <div className="castingdisplay">
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
            placeholder="Search by Casting Name..."
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
        Casting Name
    </TableCell>
    <TableCell  sx={{
                  color: 'white', // White text
                  fontWeight: 'bold', // Bold font for readability
                }}>
Casting Weight    </TableCell>
<TableCell  sx={{
                  color: 'white', // White text
                  fontWeight: 'bold', // Bold font for readability
                }}>
Casting HSNCODE    </TableCell>
    
    <TableCell  sx={{
                  color: 'white', // White text
                  fontWeight: 'bold', // Bold font for readability
                }}>
        Action
    </TableCell>

</TableRow>
</TableHead>
<TableBody>
    {currentCasting.map((casting,index)=>(
        <TableRow key={index} >
            <TableCell>{indexOfFirstItem+index+1}</TableCell>
            <TableCell>{casting.casting_name}</TableCell>
            <TableCell>{casting.casting_weight}</TableCell>
            <TableCell>{casting.casting_hsn}</TableCell>
                        <TableCell>
            <IconButton ><Create sx={{color:'green'}}/></IconButton>
                <IconButton onClick={()=>handleDeleteClick(indexOfFirstItem+index+1)}><Delete sx={{color:'red'}}/></IconButton>
            
            </TableCell>
            
        </TableRow>
    ))}
</TableBody>
</Table>
        </TableContainer>
        <div style={{ display: "flex", justifyContent: "center", margin: "20px 0" }}>
                  <Pagination
                    count={Math.ceil(filteredCastingDetails.length / itemsPerPage)}
                    page={currentPage}
                    onChange={handlePageChange}
                    color="primary"
                  />
                </div>
                
        
        <div>
        <Dialog open={openDialog} PaperProps={{
  sx: { borderRadius: 3, padding: 2, width: 400, boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)' }
}}>
  <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
    <Typography variant="h6" sx={{ fontWeight: 'bold', flexGrow: 1, textAlign: 'center' }}>
      Delete Casting
    </Typography>
  </DialogTitle>
  
  <Typography sx={{ px: 3, fontSize: 24, mb: 1 }}>
    To delete casting at index <strong>{selectedIndex}</strong>, type the index to confirm:
  </Typography>

  <DialogContent>
    <TextField
      variant="outlined"
      size="larger"
      value={userInputIndex}
      onChange={handleIndexChange}
      sx={{ width: '90%', '& .MuiOutlinedInput-root': { borderRadius: 2, fontSize: 25 } }}
    />
  </DialogContent>

  <DialogActions>
    <Button onClick={() => setOpenDialog(false)} color='secondary' sx={{
      borderRadius: 2, textTransform: 'none', px: 3, fontSize: 20
    }}>
      Cancel
    </Button>
    
    <Button color='error' onClick={handleConfirmDelete} disabled={!isDeleteEnabled} sx={{
      borderRadius: 2, textTransform: 'none', px: 3, fontSize: 20
    }}>
      Delete
    </Button>
  </DialogActions>
</Dialog>
        </div></div></div>
  )
}

export default CastingDisplay