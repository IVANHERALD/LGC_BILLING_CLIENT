export const fetchTotalPaidAmount = async () => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/lgc/totalpaid`);
  return response;
};
