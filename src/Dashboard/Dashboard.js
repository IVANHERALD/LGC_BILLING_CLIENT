import React, { useState, useEffect } from 'react';
import { fetchbilldetails } from '../services/bill';
import Navbar from '../Navbar/Navbar';
import '../Dashboard/Dashboard.css';

function Dashboard() {
  const [overall, setOverall] = useState({});
  const [currentFY, setCurrentFY] = useState({});
  const [previousFY, setPreviousFY] = useState({});

  const getFinancialYear = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    return d.getMonth() >= 3 ? `${year}-${year + 1}` : `${year - 1}-${year}`;
  };

  const isCurrentFY = (fy) => {
    const now = new Date();
    const year = now.getFullYear();
    const current = now.getMonth() >= 3 ? `${year}-${year + 1}` : `${year - 1}-${year}`;
    return fy === current;
  };

  useEffect(() => {
    const fetchbill = async () => {
      try {
        const response = await fetchbilldetails();
        if (!response) throw new Error('Failed to fetch data');
        const data = await response.json();
        const bills = data.Bill;

        let overallStats = { total: 0, beforeTax: 0, gst: 0, weight: 0 };
        let currentFYStats = { total: 0, beforeTax: 0, gst: 0, weight: 0 };
        let previousFYStats = { total: 0, beforeTax: 0, gst: 0, weight: 0 };

        bills.forEach(bill => {
          const date = new Date(bill.invoice_date);
          const fy = getFinancialYear(date);

          const beforeTax = parseFloat(bill.total_before_tax) || 0;
          const total = parseFloat(bill.grand_total) || 0;
          const weight = parseFloat(bill.totalweight) || 0;
          const gst = total - beforeTax;

          // Overall
          overallStats.total += total;
          overallStats.beforeTax += beforeTax;
          overallStats.gst += gst;
          overallStats.weight += weight;

          // FY Check
          if (isCurrentFY(fy)) {
            currentFYStats.total += total;
            currentFYStats.beforeTax += beforeTax;
            currentFYStats.gst += gst;
            currentFYStats.weight += weight;
          } else {
            previousFYStats.total += total;
            previousFYStats.beforeTax += beforeTax;
            previousFYStats.gst += gst;
            previousFYStats.weight += weight;
          }
        });

        setOverall(overallStats);
        setCurrentFY(currentFYStats);
        setPreviousFY(previousFYStats);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchbill();
  }, []);

  return (
    <div className='dashboard_container'>
      <div>
        <Navbar />
      </div>
      <div className="dashboard">
        <h3>Overall Sales</h3>
        <p>Sales Without Tax: ₹{overall.beforeTax?.toFixed(2)}</p>
        <p>Sales With Tax: ₹{overall.total?.toFixed(2)}</p>
        <p>Total GST: ₹{overall.gst?.toFixed(2)}</p>
        <p>Total Weight: {overall.weight?.toFixed(2)} Kgs</p>

        <h3>Current Financial Year</h3>
        <p>Sales Without Tax: ₹{currentFY.beforeTax?.toFixed(2)}</p>
        <p>Sales With Tax: ₹{currentFY.total?.toFixed(2)}</p>
        <p>Total GST: ₹{currentFY.gst?.toFixed(2)}</p>
        <p>Total Weight: {currentFY.weight?.toFixed(2)} Kgs</p>

        <h3>Previous Financial Year</h3>
        <p>Sales Without Tax: ₹{previousFY.beforeTax?.toFixed(2)}</p>
        <p>Sales With Tax: ₹{previousFY.total?.toFixed(2)}</p>
        <p>Total GST: ₹{previousFY.gst?.toFixed(2)}</p>
        <p>Total Weight: {previousFY.weight?.toFixed(2)} Kgs</p>
      </div>
    </div>
  );
}

export default Dashboard;
