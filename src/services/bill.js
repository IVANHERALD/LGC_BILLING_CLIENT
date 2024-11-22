export const fetchgenInvoiceNumber=async()=>{
    console.log("API URL:", process.env.REACT_APP_API_URL);
    
    return await fetch (`${process.env.REACT_APP_API_URL}/lgc/generate-invoice-number`);
};