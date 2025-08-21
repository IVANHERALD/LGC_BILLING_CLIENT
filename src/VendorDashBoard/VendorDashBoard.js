import React, { useState,useEffect } from 'react'
import { Button, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import './VendorDashBoard.css'
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import {fetchVendor} from '../services/Vendor'
import { fetchPurchasebilldetails } from '../services/PurchaseBill';
import { fetchTotalPaidAmount } from '../services/Purchasepayment';


function VendorDashBoard() {
  const [vendors, setVendors] = useState([]);
  const [vendorData, setVendorData] = useState([]);
  const [purchaseBills, setPurchaseBills] = useState([]);
  const [totalPaidMap, setTotalPaidMap] = useState({});
    const history=useNavigate();
    useEffect(() => {
    
    const loadData = async () => {
      try {
        const response = await fetchVendor();
        if (!response) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        console.log("fetch vendor details", data.vendors);
        setVendors(data.vendors);

        const billResponse = await fetchPurchasebilldetails();
        if (!billResponse) {
          throw new Error('Failed to fetch bill data');
        }
        const billData = await billResponse.json();
        console.log("fetch Purchasebill details", billData.getPurchaseBill);
        setPurchaseBills(billData.getPurchaseBill);
        const paidResponse = await fetchTotalPaidAmount();
        if (!paidResponse) {  
          throw new Error('Failed to fetch paid amount data');
        }
        const paidData = await paidResponse.json();
        const paidMap = {};
        paidData.forEach(entry => {
          paidMap[entry.invoice_no] = entry.totalPaid;
        });
        console.log("Total Paid Amount Map:", paidMap);
        setTotalPaidMap(paidMap);
      } catch (error) {
        console.log(error.message);
      }
    };
    loadData();
  }, []);
  useEffect(() => {
    if (vendors.length === 0 || purchaseBills.length === 0) return;

    const result = vendors.map(vendor => {
      // find all bills for this vendor
      const vendorBills = purchaseBills.filter(b => b.vendor_name === vendor.vendor_name);

      let totalBalance = 0;
      let lastTransaction = "-";

      vendorBills.forEach(bill => {
        const paid = totalPaidMap[bill.invoice_no] ?? 0;
        const balance = bill.total - paid;
        totalBalance += balance;

        // update lastTransaction (latest date)
        if (!lastTransaction || bill.purchase_date > lastTransaction) {
          lastTransaction = bill.purchase_date;
        }
      });
      return {
        name: vendor.vendor_name,
        vendor_account_holder_name: vendor.vendor_account_holder_name || "N/A",
        contact: vendor.vendor_contact || "N/A",
        balance: totalBalance,
        lastTransaction
      };
    });

    setVendorData(result);
  }, [vendors, purchaseBills, totalPaidMap]);

  return (
    <div className='vendor_dashboard_main'><div><Navbar/></div>
    <div className='dashboard-container'>
      <h2>Vendor Management Dashboard</h2>
    <div className="dashboard-header">
      <div className="search-filter">
        <TextField label="Search vendors..." variant="outlined" size="small" />
        <TextField label="Filter by" variant="outlined" size="small" />
      </div>
      <Button variant="contained" className="add-vendor-button" onClick={()=>{
        console.log('clicked')
        history('/vendor')}}>+ Add New Vendor</Button>
    </div>

    <TableContainer component={Paper} className="vendor-table">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Vendor Name</TableCell>
            <TableCell>Contact Info</TableCell>
            <TableCell>Current Balance</TableCell>
            <TableCell>Last Transaction</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {vendorData.map((vendor, index) => (
            <TableRow key={index}>
              <TableCell>{vendor.name
}</TableCell>
              <TableCell>{vendor.vendor_account_holder_name}-{vendor.contact}</TableCell>
              <TableCell style={{ color: vendor.balance === 0 ? 'green' : 'red' }}>
                ₹{vendor.balance}
              </TableCell>
              <TableCell>{vendor.lastTransaction}</TableCell>
              <TableCell>
                <Button variant="contained" size="small" color="primary" style={{ marginRight: 5 }}>View</Button>
                <Button variant="contained" size="small" style={{ backgroundColor: '#4CAF50', color: 'white', marginRight: 5 }} onClick={() => history('/addpurchase')}>Purchase</Button>
                <Button variant="contained" size="small" style={{ backgroundColor: '#FFA500', color: 'white' }} onClick={() => history('/addpayment')}>Pay</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

    </div>
    </div>
  )
}

export default VendorDashBoard