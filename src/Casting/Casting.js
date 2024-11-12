
import { Button, TextField } from '@mui/material'
import React,{useState,useEffect} from 'react'

function Casting() {
    const [casting_name, setcasting_name] = useState('')
    const [casting_weight, setcasting_weight] = useState('')
    
  return (

    <div>
<div className='admin_form'>
       <div className='title'> ADD CUSTOMER DETAILS</div>
        <TextField variant='outlined' label="Casting Name" sx={{backgroundColor:"#ffff",borderRadius:'5px'}} value={casting_name} onChange={(e)=>setcasting_name(e.target.value)} ></TextField>
        <TextField variant='outlined' label="Casting Weight" sx={{backgroundColor:"#ffff",borderRadius:'5px'}} value={casting_weight} onChange={(e)=>setcasting_weight(e.target.value)}></TextField>
        
        <Button variant='outlined'  sx={{backgroundColor:"#ffff",borderRadius:'5px',borderColor:"black",color:"black",'&:hover':{backgroundColor:'#ffff',color:"black",borderColor:"black"

}}}>ADD CASTING</Button>
      
    </div>
 
    </div>
  )
}

export default Casting