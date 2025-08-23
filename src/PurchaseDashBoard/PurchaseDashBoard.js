import React,{useEffect,useState} from 'react'
import Navbar from '../Navbar/Navbar';
import { Button, Card, CardContent,Table,TableBody,TableCell,TableHead,TableRow,TableContainer, Paper ,Select,MenuItem,Typography,Box} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import '../../src/PurchaseDashBoard/PurchaseDashBoard.css'
import { fetchVendor } from '../services/Vendor';
import { fetchPurchasebilldetails } from '../services/PurchaseBill';
import { fetchTotalPaidAmount } from '../services/Purchasepayment';


function PurchaseDashBoard() {
  const history = useNavigate();
  const [vendordetails, setvendordetails] = useState([]);
  const [selectedVendor, setSelectedVendor] = useState("all");
  const [totalPurchase, setTotalPurchase] = useState(0);
  const [totalPaid, setTotalPaid] = useState(0);
  const [purchasebill, setpurchasebill] = useState([]);
  const [selectedDays, setSelectedDays] = useState(30);
  useEffect(() => {
      
      const fetchVendorDetails = async () => {
        try {
          const response = await fetchVendor();
          if (!response) {
            throw new Error('Failed to fetch data');
          }
          const data = await response.json();
          console.log("fetch vendor details", data.vendors);
          setvendordetails(data.vendors);
          console.log("", data.vendors);
        } catch (error) {
          console.log(error.message);
        }
      };
      const fetchTotalPurchase = async () => {
        try {
          const response=await fetchTotalPaidAmount();
          if (!response) {
            throw new Error('Failed to fetch data');    
          }
          const data = await response.json();
          setpurchasebill(data);
          console.log("fetch Purchasebill details", data);
          const total=data.reduce((sum, bill) => sum + bill.total, 0);
          setTotalPurchase(total);
          const total_paid=data.reduce((sum, bill) => sum + bill.totalPaid, 0);
          setTotalPaid(total_paid);
          console.log("Total Purchase Amount:", total);
        } catch (error) {
          console.log(error.message);
        } 
      };
      fetchTotalPurchase();
      fetchVendorDetails();
    }, []);



    const now = new Date();
    console.log("pppp",purchasebill)
  const filteredBills = purchasebill.filter(bill => {
    // Vendor filter
    if (selectedVendor !== "all" && bill.vendor_name !== selectedVendor) return false;

    // Date filter
    const [day, month, year] = bill.purchase_date.split("-"); // "dd-mm-yyyy"
    const billDate = new Date(`${year}-${month}-${day}`);
    const diffDays = Math.floor((now - billDate) / (1000 * 60 * 60 * 24));
    if (diffDays > selectedDays) return false;

    return true;
  });

  const totalPurchases = filteredBills.reduce((sum, b) => sum + b.total, 0);
  const totalPayments = filteredBills.reduce((sum, b) => sum + (b.totalPaid || 0), 0);
  console.log("Filtered Bills:", totalPurchases);

  // Payments matching selected vendor & date

  const outstanding = totalPurchases - totalPayments;

  return (
    <div >
      <div className='dashboard_container'>
      <div>
        <Navbar /></div>
      <div className="dashboard">
        <Button variant="contained" sx={{ fontSize: 16, ml: 2, backgroundColor: '#FF7043', '&:hover': { backgroundColor: '#F4511E' } }} onClick={() => history('/dashboard')}>Sales DashBoard
        </Button>
        <Button variant="contained" sx={{ fontSize: 16, ml: 2, backgroundColor: '#66BB6A', '&:hover': { backgroundColor: '#43A047' } }} onClick={() => history('/purchasedashboard')}>Purchase DashBoard
        </Button>
        <div className='purchase_transaction_card'>
          <div className="dashboard">
        {/* ---- Header with Navigation ---- */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Vendor Transactions</Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button variant="contained" sx={{ backgroundColor: '#42A5F5', '&:hover': { backgroundColor: '#1E88E5' } }}
              onClick={() => history('/addpurchase')}>
              Add Purchase
            </Button>
            <Button variant="contained" sx={{ backgroundColor: '#66BB6A', '&:hover': { backgroundColor: '#43A047' } }}
              onClick={() => history('/addpayment')}>
              Add Payment
            </Button>
          </Box>
        </Box>

        {/* ---- Tabs ---- */}
        <Box className="transaction-tabs">
          <Button variant="contained" className="active-tab">All Transactions</Button>
          <Button>Pending Payments</Button>
          <Button>Payment History</Button>
          <Button>Purchase History</Button>
        </Box>

        {/* ---- Filter Section ---- */}
        <Card className="filter-card">
          <CardContent sx={{ display: 'flex', gap: 4, alignItems: 'center' }}>
            <div>
              <label>Vendor</label>
              <Select 
                  value={selectedVendor} 
                  onChange={(e) => setSelectedVendor(e.target.value)} 
                  fullWidth 
                  size="small"
                >
                  <MenuItem value="all">All Vendors</MenuItem>
                  {vendordetails.map((vendor, idx) => (
                    <MenuItem key={idx} value={vendor.vendor_name || vendor.name}>
                      {vendor.vendor_name}
                    </MenuItem>
                  ))}</Select>
            </div>
            <div>
              <label>Date Range</label>
              <Select defaultValue={30} fullWidth size="small" value={selectedDays}
            onChange={(e) => setSelectedDays(e.target.value)}
            >
                <MenuItem value={15}>Last 15 Days</MenuItem>
                <MenuItem value={30}>Last 30 Days</MenuItem>
                <MenuItem value={90}>Last 3 Months</MenuItem>
                <MenuItem value={180}>Last 6 Months</MenuItem>
                <MenuItem value={365}>Last 1 Year</MenuItem>
              </Select>
            </div>
            <div>
              <label>Status</label>
              <Select defaultValue="all" fullWidth size="small">
                <MenuItem value="all">All Statuses</MenuItem>
                <MenuItem value="paid">Paid</MenuItem>
                <MenuItem value="partial">Partial</MenuItem>
                <MenuItem value="credit">Credit</MenuItem>
              </Select>
            </div>
            <div>
              <Button variant="contained" sx={{ backgroundColor: '#42A5F5', '&:hover': { backgroundColor: '#1E88E5' }, mr: 1 }}>Search</Button>
              <Button variant="outlined">Reset</Button>
            </div>
          </CardContent>
        </Card>

        {/* ---- Summary Cards ---- */}
        <Box className="summary-cards">
          <Card><CardContent><Typography>Total Purchases</Typography><Typography variant="h6">₹ {totalPurchases.toLocaleString()}</Typography></CardContent></Card>
          <Card><CardContent><Typography>Total Payments</Typography><Typography variant="h6">₹ {totalPayments.toLocaleString()}</Typography></CardContent></Card>
          <Card><CardContent><Typography>Outstanding</Typography><Typography variant="h6" color="error">₹ {(outstanding).toLocaleString()}</Typography></CardContent></Card>
          <Card><CardContent><Typography>Active Vendors</Typography><Typography variant="h6">16</Typography></CardContent></Card>
        </Box>

        {/* ---- Table ---- */}
        <TableContainer component={Paper} sx={{ mt: 3 }}>
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
            <TableBody>
              <TableRow>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell><span className="status-credit">Credit</span></TableCell>
              </TableRow>
              <TableRow>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell><span className="status-paid">Paid</span></TableCell>
              </TableRow>
              {/* Add more rows dynamically from DB */}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
        </div>
      </div>
      </div>)
}

export default PurchaseDashBoard