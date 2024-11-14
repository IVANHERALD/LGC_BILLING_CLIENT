import { Table, TableContainer, TableCell, TableRow, TableHead, Paper, TextField, TableBody, Button } from '@mui/material'
import React, { useState } from 'react'
import NumberToWords from '../Wordgen/wordgen';

function Invoice() {
    const[items,setitems]=useState([{}])
    const [cgst, setCgst] = useState();
  const [sgst, setSgst] = useState();
  const [igst, setIgst] = useState();
    const handleAddRow = (e) => {
        e.preventDefault(); 
        setitems([...items, { si_no: '', name: 0,hsn: 0, qty: 0, weight: 0 ,rate:0,value:0}]);
       
      };
      const handleRemoveRow = (index) => {
        const updatedItems = [...items];
        updatedItems.splice(index, 1);
        setitems(updatedItems);
        console.log(items)
      };
      const handleInputChange = (index, field, value) => {
        const updatedItems = [...items];
        updatedItems[index] = { ...updatedItems[index], [field]: value };

        // Recalculate taxable value if weight or rate changes
        if (field === 'weight' || field === 'rate') {
            updatedItems[index].value = updatedItems[index].weight * updatedItems[index].rate;
        }

        setitems(updatedItems);
    };
    const totalTaxableValue = items.reduce((total, item) => total + (item.value || 0), 0);
  const cgstAmount = (totalTaxableValue * cgst) / 100;
  const sgstAmount = (totalTaxableValue * sgst) / 100;
  const igstAmount = (totalTaxableValue * igst) / 100;
  const totalGrandAmount = totalTaxableValue + cgstAmount + sgstAmount + igstAmount;
  const roundOffAmount = (amount) => {
    const rupee = Math.floor(amount); // Get the whole rupee part
    const paise = amount - rupee; // Get the decimal part (paise)

    // If paise >= 0.50, round up to next rupee
    if (paise >= 0.50) {
      return Math.ceil(amount); // Round up
    }
    // Else round down (floor)
    return Math.floor(amount); // Round down
  };

  const roundedTotalGrandAmount = roundOffAmount(totalGrandAmount);

    return (
        <div> <TableContainer component={Paper} className="tb-container">
            
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ padding: '2px', borderRight: '1px solid black', width: '2.5%' }}>SI.No</TableCell>
                        <TableCell sx={{ padding: '2px', borderRight: '1px solid black', width: '20%' }}>Name Of Products</TableCell>
                        <TableCell sx={{ padding: '2px', borderRight: '1px solid black', width: '12.5%' }}>HSN CODE</TableCell>
                        <TableCell sx={{ padding: '2px', borderRight: '1px solid black', width: '8%' }}>Qty</TableCell>
                        <TableCell sx={{ padding: '3px', borderRight: '1px solid black', width: '10%' }} >Weight</TableCell>
                        <TableCell sx={{ padding: '2px', borderRight: '1px solid black', width: '9%' }} >Rate</TableCell>
                        <TableCell sx={{ padding: '2px', width: '10%' }} >Taxable Value</TableCell>
                        
                    </TableRow>
                </TableHead>
                <TableBody>
                    {items.map((item,index)=>(
                    <TableRow>
                        <TableCell sx={{ borderRight: '1px solid black' }} >
                            <TextField variant='standard' InputProps={{ sx: { fontSize: '15px' } }} value={index+1} />
                        </TableCell>
                        <TableCell sx={{ borderRight: '1px solid black' }}>
                            <TextField variant='standard' multiline sx={{ width: '200px' }} InputProps={{ disableUnderline: true, sx: { fontSize: '15px' } }} />
                        </TableCell>
                        <TableCell sx={{ borderRight: '1px solid black' }} >
                            <TextField variant='standard' InputProps={{ sx: { fontSize: '15px' } }} />
                        </TableCell>
                        <TableCell sx={{ borderRight: '1px solid black' }} >
                            <TextField variant='standard' InputProps={{ sx: { fontSize: '15px' } }}  onChange={(e) => handleInputChange(index, 'qty', parseInt(e.target.value) || 0)} />
                        </TableCell>
                        <TableCell sx={{ borderRight: '1px solid black' }}>
                            <TextField variant='standard' onChange={(e) => handleInputChange(index, 'weight', parseFloat(e.target.value) || 0)} InputProps={{ sx: { fontSize: '15px' } }}  />
                        </TableCell>
                        <TableCell sx={{ borderRight: '1px solid black' }}>
                            <TextField variant='standard' sx={{ width: '40px' }} InputProps={{ sx: { fontSize: '15px' } }} onChange={(e) => handleInputChange(index, 'rate', parseFloat(e.target.value) || 0)} />
                        </TableCell>
                        <TableCell>
                            <TextField variant='standard' InputProps={{ sx: { fontSize: '15px' } }}  value={item.value||0}/>
                        </TableCell>
                        
                            
                        
                    </TableRow>
))}
                </TableBody>

            </Table>
        </TableContainer>
            <div>
                <Button onClick={handleAddRow}>+</Button>
                <Button onClick={() => handleRemoveRow()} >-</Button>
            </div>
            <hr className='horizontal-line' />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',height: '320px' }}>
            <div className='total_amount_words' style={{ flex: 1 }}>
            <p>Total Invoice Amount in Words:<NumberToWords total={totalTaxableValue}/></p></div>
            <div style={{ width: '1px', backgroundColor: '#000', height: '100%',display:'flex'}} />
            <div className='total_amount' style={{ flex: 1, paddingLeft: '20px' }}>
            
                <p>Total Amount Before Tax:{totalTaxableValue}</p>
                <hr className='horizontal-line' />
                <p>Add.CGST<TextField variant='standard' value={cgst}
            onChange={(e) => setCgst(parseFloat(e.target.value) || 0)}/></p> <span> ({cgstAmount.toFixed(2)})</span>
            <hr className='horizontal-line' />
                <p>Add.SGST<TextField variant='standard' value={sgst}
            onChange={(e) => setSgst(parseFloat(e.target.value) || 0)}/></p><span> ({sgstAmount.toFixed(2)})</span>
            <hr className='horizontal-line' />
                <p>Add.IGST <TextField variant='standard' value={igst}
            onChange={(e) => setIgst(parseFloat(e.target.value) || 0)}/></p><span> ({igstAmount.toFixed(2)})</span>
            <hr className='horizontal-line' />
                <p>Total Grand Amount{roundedTotalGrandAmount}</p>

            </div>

          </div>
          <hr className='horizontal-line' />

        </div>
    )
}

export default Invoice