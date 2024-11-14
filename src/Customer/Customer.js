import '../Customer/Customer.css';

import { Button, TextField } from '@mui/material'
import React, { useState, useEffect } from 'react'
import Navbar from '../Navbar/Navbar';

function Customer() {
  const [consignee_name, setconsignee_name] = useState('')
  const [consignee_address, setconsignee_address] = useState('')
  const [consignee_gstin, setconsignee_gstin] = useState('')
  const [consignee_state, setconsignee_state] = useState('')
  const [consignee_state_code, setconsignee_state_code] = useState('')


  return (
    <div className='container'>
      <div><Navbar /></div>

      <div className='admin_form'>
        <div className='title'> ADD CUSTOMER DETAILS</div>
        <TextField variant='outlined' label="Consignee Name" sx={{ backgroundColor: "#ffff", borderRadius: '5px' }} value={consignee_name} onChange={(e) => setconsignee_name(e.target.value)} ></TextField>
        <TextField variant='outlined' label="Consignee Address" sx={{ backgroundColor: "#ffff", borderRadius: '5px' }} value={consignee_address} onChange={(e) => setconsignee_address(e.target.value)}></TextField>
        <TextField variant='outlined' label="Consignee GSTIN" sx={{ backgroundColor: "#ffff", borderRadius: '5px' }} value={consignee_gstin} onChange={(e) => setconsignee_gstin(e.target.value)}></TextField>
        <TextField variant='outlined' label="Consignee State" sx={{ backgroundColor: "#ffff", borderRadius: '5px' }} value={consignee_state} onChange={(e) => setconsignee_state(e.target.value)}></TextField>
        <TextField variant='outlined' label="Consignee State Code" sx={{ backgroundColor: "#ffff", borderRadius: '5px' }} value={consignee_state_code} onChange={(e) => setconsignee_state_code(e.target.value)}></TextField>
        <Button variant='outlined' sx={{
          backgroundColor: "#ffff", borderRadius: '5px', borderColor: "black", color: "black", '&:hover': {
            backgroundColor: '#ffff', color: "black", borderColor: "black"

          }
        }}>ADD CONSIGNEE</Button>

      </div>
    </div>
  )
}

export default Customer