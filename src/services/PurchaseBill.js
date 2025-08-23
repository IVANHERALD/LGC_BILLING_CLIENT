export const newPurchasebill=async(purchasebilldetails)=>{
    const response=await fetch(`${process.env.REACT_APP_API_URL}/lgc/savepurchasebill`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(purchasebilldetails)
    });
    return response;

    };
