import { Table, TableContainer,TableCell,TableRow,TableHead,Paper, TextField ,TableBody,Button} from '@mui/material'
import React from 'react'

function Invoice() {
  return (
    <div> <TableContainer component={Paper} className="tb-container">
    <Table aria-label="simple table">
        <TableHead>
        <TableRow>
            <TableCell sx={{ padding: '3px',borderRight: '1px solid black',width:'5%'  }}>SI.No</TableCell>
            <TableCell sx={{ padding: '9px',borderRight: '1px solid black',width:'20%'   }}>Name Of Products</TableCell>
            <TableCell sx={{ padding: '3px',borderRight: '1px solid black',width:'23%'  }}>HSN CODE</TableCell>
            <TableCell sx={{ padding: '9px',borderRight: '1px solid black',width:'15%'   }}>Qty</TableCell>
            <TableCell sx={{ padding: '3px',borderRight: '1px solid black' ,width:'10%' }} >Weight</TableCell>
            <TableCell sx={{ padding: '3px',borderRight: '1px solid black',width:'15%'  }} >Rate</TableCell>
            <TableCell sx={{ padding: '3px',borderRight: '1px solid black' ,width:'10%'  }} >Taxable Value</TableCell>
            <TableCell sx={{ padding: '5px' }} >Action</TableCell>
        </TableRow>
        </TableHead>
        <TableBody>
            <TableRow>
                <TableCell sx={{borderRight: '1px solid black' }} >
                    <TextField variant='standard' InputProps={{ sx: { fontSize: '15px' } }} />
                </TableCell>
                <TableCell sx={{borderRight: '1px solid black' }}> 
                    <TextField variant='standard' multiline sx={{width:'200px'}} InputProps={{ disableUnderline: true, sx: { fontSize: '15px'} }}/>
                </TableCell>
                <TableCell sx={{borderRight: '1px solid black' }} >
                    <TextField variant='standard' InputProps={{ sx: { fontSize: '15px' } }} />
                </TableCell>
                <TableCell sx={{borderRight: '1px solid black' }} >
                    <TextField variant='standard' InputProps={{ sx: { fontSize: '15px' } }} />
                </TableCell>
                <TableCell sx={{borderRight: '1px solid black' }}>
                    <TextField variant='standard' InputProps={{ sx: { fontSize: '15px' } }}/>
                </TableCell>
                <TableCell sx={{borderRight: '1px solid black' }}>
                    <TextField variant='standard' sx={{width:'40px'}} InputProps={{ sx: { fontSize: '15px' } }}/>
                </TableCell>
                <TableCell sx={{borderRight: '1px solid black' }}>
                    <TextField variant='standard'InputProps={{ sx: { fontSize: '15px' } }}  />
                </TableCell>
                <TableCell>
                  <Button  >-</Button>
                </TableCell>
            </TableRow>
        </TableBody>
        
        </Table>
        </TableContainer>
        <div>
                <Button>+</Button> 
            </div>

</div>
  )
}

export default Invoice