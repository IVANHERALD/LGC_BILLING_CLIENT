import React, { useState } from 'react';
import {
  Box, Stepper, Step, StepLabel, TextField, Button, Typography, Grid
} from '@mui/material';
import '../Vendor/Vendor.css'
import { savevendor } from '../services/Vendor';
const steps = ['Basic Info', 'Contact', 'Address', 'Bank Details'];

function Vendor() {
    const [activeStep, setActiveStep] = useState(0);
    const [formData, setFormData] = useState({
      name: '', gstin: '',
      phone: '', email: '',
      address: '', city: '', state: '', pincode: '',holdername:'',
       accountNumber: '',bankname:'', ifsc: '',branchname:''
    });
  
    const handleNext = () => setActiveStep(prev => prev + 1);
    const handleBack = () => setActiveStep(prev => prev - 1);
  
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    const handleVendorSave =async () => {
      const vendorDetails = {
        vendor_name: formData.name,
        vendor_gstin: formData.gstin,
        vendor_contact:formData.phone,
        vendor_email:formData.email,
        vendor_address: formData.address,
        vendor_city:formData.city,
        vendor_state: formData.state,
        vendor_pin_code: formData.pincode,
        vendor_account_holder_name:formData.holdername,
        vendor_account_number:formData.accountNumber,
        vendor_bank_name:formData.bankname,
        vendor_ifsc_code:formData.ifsc,
        vendor_branch_name:formData.branchname




        
      };
    
      try {
        const response = await savevendor(vendorDetails);
        if (response.status === 201) {
          console.log('Vendor added');
          alert('Vendor saved successfully!');
        } else {
          console.error('Vendor not added');
          alert('Failed to save vendor.');
        }
      } catch (error) {
        console.error('Error while saving vendor:', error);
        alert('An error occurred while saving vendor.');
      }
    };
     
    const renderStepContent = (step) => {
      switch (step) {
        case 0:
          return (
            <Box>
              <Typography variant="h6">Let's start with the basics</Typography>
              <TextField fullWidth label="Vendor Name" name="name" value={formData.name} onChange={handleChange} margin="normal" />
              <TextField fullWidth label="GSTIN" name="gstin" value={formData.gstin} onChange={handleChange} margin="normal" />
            </Box>
          );
        case 1:
          return (
            <Box>
              <Typography variant="h6">How do we contact them?</Typography>
              <TextField fullWidth label="Phone Number" name="phone" value={formData.phone} onChange={handleChange} margin="normal" />
              <TextField fullWidth label="Email Address" name="email" value={formData.email} onChange={handleChange} margin="normal" />
            </Box>
          );
        case 2:
          return (
            <Box>
              <Typography variant="h6">Vendor Address</Typography>
              <TextField fullWidth label="Street Address" name="address" value={formData.address} onChange={handleChange} margin="normal" />
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField fullWidth label="City" name="city" value={formData.city} onChange={handleChange} margin="normal" />
                </Grid>
                <Grid item xs={6}>
                  <TextField fullWidth label="State" name="state" value={formData.state} onChange={handleChange} margin="normal" />
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth label="Pincode" name="pincode" value={formData.pincode} onChange={handleChange} margin="normal" />
                </Grid>
              </Grid>
            </Box>
          );
        case 3:
          return (
            <Box>
              
              <Typography variant="h6">Bank Details</Typography>

              <TextField fullWidth label="Account Holder Name" name="holdername" value={formData.holdername} onChange={handleChange} margin="normal" />

              
              <TextField fullWidth label="Account Number" name="accountNumber" value={formData.accountNumber} onChange={handleChange} margin="normal" />
              
              <TextField fullWidth label="Bank Name" name="bankname" value={formData.bankname} onChange={handleChange} margin="normal" />
              
                           <TextField fullWidth label="IFSC Code" name="ifsc" value={formData.ifsc} onChange={handleChange} margin="normal" />
                           <TextField fullWidth label="Branch Name" name="branchname" value={formData.branchname} onChange={handleChange} margin="normal" />
            </Box>
          );
        default:
          return null;
      }
    };
  
    return (
      <Box className="add-vendor-container" sx={{ width: '80%', mx: 'auto', mt: 5 }}>
        <div className='exit_button'>      <Button className='' variant='contained' color='error'>x</Button></div>
  
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map(label => (
            <Step key={label}><StepLabel>{label}</StepLabel></Step>
          ))}
        </Stepper>
  
        <Box  className="step-content" sx={{ mt: 4 }}>{renderStepContent(activeStep)}</Box>
  
        <Box className="step-buttons"  sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
          <Button disabled={activeStep === 0} onClick={handleBack}>Back</Button>
          {activeStep === steps.length - 1 ? (
            <Button variant="contained" onClick={handleVendorSave}>Save</Button>
          ) : (
            <Button variant="contained" onClick={handleNext}>Next</Button>
          )}
        </Box>
      </Box>
      

  )
}

export default Vendor