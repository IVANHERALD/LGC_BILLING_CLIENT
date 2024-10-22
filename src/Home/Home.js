import React from 'react'
import '../../src/Home/Home.css';
import { TextField } from '@mui/material';

function Home() {
  return (
    <div>
         <div  className="invoice-container">
        <header className="invoice-header">
        <div className='header-left'>
            <h4><u>TAX INVOICE</u></h4>
          <h2>LAKSHMI GRADE CASTINGS</h2>
          <p>MFRS. QUALITY C.I. ROUGH CASTINGS</p>
          <p>420/2, V.K. Road, Thanneer Panthal, Peelamedu, Coimbatore - 641 004</p>
          <div className='header-right'></div>
            <p>GSTIN:33AVBPS2620N1ZJ</p>
            <p>PAN: AVBPS2620N</p>
            <p>Mobile: 93626 96934, 93625 12210</p>
          </div>
          
        </header>
        <span>
        <label>INVOICE NO:</label>
        <TextField variant='standard' className='input-field'></TextField ><br/>
        <TextField variant='standard' label="INVOICE DATE:"></TextField><br/>
        <TextField variant='standard' label="STATE:"></TextField>&nbsp;&nbsp;
        <TextField variant='standard' label="STATE code:"></TextField>
        </span>
        <span>
        <TextField variant='standard' label="Name of Transport:"></TextField><br/>
        <TextField variant='standard' label="Vehicle Number:"></TextField><br/>
        <TextField variant='standard' label="Date of Supply:"></TextField><br/>
        <TextField variant='standard' label="Place of Supply:"></TextField><br/>
        <TextField variant='standard' label="Po.No. & Date:"></TextField><br/>
        <TextField variant='standard' label="E-WAY Bill No:"></TextField><br/>
        </span>
        <span>
            <h5>Details of Receiver/Billed To</h5>
            <TextField variant='standard' label="Name:"></TextField><br/>
            <TextField variant='standard' label="Address:"></TextField><br/>
            <TextField variant='standard' label="GSTIN:"></TextField><br/>
            <TextField variant='standard' label="STATE:"></TextField>
            <TextField variant='standard' label="STATE CODE:"></TextField>
        </span>
        <span>
        <h5>Details of Receiver/Billed To</h5>
        <TextField variant='standard' label="Name:"></TextField><br/>
        <TextField variant='standard' label="Address:"></TextField><br/>
        <TextField variant='standard' label="GSTIN:"></TextField><br/>
        <TextField variant='standard' label="State:"></TextField><br/>
        </span>
        <span>
            <p>Total Invoice Amount in Words:</p>
        </span>
        <span>
        <footer className="invoice-footer">
        <p>Terms and Conditions:
            </p>
            <p>
                Goods once sold not to be taken back.Our responsibility ceases after the goods have delivered.Subject to Coimbatore Jurisdiction.No Claim for breakage and shortage during transit.
                Interest @24% will be charged if the bills are not settled before 30 days.
            </p>
        <p>Certified that the particulars given above are true and correct.</p>
        <p>For LAKSHMI GRADE CASTINGS</p>
        <p>(Common Seal) | Authorized Signatory</p>
      </footer>
            
        </span>
        </div>
        
    </div>
  )
}

export default Home