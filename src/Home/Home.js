import "../../src/Home/Home.css";

import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Invoice from "../Invoice/Invoice";
import Navbar from "../Navbar/Navbar";
import { fetchgenInvoiceNumber } from "../services/bill";

function Home() {
  const [invoice_no, setinvoice_no] = useState("");
  const [invoice_date, setinvoice_date] = useState("");
  const [state, setstate] = useState("TamilNadu");
  const [state_code, setstate_code] = useState("33");
  const [transport_name, settransport_name] = useState("");
  const [vehicle_number, setvehicle_number] = useState("");
  const [date_of_supply, setdate_of_supply] = useState("");

  const [pono_date, setpono_date] = useState("");
  const [eway_bill_no, seteway_bill_no] = useState("");
  const [receiver_name, setreceiver_name] = useState("");
  const [receiver_address, setreceiver_address] = useState("");
  const [receiver_gstin, setreceiver_gstin] = useState("");
  const [receiver_state, setreceiver_state] = useState("");
  const [receiver_state_code, setreceiver_state_code] = useState("");
  const [consignee_name, setconsignee_name] = useState("");
  const [consignee_address, setconsignee_address] = useState("");
  const [consignee_gstin, setconsignee_gstin] = useState("");
  const [consignee_state, setconsignee_state] = useState("");
  const [consignee_state_code, setconsignee_state_code] = useState("");
  const [invoiceItems, setInvoiceItems] = useState([]);
  const [invoiceCgst, setInvoiceCgst] = useState(0);
  const [invoiceSgst, setInvoiceSgst] = useState(0);
  const [invoiceIgst, setInvoiceIgst] = useState(0);
  const [invoicegrandtotal, setInvoicegrandtotal] = useState(0);
  const [copyLabels] = useState([
    "Original for Recipient",
    "Duplicate Copy for Transporter",
    "Triplicate Copy",
    "Duplicate Copy",
  ]);

  async function fetchInvoiceNumber() {
    try {
      const response = await fetchgenInvoiceNumber();
      if (response.ok) {
        const data = await response.json();
        setinvoice_no(data.invoice_no);
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchInvoiceNumber();
  }, []);

  const handlePrint = () => {
    const invoiceData = {
      items: invoiceItems,
      cgst: invoiceCgst,
      sgst: invoiceSgst,
      igst: invoiceIgst,
      grandtotal: invoicegrandtotal,
    };

    console.log("Invoice Data to Save:", invoiceData);

    window.print(); // Trigger print
  };
  useEffect(() => {
    const now = new Date();
    const formattedDateTime = `${now.toLocaleDateString()} ${now.toLocaleTimeString(
      [],
      { hour12: false }
    )}`; // Formats date and time according to system locale
    setinvoice_date(formattedDateTime);
  }, []);
  const handleInvoiceData = (items, cgst, sgst, igst, grandtotal) => {
    setInvoiceItems(items);
    setInvoiceCgst(cgst);
    setInvoiceSgst(sgst);
    setInvoiceIgst(igst);
    setInvoicegrandtotal(grandtotal);
  };

  return (
    <div>
      <div style={{ display: "flex" }}>
        <div className="navbar-container">
          {" "}
          <Navbar />
        </div>

        <div className="watermark-container">
          <div className="watermark">Lakshmi Grade Casting</div>
          <div className="segment">
            <div className="invoice-container">
              <div className="header-container">
                <Header />
              </div>
              <div>
                <div className="grid-container">
                  <div className="grid-item">
                    <Box display={"flex"} alignItems="center" gap={5} mb={1}>
                      <Typography
                        variant="body1"
                        sx={{ fontSize: "0.70rem", fontWeight: "bold" }}
                      >
                        Invoice No:
                      </Typography>
                      <TextField
                        variant="standard"
                        value={invoice_no}
                        InputProps={{ disableUnderline: true }}
                      ></TextField>
                    </Box>
                    <Box display={"flex"} alignItems="center" gap={5}>
                      <Typography
                        variant="body1"
                        sx={{ fontSize: "0.70rem", fontWeight: "bold" }}
                      >
                        Invoice Date:
                      </Typography>
                      <TextField
                        variant="standard"
                        value={invoice_date}
                        InputProps={{ disableUnderline: true }}
                      ></TextField>
                    </Box>
                    <Box display={"flex"} alignItems="center" gap={5}>
                      <Typography
                        variant="body1"
                        sx={{ fontSize: "0.70rem", fontWeight: "bold" }}
                      >
                        State:
                      </Typography>
                      <TextField
                        variant="standard"
                        value={state}
                        sx={{ width: "180px" }}
                        InputProps={{ disableUnderline: true }}
                      ></TextField>
                      <Typography
                        variant="body1"
                        sx={{ fontSize: "0.70rem", fontWeight: "bold" }}
                      >
                        State code:
                      </Typography>
                      <TextField
                        variant="standard"
                        value={state_code}
                        InputProps={{ disableUnderline: true }}
                      ></TextField>
                    </Box>
                  </div>
                  <div className="grid-item">
                    <Box display={"flex"} alignItems="center" gap={5}>
                      <Typography
                        variant="body1"
                        sx={{ fontSize: "0.70rem", fontWeight: "bold" }}
                      >
                        Name of Transport:
                      </Typography>
                      <TextField
                        variant="standard"
                        InputProps={{ disableUnderline: true }}
                        value={transport_name}
                        onChange={(e) => settransport_name(e.target.value)}
                      ></TextField>
                    </Box>
                    <Box display={"flex"} alignItems="center" gap={5}>
                      <Typography
                        variant="body1"
                        sx={{ fontSize: "0.70rem", fontWeight: "bold" }}
                      >
                        Vehicle Number:
                      </Typography>
                      <TextField
                        variant="standard"
                        onChange={(e) => setvehicle_number(e.target.value)}
                        InputProps={{ disableUnderline: true }}
                      ></TextField>
                    </Box>
                    <Box display={"flex"} alignItems="center" gap={5}>
                      <Typography
                        variant="body1"
                        sx={{ fontSize: "0.70rem", fontWeight: "bold" }}
                      >
                        Date of Supply:
                      </Typography>
                      <TextField
                        variant="standard"
                        onChange={(e) => setdate_of_supply(e.target.value)}
                        InputProps={{ disableUnderline: true }}
                      ></TextField>
                    </Box>

                    <Box display={"flex"} alignItems="center" gap={5}>
                      <Typography
                        variant="body1"
                        sx={{ fontSize: "0.70rem", fontWeight: "bold" }}
                      >
                        Po.No. & Date:
                      </Typography>
                      <TextField
                        variant="standard"
                        onChange={(e) => setpono_date(e.target.value)}
                        InputProps={{ disableUnderline: true }}
                      ></TextField>
                    </Box>
                    <Box display={"flex"} alignItems="center" gap={5}>
                      <Typography
                        variant="body1"
                        sx={{ fontSize: "0.70rem", fontWeight: "bold" }}
                      >
                        E-WAY Bill No:
                      </Typography>
                      <TextField
                        variant="standard"
                        onChange={(e) => seteway_bill_no(e.target.value)}
                        InputProps={{ disableUnderline: true }}
                      ></TextField>
                    </Box>
                  </div>
                  <div className="grid-item">
                    <h6>Details of Receiver/Billed To</h6>
                  </div>
                  <div className="grid-item">
                    <h6>Details of Consignee/Shipped To</h6>
                  </div>
                  <div className="grid-item">
                    <Box display={"flex"} alignItems="center" gap={5} mt={0}>
                      <Typography
                        variant="body1"
                        sx={{ fontSize: "0.70rem", fontWeight: "bold" }}
                      >
                        Name:
                      </Typography>
                      <TextField
                        variant="standard"
                        sx={{ width: "250px" }}
                        onChange={(e) => setreceiver_name(e.target.value)}
                        InputProps={{ disableUnderline: true }}
                      ></TextField>
                    </Box>
                    <Box display={"flex"} alignItems="center" gap={3} mt={0}>
                      <Typography
                        variant="body1"
                        sx={{ fontSize: "0.70rem", fontWeight: "bold" }}
                      >
                        Address:
                      </Typography>
                      <TextField
                        variant="standard"
                        sx={{ width: "450px" }}
                        MULTILINE
                        onChange={(e) => setreceiver_address(e.target.value)}
                        InputProps={{ disableUnderline: true }}
                      ></TextField>
                    </Box>
                    <br />{" "}
                    <Box display={"flex"} alignItems="center" gap={4.5} mt={0}>
                      <Typography
                        variant="body1"
                        sx={{ fontSize: "0.70rem", fontWeight: "bold" }}
                      >
                        GSTIN:
                      </Typography>
                      <TextField
                        variant="standard"
                        sx={{ width: "250px" }}
                        onChange={(e) => setreceiver_gstin(e.target.value)}
                        InputProps={{ disableUnderline: true }}
                      ></TextField>
                    </Box>
                    <Box display={"flex"} alignItems="center" gap={5} mt={0}>
                      <Typography
                        variant="body1"
                        sx={{ fontSize: "0.70rem", fontWeight: "bold" }}
                      >
                        State:
                      </Typography>
                      <TextField
                        variant="standard"
                        sx={{ width: "100px" }}
                        onChange={(e) => setreceiver_state(e.target.value)}
                        InputProps={{ disableUnderline: true }}
                      ></TextField>
                      <Typography
                        variant="body1"
                        sx={{ fontSize: "0.70rem", fontWeight: "bold" }}
                      >
                        State code:
                      </Typography>
                      <TextField
                        variant="standard"
                        sx={{ width: "100px" }}
                        onChange={(e) => setreceiver_state_code(e.target.value)}
                        InputProps={{ disableUnderline: true }}
                      ></TextField>
                    </Box>
                  </div>
                  <div className="grid-item">
                    <Box display={"flex"} alignItems="center" gap={5} mt={0}>
                      <Typography
                        variant="body1"
                        sx={{ fontSize: "0.70rem", fontWeight: "bold" }}
                      >
                        Name:
                      </Typography>
                      <TextField
                        variant="standard"
                        sx={{ width: "250px" }}
                        onChange={(e) => setreceiver_name(e.target.value)}
                        InputProps={{ disableUnderline: true }}
                      ></TextField>
                    </Box>
                    <Box display={"flex"} alignItems="center" gap={3} mt={0}>
                      <Typography
                        variant="body1"
                        sx={{ fontSize: "0.70rem", fontWeight: "bold" }}
                      >
                        Address:
                      </Typography>
                      <TextField
                        variant="standard"
                        sx={{ width: "450px" }}
                        MULTILINE
                        onChange={(e) => setreceiver_address(e.target.value)}
                        InputProps={{ disableUnderline: true }}
                      ></TextField>
                    </Box>
                    <br />{" "}
                    <Box display={"flex"} alignItems="center" gap={4.5} mt={0}>
                      <Typography
                        variant="body1"
                        sx={{ fontSize: "0.70rem", fontWeight: "bold" }}
                      >
                        GSTIN:
                      </Typography>
                      <TextField
                        variant="standard"
                        sx={{ width: "250px" }}
                        onChange={(e) => setreceiver_gstin(e.target.value)}
                        InputProps={{ disableUnderline: true }}
                      ></TextField>
                    </Box>
                    <Box display={"flex"} alignItems="center" gap={5} mt={0}>
                      <Typography
                        variant="body1"
                        sx={{ fontSize: "0.70rem", fontWeight: "bold" }}
                      >
                        State:
                      </Typography>
                      <TextField
                        variant="standard"
                        sx={{ width: "100px" }}
                        onChange={(e) => setreceiver_state(e.target.value)}
                        InputProps={{ disableUnderline: true }}
                      ></TextField>
                      <Typography
                        variant="body1"
                        sx={{ fontSize: "0.70rem", fontWeight: "bold" }}
                      >
                        State code:
                      </Typography>
                      <TextField
                        variant="standard"
                        sx={{ width: "100px" }}
                        onChange={(e) => setreceiver_state_code(e.target.value)}
                        InputProps={{ disableUnderline: true }}
                      ></TextField>
                    </Box>
                  </div>
                </div>

                <Invoice onInvoiceChange={handleInvoiceData} />
              </div>
              <Footer />
            </div>
          </div>
        </div>
      </div>

      <center>
        <div className="print-button-container">
          <Button variant="contained" color="primary" onClick={handlePrint}>
            Print Invoice
          </Button>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <Button variant="contained" color="success" onClick={handlePrint}>
            Review Invoice
          </Button>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <Button variant="contained" color="error" onClick={handlePrint}>
            Exit
          </Button>
        </div>
      </center>
    </div>
  );
}

export default Home;
