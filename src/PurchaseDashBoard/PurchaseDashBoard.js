import React from 'react'
import Navbar from '../Navbar/Navbar';
import { Button, Card, CardContent,Table,TableBody,TableCell,TableHead,TableRow,TableContainer, Paper ,Select,MenuItem} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import '../../src/PurchaseDashBoard/PurchaseDashBoard.css'


function PurchaseDashBoard() {
  const history = useNavigate();
  return (
    <div><div className='dashboard_container'>
      <div>
        <Navbar /></div>
      <div className="dashboard">
        <Button variant="contained" sx={{ fontSize: 16, ml: 2, backgroundColor: '#FF7043', '&:hover': { backgroundColor: '#F4511E' } }} onClick={() => history('/dashboard')}>Sales DashBoard
        </Button>
        <Button variant="contained" sx={{ fontSize: 16, ml: 2, backgroundColor: '#66BB6A', '&:hover': { backgroundColor: '#43A047' } }} onClick={() => history('/purchasedashboard')}>Purchase DashBoard
        </Button>
        <div className='purchase_transaction_card'>
          <Card variant='outlined' sx={{ width: '100%', mt: 4 }}>
          <CardContent sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><h1>Purchase Transaction</h1>
        <div style={{ display: 'flex', gap: '20px' }}>
          <Button variant='contained' sx={{ backgroundColor: '#42A5F5', '&:hover': { backgroundColor: '#1E88E5' }}} onClick={()=>history('/addpurchase')}>Add Purchase</Button>
          <Button variant='contained' sx={{ backgroundColor: '#66BB6A', '&:hover': { backgroundColor: '#43A047' } }} onClick={()=>history('/addpayment')}>Add Payment</Button>
        </div>
          </CardContent>
          </Card> 
        </div>
        <div className='purchase_main_dashboard'>
          <Card>
            <CardContent>Total Purchase</CardContent>
          </Card>
          <Card>
            <CardContent>Total Payments</CardContent>
          </Card>
          <Card>
            <CardContent>OutStanding</CardContent>
          </Card>
        </div>
        <div className='purchase_filter'>
          <Card>
            <CardContent>
              <label>Vendor</label>
              <Select></Select>
            </CardContent>
            <CardContent>
              <label>Date Range</label>
              <Select>
               <MenuItem value={15}>Last 15 Days</MenuItem>
               <MenuItem value={30}>Last 30 Days</MenuItem>
              <MenuItem value={90}>Last 3 Months</MenuItem>
              <MenuItem value={180}>Last 6 Months</MenuItem>
              <MenuItem value={365}>Last 1 Year</MenuItem>
              </Select>
            </CardContent>
            <CardContent>
              <label>Status</label>
              <Select>
                <MenuItem value={1}>All Statuses</MenuItem>
               <MenuItem value={2}>Paid</MenuItem>
              <MenuItem value={3}>Partial</MenuItem>
              <MenuItem value={4}>Credit</MenuItem>
              </Select>
            </CardContent>
            <CardContent>
              <Button variant='contained' sx={{ backgroundColor: '#42A5F5', '&:hover': { backgroundColor: '#1E88E5' }}}>Search</Button>
              <Button variant='outlined' sx={{
    ml: 1,
    backgroundColor: '#f5f5f5',
    borderColor: '#ccc',
    color: '#333',
    '&:hover': {
      backgroundColor: '#e0e0e0',
      borderColor: '#bbb',
    },
    boxShadow: 'none',
    textTransform: 'none'
  }}>Reset</Button>
            </CardContent>
          </Card>
        </div>
        <div className='purchase_table_container'>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Transaction ID</TableCell>
                <TableCell>Vendor</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
          </Table>

        </TableContainer>
        </div>

      </div>
    </div></div>
  )
}

export default PurchaseDashBoard