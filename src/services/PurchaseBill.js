export const fetchPurchasebilldetails = async() => {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/lgc/fetchPurchasebill`);
        return response;
      };
      