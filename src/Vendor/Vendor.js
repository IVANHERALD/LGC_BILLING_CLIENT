import React, { useState } from 'react';
import {
  Box, Stepper, Step, StepLabel, TextField, Button, Typography, Grid
} from '@mui/material';
import '../Vendor/Vendor.css'
const steps = ['Basic Info', 'Contact', 'Address', 'Bank Details'];

function Vendor() {
    const [activeStep, setActiveStep] = useState(0);
    const [formData, setFormData] = useState({
      name: '', gstin: '',
      phone: '', email: '',
      address: '', city: '', state: '', pincode: '',
      bankName: '', accountNumber: '', ifsc: '',
    });
  
    const handleNext = () => setActiveStep(prev => prev + 1);
    const handleBack = () => setActiveStep(prev => prev - 1);
  
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = () => {
      console.log("Form Submitted: ", formData);
      alert('Vendor added successfully!');
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
              <TextField fullWidth label="Bank Name" name="bankName" value={formData.bankName} onChange={handleChange} margin="normal" />
              
              <TextField fullWidth label="Account Number" name="accountNumber" value={formData.accountNumber} onChange={handleChange} margin="normal" />
              <TextField fullWidth label="IFSC Code" name="ifsc" value={formData.ifsc} onChange={handleChange} margin="normal" />
            </Box>
          );
        default:
          return null;
      }
    };
  
    return (
      <Box className="add-vendor-container" sx={{ width: '80%', mx: 'auto', mt: 5 }}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map(label => (
            <Step key={label}><StepLabel>{label}</StepLabel></Step>
          ))}
        </Stepper>
  
        <Box  className="step-content" sx={{ mt: 4 }}>{renderStepContent(activeStep)}</Box>
  
        <Box className="step-buttons"  sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
          <Button disabled={activeStep === 0} onClick={handleBack}>Back</Button>
          {activeStep === steps.length - 1 ? (
            <Button variant="contained" onClick={handleSubmit}>Save</Button>
          ) : (
            <Button variant="contained" onClick={handleNext}>Next</Button>
          )}
        </Box>
      </Box>
      

  )
}

export default Vendor