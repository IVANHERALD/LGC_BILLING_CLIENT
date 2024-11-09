import React from 'react'
import '../../src/Home/Home.css';
import { TextField,Button } from '@mui/material';
import lgc from '../assest/lgc.svg';
import Invoice from '../Invoice/Invoice';

function Home() {
  const handlePrint = () => {
    window.print();
  };
  return (
    <div>
      
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
        
        <TextField variant='standard' label="Invoice No:"></TextField ><br/>
        <TextField variant='standard' label="Invoice Date:"></TextField><br/>
        <TextField variant='standard' label="State:"></TextField>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <TextField variant='standard' label="State code:"></TextField>
        </div>
        <hr className='horizontal-line'/>
        <div className="vertical_line"></div>
        <div className='invoice_details_set2'>
        
        <TextField variant='standard' label="Name of Transport:"></TextField><br/>
        <TextField variant='standard' label="Vehicle Number:"></TextField><br/>
        <TextField variant='standard' label="Date of Supply:"></TextField><br/>
        <TextField variant='standard' label="Place of Supply:"></TextField><br/>
        <TextField variant='standard' label="Po.No. & Date:"></TextField><br/>
        <TextField variant='standard' label="E-WAY Bill No:"></TextField><br/></div>
        </div>
        <span>
        <hr className='horizontal-line'/>
            <h5>Details of Receiver/Billed To</h5>
            <hr className='horizontal-line'/>
            <div className='invoice_details_set1'>
            <TextField variant='standard' label="Name:"></TextField><br/>
            <TextField variant='standard' label="Address:"></TextField><br/>
            <TextField variant='standard' label="GSTIN:"></TextField><br/>
            <TextField variant='standard' label="State:"></TextField>
            <TextField variant='standard' label="State code:"></TextField>
            </div>
        </span>
        <span>
        <h5>Details of Consignee/Shipped To</h5>
        <div className='invoice_details_set2'>
        <TextField variant='standard' label="Name:"></TextField><br/>
        <TextField variant='standard' label="Address:"></TextField><br/>
        <TextField variant='standard' label="GSTIN:"></TextField><br/>
        <TextField variant='standard' label="State:"></TextField><br/>
        </div>
        </span>
        <hr className='horizontal-line'/>
        <div>
          <Invoice/>
        </div>
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
            <div>
              <p>(Common Seal)</p>
            </div>
            <div className="vertical_line"></div>
        <p>Certified that the particulars given above are true and correct.</p>
        <p>For LAKSHMI GRADE CASTINGS</p>
        <p> Authorized Signatory</p>
      </footer>
      
        </span>
        </div>
        <center>
        <div className="print-button-container">
        <Button variant="contained" color="primary" onClick={handlePrint}>
          Print Invoice
        </Button>&nbsp;&nbsp;&nbsp;&nbsp;
        <Button variant="contained" color="success" onClick={handlePrint}>
          Review Invoice
        </Button>
        </div></center>
        
    </div>
  )
}

export default Home