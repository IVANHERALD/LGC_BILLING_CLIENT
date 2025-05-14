export const savevendor=async(VendorDetails)=>{
    const response=await fetch(`${process.env.REACT_APP_API_URL}/lgc/savevendor`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(VendorDetails)
    });
    return response;
    };
    export const fetchVendor = async() => {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/lgc/fetchvendor`);
        return response;
      };