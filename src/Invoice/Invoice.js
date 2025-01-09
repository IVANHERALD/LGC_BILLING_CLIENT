import "../Invoice/Invoice.css";
import Autocomplete from "@mui/material/Autocomplete";
import { fetchcasting } from "../services/Casting";

import {
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { ToWords } from "to-words";

function Invoice({ onInvoiceChange }) {
  const [items, setitems] = useState([
    {
      si_no: 1,
      name: "",
      hsncode: 0,
      quantity: 0,
      weight: 0,
      rate: 0,
      value: 0,
    },
  ]);
  const [cgst, setCgst] = useState();
  const [sgst, setSgst] = useState();
  const [igst, setIgst] = useState();
  const [totalInWords, setTotalInWords] = useState("");
  const [castingDetails, setcastingDetails] = useState([]);

  const toWords = new ToWords();
  const totalQuantity = items.reduce((total, item) => total + (item.quantity || 0), 0);
  const totalWeight = items.reduce((total, item) => total + (item.weight || 0), 0);


  const handleAddRow = (e) => {
    e.preventDefault();
    setitems([
      ...items,
      {
        si_no: 0,
        name: "",
        hsncode: 0,
        quantity: 0,
        weight: 0,
        rate: 0,
        value: 0,
      },
    ]);
  };

  const handleRemoveRow = (index) => {
    setitems((prevItems) => {
      const updatedItems = prevItems.filter((_, i) => i !== index);

      return updatedItems.map((item) => ({
        ...item,
        value: item.weight * item.rate || 0,
      }));
    });
  };

  const handleInputChange = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index] = { ...updatedItems[index], [field]: value };
    console.log("update",updatedItems);

    // if (field === "weight" || field === "rate") {
    //   const calculatedvalue =
    //     updatedItems[index].weight * updatedItems[index].rate;
    //   updatedItems[index].value = parseFloat(calculatedvalue.toFixed(2));
    // }
    if (field === "quantity" && updatedItems[index].unitWeight) {
      console.log("quantity change")
      // Update the weight dynamically based on quantity
      updatedItems[index].weight = updatedItems[index].unitWeight * value;
      updatedItems[index].weight=parseFloat(updatedItems[index].weight.toFixed(2));
      const calculatedvalue =
        updatedItems[index].weight * updatedItems[index].rate;
      updatedItems[index].value = parseFloat(calculatedvalue.toFixed(2));
    }

    if (field === "weight" || field === "rate") {
      const calculatedvalue =
        updatedItems[index].weight * updatedItems[index].rate;
      updatedItems[index].value = parseFloat(calculatedvalue.toFixed(2));
    }
    console.log(updatedItems);



    setitems(updatedItems);
  };

  const totalTaxableValue = items.reduce(
    (total, item) => total + (item.value || 0),
    0
  );

  const cgstAmount = (totalTaxableValue * cgst) / 100;
  const sgstAmount = (totalTaxableValue * sgst) / 100;
  const igstAmount = (totalTaxableValue * igst) / 100;
  const totalGrandAmount =
    totalTaxableValue + cgstAmount + sgstAmount + igstAmount;

  const roundOffAmount = (amount) => {
    const rupee = Math.floor(amount);
    const paise = amount - rupee;

    if (paise >= 0.5) {
      return rupee + 1;
    }

    return rupee;
  };

  const roundedTotalGrandAmount = roundOffAmount(totalGrandAmount);
  const roundoffAdjustment = (
    roundedTotalGrandAmount - totalGrandAmount
  ).toFixed(2);

  useEffect(() => {
    let words = toWords.convert(roundedTotalGrandAmount || 0, {
      currency: true,
      ignoreDecimal: true,
    });
    setTotalInWords(words);
  }, [roundedTotalGrandAmount]);

  useEffect(() => {
    if (onInvoiceChange) {
      onInvoiceChange(
        items,
        cgst,
        sgst,
        igst,
        totalTaxableValue,
        roundoffAdjustment,
        totalGrandAmount,
        totalInWords
      );
    }
  }, [
    items,
    cgst,
    sgst,
    igst,
    totalTaxableValue,
    roundoffAdjustment,
    totalGrandAmount,
    totalInWords,
    onInvoiceChange,
  ]);
  useEffect(() => {
    const fetchCastingDetails = async () => {
      try {
        const response = await fetchcasting();
        if (!response) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        console.log("fetch casting details", data.casting);
        setcastingDetails(data.casting);
        console.log("console", data.casting);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchCastingDetails();
  }, []);
  const handleAutocompleteChange = (index, selectedProduct) => {
    if (!selectedProduct) return;

    const updatedItems = [...items];
    console.log("select", selectedProduct);
    updatedItems[index] = {
      ...updatedItems[index],
      name: selectedProduct.casting_name,
      hsncode: selectedProduct.casting_hsn,
      unitWeight: selectedProduct.casting_weight,
    };
    if (updatedItems[index].quantity) {
      updatedItems[index].weight = updatedItems[index].unitWeight * updatedItems[index].quantity;
    }

    setitems(updatedItems);
  };

  return (
    <div>
      {" "}
      <TableContainer
        component={Paper}
        className="tb-container"
        sx={{ height: "550px", width: "auto" ,position:"relative"}}
      >
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  padding: "2px",
                  borderRight: "1px solid black",
                  borderBottom: "1.2px solid black",
                  width: "2.8%",
                  fontSize: "1rem",
                }}
              >
                SI.No
              </TableCell>
              <TableCell
                sx={{
                  padding: "2px",
                  borderRight: "1px solid black",
                  borderBottom: "1.2px solid black",
                  width: "20%",
                  fontSize: "1rem",
                }}
              >
                Name Of Products
              </TableCell>
              <TableCell
                sx={{
                  padding: "2px",
                  borderRight: "1px solid black",
                  borderBottom: "1.2px solid black",
                  width: "13.1%",
                  fontSize: "1rem",
                }}
              >
                HSN CODE
              </TableCell>
              <TableCell
                sx={{
                  padding: "2px",
                  borderRight: "1px solid black",
                  borderBottom: "1.2px solid black",
                  width: "8%",
                  fontSize: "1rem",
                }}
              >
                Quantity(Nos)
              </TableCell>
              <TableCell
                sx={{
                  padding: "3px",
                  borderRight: "1px solid black",
                  borderBottom: "1.2px solid black",
                  width: "10%",
                  fontSize: "1rem",
                }}
              >
                Weight(KGS)
              </TableCell>
              <TableCell
                sx={{
                  padding: "2px",
                  borderRight: "1px solid black",
                  borderBottom: "1.2px solid black",
                  width: "9%",
                  fontSize: "1rem",
                }}
              >
                Rate/Kg
              </TableCell>
              <TableCell
                sx={{
                  padding: "2px",
                  width: "10%",
                  fontSize: "1rem",
                  borderBottom: "1.2px solid black",
                }}
              >
                Taxable Value
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item, index) => (
              <TableRow
                key={index}
                sx={{
                  borderBottom: "1.2px solid black", // Added row border for consistency
                }}
              >
                <TableCell
                  sx={{
                    padding: "2.8px",
                    borderRight: "1px solid black",
                    verticalAlign: "top",
                    borderBottom: "1.2px solid black",
                  }}
                >
                  <TextField
                    variant="standard"
                    InputProps={{
                      sx: {
                        fontSize: "15px",
                        padding: "0px",
                        margin: "0px",
                        lineHeight: 1,
                      },
                      disableUnderline: true,
                    }}
                    value={index + 1}
                    onChange={(e) =>
                      handleInputChange(
                        index,
                        "si_no",
                        parseInt(e.target.value) || 0
                      )
                    }
                  />
                </TableCell>
                <TableCell
                  sx={{
                    padding: "2.8px",
                    borderRight: "1px solid black",
                    verticalAlign: "top",
                    borderBottom: "1.2px solid black",
                  }}
                >
                  <Autocomplete
                  freeSolo
                    options={castingDetails}
                    getOptionLabel={(option) => option.casting_name || ""}
                    onChange={(e, selectedProduct) =>
                      handleAutocompleteChange(index, selectedProduct)
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="standard"
                        multiline
                        sx={{ width: "350px" }}
                        InputProps={{
                          ...params.InputProps,
                          disableUnderline: true,
                          sx: { fontSize: "15px",fontWeight:"bold" },
                        }}
                        onChange={(e) =>
                          handleInputChange(
                            index,
                            "name",
                            e.target.value || " "
                          )
                        }
                      />
                    )}
                    popupIcon={null} // Hides dropdown arrow
    disableClearable
    forcePopupIcon={false}
    
                  />
                </TableCell>
                <TableCell
                  sx={{
                    padding: "2.8px",
                    borderRight: "1px solid black",
                    verticalAlign: "top",
                    borderBottom: "1.2px solid black",
                  }}
                >
                  <TextField
                    variant="standard"
                    value={item.hsncode}
                    InputProps={{
                      sx: { fontSize: "15px" },
                      disableUnderline: true,
                    }}
                    onChange={(e) =>
                      handleInputChange(
                        index,
                        "hsncode",
                        parseInt(e.target.value) || 0
                      )
                    }
                  />
                </TableCell>
                <TableCell
                  sx={{
                    padding: "2.8px",
                    borderRight: "1px solid black",
                    verticalAlign: "top",
                    borderBottom: "1.2px solid black",
                  }}
                >
                  <TextField
                    variant="standard"
                    InputProps={{
                      sx: { fontSize: "15px" },
                      disableUnderline: true,
                    }}
                    onChange={(e) =>
                      handleInputChange(
                        index,
                        "quantity",
                        parseInt(e.target.value) || 0
                      )
                    }
                  />
                </TableCell>
                <TableCell
                  sx={{
                    padding: "2.8px",
                    borderRight: "1px solid black",
                    verticalAlign: "top",
                    borderBottom: "1.2px solid black",
                  }}
                >
                  <TextField
                    variant="standard"
                    value={item.weight}
                    onChange={(e) =>
                      handleInputChange(
                        index,
                        "weight",
                        (e.target.value) || 0
                      )
                    }
                    InputProps={{
                      sx: { fontSize: "15px" ,fontWeight:"bold"},
                      disableUnderline: true,
                    }}
                  />
                </TableCell>
                <TableCell
                  sx={{
                    padding: "2.8px",
                    borderRight: "1px solid black",
                    verticalAlign: "top",
                    borderBottom: "1.2px solid black",
                  }}
                >
                  <TextField
                    variant="standard"
                    sx={{ width: "40px" }}
                    InputProps={{
                      sx: { fontSize: "15px" },
                      disableUnderline: true,
                    }}
                    onChange={(e) =>
                      handleInputChange(
                        index,
                        "rate",
                        parseFloat(e.target.value) || 0
                      )
                    }
                  />
                </TableCell>
                <TableCell sx={{ padding: "2.8px", verticalAlign: "top",borderBottom: "1.2px solid black", }}>
                  <TextField
                    variant="standard"
                    InputProps={{
                      padding: "4px",
                      sx: { fontSize: "15px" },
                      disableUnderline: true,inputProps: { style: { fontWeight: "bold" } }
                    }}
                    value={item.value || 0}
                  />
                </TableCell>
              </TableRow>
            ))}
            </TableBody>
          
        </Table>
        <div
    style={{
      position: "absolute",
      bottom: "0",
      width: "100%",
      backgroundColor: "#fff", // To ensure it has a background color
      padding: "0px 0", // Optional padding for spacing
      borderTop: "1px solid black", // Optional border on top
    }}
  >
    <div className="footer-content">
      <TableRow sx={{borderTop:"1px solid black"}}>
        
        <TableCell colSpan={3}></TableCell>
        <TableCell colSpan={2}></TableCell>
        <TableCell colSpan={3}></TableCell>
        <TableCell colSpan={2}></TableCell>
        <TableCell colSpan={3}></TableCell>
        <TableCell colSpan={2}></TableCell>
        <TableCell colSpan={3}></TableCell>
        <TableCell colSpan={2}></TableCell>
        <TableCell colSpan={3}></TableCell>
        <TableCell colSpan={2}></TableCell>
        <TableCell colSpan={3}></TableCell>
        <TableCell colSpan={2}></TableCell>
        <TableCell colSpan={3}></TableCell>
        <TableCell colSpan={2}></TableCell>
              <TableCell colSpan={10} sx={{ fontWeight: 'bold', textAlign: 'right', borderRight: "1px solid black",paddingRight:'70px' }}>
                Total :
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold', borderRight: "1px solid black",paddingRight:'40px'  }}>{totalQuantity} Nos</TableCell>
              <TableCell sx={{ fontWeight: 'bold', borderRight: "1px solid black",paddingRight:'22px'  }}>{totalWeight.toFixed(2)} Kgs</TableCell>
              
            </TableRow>
          
          </div></div>
      </TableContainer>
      <div>
        <Button className="hide-print" onClick={handleAddRow}>
          +
        </Button>
        <Button
          className="hide-print"
          onClick={() => handleRemoveRow(items.length - 1)}
          disabled={items.length === 1}
        >
          -
        </Button>
      </div>
      <div class="main-grid">
        <div class="main-column">
          &nbsp;
          <Typography
            variant="body1"
            sx={{ fontSize: "1.0rem",marginLeft:"10px" }}
          >
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Total Invoice Amount in Words:
            <div style={{
      marginLeft: "5px", // Matches the indentation of the top text
      whiteSpace: "normal", // Allows the text to wrap
      wordWrap: "break-word", // Ensures long words break if necessary
    }}>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
             <b> {totalInWords}</b>
            </div>
          </Typography>
        </div>
        <div class="second-column">
          <div class="sub-grid">
            <div class="sub-grid-item">
              <Typography
                variant="body1"
                sx={{ fontSize: "0.95rem", fontWeight: "bold" }}
              >
                Total Amount Before Tax:{" "}
              </Typography>
            </div>
            <div class="sub-grid-item"><b>{totalTaxableValue}</b>&nbsp;&nbsp;</div>
            <div class="sub-grid-item">
              <Typography
                variant="body1"
                sx={{
                  fontSize: "0.95rem",
                  fontWeight: "bold",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                Add.CGST:
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    flex: 1,
                  }}
                >
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <TextField
                    variant="standard"
                    value={cgst}
                    onChange={(e) => setCgst(parseFloat(e.target.value) || 0)}
                    sx={{ flex: "0 0 auto", width: "30px" }}
                    InputProps={{ disableUnderline: true }}
                  />
                  %
                </div>
              </Typography>
            </div>
            <div class="sub-grid-item"><b>{cgstAmount.toFixed(2)}</b></div>
            <div class="sub-grid-item">
              <Typography
                variant="body1"
                sx={{
                  fontSize: "0.95rem",
                  fontWeight: "bold",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                Add.SGST:
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    flex: 1,
                  }}
                >
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <TextField
                    variant="standard"
                    value={sgst}
                    onChange={(e) => setSgst(parseFloat(e.target.value) || 0)}
                    sx={{ flex: "0 0 auto", width: "30px" }}
                    InputProps={{ disableUnderline: true }}
                  />
                  %
                </div>
              </Typography>
            </div>
            <div class="sub-grid-item"><b>{sgstAmount.toFixed(2)}</b></div>
            <div class="sub-grid-item">
              <Typography
                variant="body1"
                sx={{
                  fontSize: "0.95rem",
                  fontWeight: "bold",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                Add.IGST:
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    flex: 1,
                  }}
                >
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <TextField
                    variant="standard"
                    value={igst}
                    onChange={(e) => setIgst(parseFloat(e.target.value) || 0)}
                    sx={{ flex: "0 0 auto", width: "30px" }}
                    InputProps={{ disableUnderline: true }}
                  />
                  %
                </div>
              </Typography>
            </div>
            <div class="sub-grid-item"><b>{igstAmount.toFixed(2)}</b>&nbsp;&nbsp;</div>
            <div class="sub-grid-item">
              <Typography
                variant="body1"
                sx={{ fontSize: "0.99rem", fontWeight: "bold" }}
              >
                RoundOff Amount:
              </Typography>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </div>
            <div class="sub-grid-item">
              {(() => {
                const prefix = parseFloat(roundoffAdjustment) > 0 ? "+" : "";

                // Return formatted value with prefix
                return `${prefix}${roundoffAdjustment}`;
              })()}
              &nbsp;&nbsp;
            </div>
            <div class="sub-grid-item">
              <Typography
                variant="body1"
                sx={{ fontSize: "0.99rem", fontWeight: "bold" }}
              >
                Total Grand Amount:
              </Typography>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </div>
            <div class="sub-grid-item">
              <b>{roundedTotalGrandAmount.toFixed(2)}</b>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Invoice;
