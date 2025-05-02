import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { fetchbilldetails } from '../services/bill';
import Navbar from '../Navbar/Navbar';
import '../Dashboard/Dashboard.css'
import {Button} from '@mui/material'
function Dashboard() {
  const history=useNavigate();
  const [billDetails, setbillDetails] = useState([]);
  const [TotalSales, setTotalSales] = useState([]);
  const [TotalGST, setTotalGST] = useState([]);
  const [Totalsalesbefore, setTotalsalesbefore] = useState([]);
  const [TotalWeight,SetTotalWeight]=useState([]);
  useEffect(() => {
      
          const fetchbill = async () => {
              try {
                  const response = await fetchbilldetails();
                  if (!response) {
                      throw new Error('Failed to fetch data');
                  }
                  const data = await response.json();
                  console.log("fetch bill details" ,data.Bill);
                  setbillDetails(data.Bill);
                  
                  let totalSales = 0;
                  let totalsalesbefore=0;
                  let totalGST = 0;
                  let totalweight=0;
                  let monthlySales = {};
                  data.Bill.forEach((bill) => {
                    totalsalesbefore+=parseFloat(bill.total_before_tax);
                    totalSales += parseFloat(bill.grand_total);
                    totalGST += parseFloat(bill.grand_total) - parseFloat(bill.total_before_tax);
                    totalweight+=isNaN(parseFloat(bill.totalweight))?0:parseFloat(bill.totalweight);

          
                    // Group sales by month
                  });
          
                  setTotalSales(totalSales.toFixed(2));
                  setTotalGST(totalGST.toFixed(2));
                  setTotalsalesbefore(totalsalesbefore.toFixed(2));
                  SetTotalWeight(totalweight.toFixed(2))

                  
              } catch (error) {
                  console.log(error.message);
              }
          };
      
          fetchbill();
      }, []);
  return (
    
    <div className='dashboard_container'>
      <div>
        <Navbar/></div>
      <div className="dashboard">
        <Button variant="contained"  sx={{ fontSize: 16, ml: 2,backgroundColor: '#FF7043', '&:hover': { backgroundColor: '#F4511E' } }} onClick={()=>history('/dashboard')}>Sales DashBoard</Button>
        <Button variant="contained"  sx={{ fontSize: 16, ml: 2,backgroundColor: '#66BB6A', '&:hover': { backgroundColor: '#43A047' } }} onClick={()=>history('/purchasedashboard')}>Purchase DashBoard</Button>
        <h2>Total Sales without tax: ₹{Totalsalesbefore}</h2><br/>
        <h2>Total Sales with tax: ₹{TotalSales}</h2><br/>
        <h2>Total GST Collected: ₹{TotalGST}</h2><br/>
        <h2>Total Quantity Billed:{TotalWeight}Kgs</h2>
    </div>
    </div>
  )
}

export default Dashboard