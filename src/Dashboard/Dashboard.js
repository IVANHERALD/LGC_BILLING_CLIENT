import React,{useState,useEffect} from 'react'
import { fetchbilldetails } from '../services/bill';
import Navbar from '../Navbar/Navbar';
import '../Dashboard/Dashboard.css'
function Dashboard() {
  const [billDetails, setbillDetails] = useState([]);
  const [TotalSales, setTotalSales] = useState([]);
  const [TotalGST, setTotalGST] = useState([]);
  const [Totalsalesbefore, setTotalsalesbefore] = useState([]);
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
                  let monthlySales = {};
                  data.Bill.forEach((bill) => {
                    totalsalesbefore+=parseFloat(bill.total_before_tax);
                    totalSales += parseFloat(bill.grand_total);
                    totalGST += parseFloat(bill.grand_total) - parseFloat(bill.total_before_tax);
          
                    // Group sales by month
                  });
          
                  setTotalSales(totalSales.toFixed(2));
                  setTotalGST(totalGST.toFixed(2));
                  setTotalsalesbefore(totalsalesbefore.toFixed(2));

                  
              } catch (error) {
                  console.log(error.message);
              }
          };
      
          fetchbill();
      }, []);
  return (
    
    <div className='dashboard_container'>
      <div>
        <Navbar/>
      </div>
        <h2>Total Sales without tax: ₹{Totalsalesbefore}</h2><br/>
        <h2>Total Sales with tax: ₹{TotalSales}</h2><br/>
        <h3>Total GST Collected: ₹{TotalGST}</h3><br/>
    </div>
  )
}

export default Dashboard