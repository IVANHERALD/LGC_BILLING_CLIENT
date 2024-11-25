export const savecustomer=async(customerDetails)=>{
    const response=await fetch(`${process.env.REACT_APP_API_URL}/lgc/savecustomer`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(customerDetails)
    });
    return response;
    };
    