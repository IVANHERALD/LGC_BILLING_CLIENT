export const fetchTotalPaidAmount = async () => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/lgc/totalpaid`);
  return response;
};

export const recordVendorPayment = async ({ invoice_id, payment }) => {
  console.log("Recording payment for invoice:", invoice_id, payment);
  const response = await fetch(`${process.env.REACT_APP_API_URL}/lgc/record-purchasepayment`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      invoice_id,
      payment
    })
  });

  return response;
};
