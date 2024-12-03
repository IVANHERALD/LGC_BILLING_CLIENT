export const savecasting=async(castingDetails)=>{
    const response=await fetch(`${process.env.REACT_APP_API_URL}/lgc/savecasting`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(castingDetails)
    });
    return response;
    };
    export const fetchcasting = async() => {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/lgc/fetchcasting`);
        return response;
      };