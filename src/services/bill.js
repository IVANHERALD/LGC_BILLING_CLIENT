export const fetchgenInvoiceNumber=async()=>{
    console.log("API URL:", process.env.REACT_APP_API_URL);
    
    return await fetch (`${process.env.REACT_APP_API_URL}/lgc/generate-invoice-number`);
};
export const fetchgenBillNumber=async()=>{
    console.log("API URL:", process.env.REACT_APP_API_URL);
    
    return await fetch (`${process.env.REACT_APP_API_URL}/lgc/billnumber`);
};


export const addnewbill=async(billDetails)=>{
    const response=await fetch(`${process.env.REACT_APP_API_URL}/lgc/savebill`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(billDetails)
    });
    return response;

    };
    export const fetchbilldetails = async() => {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/lgc/fetchbill`);
        return response;
      };
      export const updateBill = async (invoice_no, updatedBill) => {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/lgc/updatebill/${invoice_no}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedBill),
        });
        return response;
    };
    
export const deleteBill=async(invoice_no)=>{
    const response = await fetch(`${process.env.REACT_APP_API_URL}/lgc/deletebill/${invoice_no}`, {
        method: 'DELETE',
      });
      return response;
}