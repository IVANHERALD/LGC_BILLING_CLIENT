import React, { useState,useEffect} from 'react'
import '../../src/Home/Home.css';
import { TextField,Button,Typography,Box } from '@mui/material';
import lgc from '../assest/lgc.svg';
import Invoice from '../Invoice/Invoice';
import Navbar from '../Navbar/Navbar';

function Home() {
  const [invoice_no,setinvoice_no]=useState('');
  const [invoice_date,setinvoice_date]=useState('');
  const [state,setstate]=useState('TamilNadu');
  const [state_code,setstate_code]=useState('33');
  const [transport_name,settransport_name]=useState('');
  const [vehicle_number,setvehicle_number]=useState('');
  const [date_of_supply,setdate_of_supply]=useState('');
  const [place_of_supply,setplace_of_supply]=useState('');
  const [pono_date,setpono_date]=useState('');
  const [eway_bill_no,seteway_bill_no]=useState('');
  const [receiver_name,setreceiver_name]=useState('');
  const [receiver_address,setreceiver_address]=useState('');
  const [receiver_gstin,setreceiver_gstin]=useState('');
  const [receiver_state,setreceiver_state]=useState('');
  const [receiver_state_code,setreceiver_state_code]=useState('');
  const [consignee_name,setconsignee_name]=useState('');
  const [consignee_address,setconsignee_address]=useState('');
  const [consignee_gstin,setconsignee_gstin]=useState('');
  const [consignee_state,setconsignee_state]=useState('');
  const [consignee_state_code,setconsignee_state_code]=useState('');
  
  
  
  
  const handlePrint = () => {
    window.print();
    console.log(invoice_no,invoice_date,state,state_code,transport_name,vehicle_number,date_of_supply,place_of_supply,pono_date,eway_bill_no,receiver_name,receiver_address,receiver_gstin,receiver_state,receiver_state_code,consignee_name,consignee_address,consignee_gstin,consignee_state,consignee_state_code);
  };
  useEffect(() => {
    const now = new Date();
    const formattedDateTime = `${now.toLocaleDateString()} ${now.toLocaleTimeString([], { hour12: false })}`; // Formats date and time according to system locale
    setinvoice_date(formattedDateTime);
  }, []);
  return (
    <div>
      <Navbar/>
      <div className="watermark-container">
        <div className="watermark">Lakshmi Grade Casting</div>
         <div  className="invoice-container">
        
        <header className="invoice-header">
          <div className='header-content'>
        <div className='logo_container'><img src={lgc} className='logo'/></div>
        <div className='header-left'>
        
            <h4><u>TAX INVOICE</u></h4>
          <h2>LAKSHMI GRADE CASTINGS</h2>
          <p>MFRS. QUALITY C.I. ROUGH CASTINGS</p>
          <p>420/2, V.K. Road, Thanneer Panthal, Peelamedu, Coimbatore - 641 004</p>
          <div className='header_right'></div>
            <p>GSTIN:33AVBPS2620N1ZJ</p>
            <p>PAN: AVBPS2620N</p>
            <p>Mobile: 93626 96934, 93625 12210</p>
          </div>
          </div>
        </header>
        <hr className='horizontal-line'/>
          <div className='invoice_details'>
            <div className='invoice_details_set1'>
            <Box display={'flex'} alignItems="center" gap={5}>
            <Typography variant="body1" sx={{ fontSize: '0.85rem' ,fontWeight: 'bold'}}>Invoice No:</Typography> 
        <TextField variant='standard' value={invoice_no} onChange={(e)=>setinvoice_no(e.target.value)}></TextField ></Box><br/>
        <Box display={'flex'} alignItems="center" gap={5}>
        <Typography variant="body1" sx={{ fontSize: '0.75rem',fontWeight: 'bold' }}>Invoice Date:</Typography> 
        <TextField variant='standard' value={invoice_date}></TextField></Box><br/>
        <Box display={'flex'} alignItems="center" gap={5}>
        <Typography variant="body1" sx={{ fontSize: '0.75rem',fontWeight: 'bold' }}>State:</Typography> 
        <TextField variant='standard' value={state} sx={{width:'180px'}}></TextField>
        <Typography variant="body1" sx={{ fontSize: '0.75rem',fontWeight: 'bold' }}>State code:</Typography> 
        <TextField variant='standard'value={state_code} ></TextField></Box>
        </div>
        <hr className='horizontal-line'/>
        <div className="vertical_line"></div>
        <div className='invoice_details_set2'>
        <Box display={'flex'} alignItems="center" gap={5}>
        <Typography variant="body1" sx={{ fontSize: '0.41rem',fontWeight: 'bold' }}>Name of Transport:</Typography> 
        <TextField variant='standard' InputProps={{ disableUnderline: true }} value={transport_name} onChange={(e)=>settransport_name(e.target.value)}></TextField></Box><br/>
        <Box display={'flex'} alignItems="center" gap={5}>
        <Typography variant="body1" sx={{ fontSize: '0.75rem',fontWeight: 'bold' }}>Vehicle Number:</Typography> 
        <TextField variant='standard'  onChange={(e)=>setvehicle_number(e.target.value)}  ></TextField></Box><br/>
        <Box display={'flex'} alignItems="center" gap={5}>
        <Typography variant="body1" sx={{ fontSize: '0.70rem',fontWeight: 'bold' }}>Date of Supply:</Typography> 
        <TextField variant='standard' onChange={(e)=>setdate_of_supply(e.target.value)}  ></TextField></Box><br/>
        <Box display={'flex'} alignItems="center" gap={5}>
        <Typography variant="body1" sx={{ fontSize: '0.70rem',fontWeight: 'bold' }} onChange={(e)=>setplace_of_supply(e.target.value)}  >Place of Supply:</Typography> 
        <TextField variant='standard' ></TextField></Box><br/>
        <Box display={'flex'} alignItems="center" gap={5}>
        <Typography variant="body1" sx={{ fontSize: '0.70rem',fontWeight: 'bold' }} >Po.No. & Date:</Typography> 
        <TextField variant='standard' onChange={(e)=>setpono_date(e.target.value)} ></TextField></Box><br/>
        <Box display={'flex'} alignItems="center" gap={5}>
        <Typography variant="body1" sx={{ fontSize: '0.70rem',fontWeight: 'bold' }}>E-WAY Bill No:</Typography> 
        <TextField variant='standard' onChange={(e)=>seteway_bill_no(e.target.value)} ></TextField></Box><br/></div>
        </div>
        <span>
        <hr className='horizontal-line'/>
            <h5>Details of Receiver/Billed To</h5><div className="vertical_line"></div>
            <h5>Details of Consignee/Shipped To</h5>
            <hr className='horizontal-line'/>
            
            <div className='invoice_details_set1'>
            <Box display={'flex'} alignItems="center" gap={5}>
            <Typography variant="body1"  sx={{ fontSize: '0.85rem',fontWeight: 'bold'  }}>Name:</Typography> 
            <TextField variant='standard' sx={{ width: '250px' }} onChange={(e)=>setreceiver_name(e.target.value)} ></TextField></Box><br/>
            <Box display={'flex'} alignItems="center" gap={3}>
            <Typography variant="body1"  sx={{ fontSize: '0.85rem',fontWeight: 'bold'  }}>Address:</Typography> 
            <TextField variant='standard' sx={{ width: '450px' }} MULTILINE onChange={(e)=>setreceiver_address(e.target.value)}></TextField></Box><br/>
            <Box display={'flex'} alignItems="center" gap={4.5}>
            <Typography variant="body1"  sx={{ fontSize: '0.85rem',fontWeight: 'bold'  }}>GSTIN:</Typography> 
            <TextField variant='standard' sx={{ width: '250px' }} onChange={(e)=>setreceiver_gstin(e.target.value)}></TextField ></Box><br/>
            <Box display={'flex'} alignItems="center" gap={5}>
            <Typography variant="body1"  sx={{ fontSize: '0.85rem',fontWeight: 'bold'  }}>State:</Typography> 
            <TextField variant='standard' sx={{ width: '100px' }} onChange={(e)=>setreceiver_state(e.target.value)}></TextField></Box>
            <Box display={'flex'} alignItems="center" gap={3}>
            <Typography variant="body1"  sx={{ fontSize: '0.85rem',fontWeight: 'bold'  }}>State code:</Typography> 
            <TextField variant='standard' sx={{ width: '250px' }} onChange={(e)=>setreceiver_state_code(e.target.value)} ></TextField></Box>
            </div>
            
        </span>
        <span>
        
        
        <Box display={'flex'} alignItems="center" gap={5}>
        <Typography variant="body1" sx={{ fontSize: '0.85rem',fontWeight: 'bold'  }}>Name:</Typography> 
        <TextField variant='standard' sx={{ width: '250px' }} onChange={(e)=>setconsignee_name(e.target.value)}></TextField></Box><br/>
        <Box display={'flex'} alignItems="center" gap={3}>
        <Typography variant="body1" sx={{ fontSize: '0.85rem',fontWeight: 'bold'  }} >Address:</Typography>
        <TextField variant='standard'  sx={{ width: '200px' }} multiline onChange={(e)=>setconsignee_address(e.target.value)}></TextField><br/></Box><br/>
        <Box display={'flex'} alignItems="center" gap={4.5}>
        <Typography variant="body1" sx={{ fontSize: '0.85rem',fontWeight: 'bold'  }}>GSTIN:</Typography>
        <TextField variant='standard'  sx={{ width: '200px' }} onChange={(e)=>setconsignee_gstin(e.target.value)}></TextField></Box><br/>
        <Box display={'flex'} alignItems="center" gap={5}>

        <Typography variant="body1"sx={{ fontSize: '0.85rem',fontWeight: 'bold'  }}>State:</Typography>
        <TextField variant='standard'  sx={{ width: '200px' }} onChange={(e)=>setconsignee_state(e.target.value)}></TextField><br/></Box>
        <Box display={'flex'} alignItems="center" gap={3}>
            <Typography variant="body1"  sx={{ fontSize: '0.85rem',fontWeight: 'bold'  }}>State code:</Typography> 
            <TextField variant='standard' sx={{ width: '250px' }} onChange={(e)=>setconsignee_state_code(e.target.value)}></TextField></Box>
        
        
        </span>
        <hr className='horizontal-line'/>
        <div>
          <Invoice/>
        </div>
        <hr className='horizontal-line'/>
        <span>

            <p>Total Invoice Amount in Words:</p>
        </span>
        <hr className='horizontal-line'/>
        <span>
        <footer className="invoice-footer">
        <p>Terms and Conditions:
            </p>
            <p>
                Goods once sold not to be taken back.Our responsibility ceases after the goods have delivered.Subject to Coimbatore Jurisdiction.No Claim for breakage and shortage during transit.
                Interest @24% will be charged if the bills are not settled before 30 days.
            </p>
            <div className="vertical_line"></div>
            <div className="seal">
              <p>(Common Seal)</p>
            </div>
            <div className="vertical_line"></div>
          <div className='signature'>
        <p>Certified that the particulars given above are true and correct.</p>
        <p>For LAKSHMI GRADE CASTINGS</p>
        <p> Authorized Signatory</p>
        </div>
        
      </footer>
      
        </span>
        </div>
        </div>
        <center>
        <div className="print-button-container">
        <Button variant="contained" color="primary" onClick={handlePrint}>
          Print Invoice
        </Button>&nbsp;&nbsp;&nbsp;&nbsp;
        <Button variant="contained" color="success" onClick={handlePrint}>
          Review Invoice
        </Button>&nbsp;&nbsp;&nbsp;&nbsp;
        <Button variant="contained" color="error" onClick={handlePrint}>
          Exit
        </Button>
        </div></center>
        
    </div>
  )
}

export default Home