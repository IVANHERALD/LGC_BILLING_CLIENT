import "../Invoice/Invoice.css";
import Autocomplete from "@mui/material";
import { fetchcasting } from "../services/Casting";

import {
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { ToWords } from 'to-words';

function Invoice({ onInvoiceChange }) {
  const [items, setitems] = useState([{ si_no: 1, name: "", hsncode: 0, quantity: 0, weight: 0, rate: 0, value: 0 }]);
  const [cgst, setCgst] = useState();
  const [sgst, setSgst] = useState();
  const [igst, setIgst] = useState();
  const [totalInWords, setTotalInWords] = useState("");
  const [castingDetails,setcastingDetails]=useState([]);

  const toWords = new ToWords();

  const handleAddRow = (e) => {
    e.preventDefault();
    setitems([
      ...items,
      { si_no: 0, name: "", hsncode: 0, quantity: 0, weight: 0, rate: 0, value: 0 },
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
    console.log(updatedItems)

    if (field === "weight" || field === "rate") {
      const calculatedvalue=
        updatedItems[index].weight * updatedItems[index].rate;
        updatedItems[index].value=parseFloat(calculatedvalue.toFixed(2))
    }

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

      return rupee+1;
    }

    return rupee;
  };
  
  
  const roundedTotalGrandAmount= roundOffAmount(totalGrandAmount);
  console.log(roundedTotalGrandAmount);
  const roundoffAdjustment=(roundedTotalGrandAmount-totalGrandAmount).toFixed(2);
  console.log(roundoffAdjustment);

  useEffect(() => {
    let words = toWords.convert(roundedTotalGrandAmount || 0, { currency: true, ignoreDecimal: true });
    setTotalInWords(words);
  }, [roundedTotalGrandAmount]); 
  
  useEffect(() => {
    if (onInvoiceChange) {
      onInvoiceChange(items, cgst, sgst, igst,totalTaxableValue,roundoffAdjustment,totalGrandAmount,totalInWords);
    }
  }, [items, cgst, sgst, igst,totalTaxableValue,roundoffAdjustment,totalGrandAmount,totalInWords, onInvoiceChange ]);
  useEffect(() => {

    const fetchCastingDetails = async () => {
        try {
            const response = await fetchcasting();
            if (!response) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            console.log("fetch casting details" ,data.casting);
            setcastingDetails(data.casting);
            console.log("console",data.casting);
        } catch (error) {
            console.log(error.message);
        }
    };
  
    fetchCastingDetails();
  }, []);

  return (
    <div> 
      {" "}
      <TableContainer 
        component={Paper}
        className="tb-container"
        sx={{ height: "550px" }}
      >
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  padding: "2px",
                  borderRight: "1px solid black",
                  borderBottom: "1px solid black",
                  width: "2.8%",
                  fontSize: "1rem"
                }}
              >
                SI.No
              </TableCell>
              <TableCell
                sx={{
                  padding: "2px",
                  borderRight: "1px solid black",
                  borderBottom: "1px solid black",
                  width: "20%",
                  fontSize: "1rem"
                }}
              >
                Name Of Products
              </TableCell>
              <TableCell
                sx={{
                  padding: "2px",
                  borderRight: "1px solid black",
                  borderBottom: "1px solid black",
                  width: "13.375%",
                  fontSize: "1rem"
                }}
              >
                HSN CODE
              </TableCell>
              <TableCell
                sx={{
                  padding: "2px",
                  borderRight: "1px solid black",
                  borderBottom: "1px solid black",
                  width: "8%",
                  fontSize: "1rem"
                }}
              >
                Qty
              </TableCell>
              <TableCell
                sx={{
                  padding: "3px",
                  borderRight: "1px solid black",
                  borderBottom: "1px solid black",
                  width: "10%",
                  fontSize: "1rem"
                }}
              >
                Weight
              </TableCell>
              <TableCell
                sx={{
                  padding: "2px",
                  borderRight: "1px solid black",
                  borderBottom: "1px solid black",
                  width: "9%",
                  fontSize: "1rem"
                }}
              >
                Rate
              </TableCell>
              <TableCell sx={{ padding: "2px", width: "10%",fontSize: "1rem",
                  borderBottom: "1px solid black", }}>
                Taxable Value
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item, index) => (
              <TableRow key={index}
              sx={{
                borderBottom: "1.2px solid black", // Added row border for consistency
              }}>
                <TableCell
                  sx={{
                    padding: "2.8px",
                    borderRight: "1px solid black",
                    verticalAlign: "top",
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
                  }}
                >
                  <TextField
                    variant="standard"
                    multiline
                    sx={{ width: "200px" }}
                    InputProps={{
                      disableUnderline: true,
                      sx: { fontSize: "15px" },
                      disableUnderline: true,
                    }}
                    onChange={(e) =>
                      handleInputChange(
                        index,
                        "name",
                        e.target.value || " "
                      )
                    }
                  />
                </TableCell>
                <TableCell
                  sx={{
                    padding: "2.8px",
                    borderRight: "1px solid black",
                    verticalAlign: "top",
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
                        "qty",
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
                  }}
                >
                  <TextField
                    variant="standard"
                    onChange={(e) =>
                      handleInputChange(
                        index,
                        "weight",
                        parseFloat(e.target.value) || 0
                      )
                    }
                    InputProps={{
                      sx: { fontSize: "15px" },
                      disableUnderline: true,
                    }}
                  />
                </TableCell>
                <TableCell
                  sx={{
                    padding: "2.8px",
                    borderRight: "1px solid black",
                    verticalAlign: "top",
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
                <TableCell sx={{ padding: "2.8px", verticalAlign: "top" }}>
                  <TextField
                    variant="standard"
                    InputProps={{
                      padding: "4px",
                      sx: { fontSize: "15px" },
                      disableUnderline: true,
                    }}
                    value={item.value || 0}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
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
            sx={{ fontSize: "1.0rem", fontWeight: "bold" }}
          >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            Total Invoice Amount in Words:
            
            <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{totalInWords}</div>
          </Typography>
        </div>
        <div class="second-column">
          <div class="sub-grid">
            <div class="sub-grid-item">
              <Typography
                variant="body1"
                sx={{ fontSize: "0.85rem", fontWeight: "bold" }}
              >
                Total Amount Before Tax:{" "}
              </Typography>
            </div>
            <div class="sub-grid-item">{totalTaxableValue}</div>
            <div class="sub-grid-item">
              <Typography
                variant="body1"
                sx={{
                  fontSize: "0.85rem",
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
                >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <TextField
                    variant="standard"
                    value={cgst}
                    onChange={(e) => setCgst(parseFloat(e.target.value) || 0)}
                    sx={{ flex: "0 0 auto" ,width:'30px'}}  InputProps={{ disableUnderline: true }}
                  />%
                </div>
              </Typography>
            </div>
            <div class="sub-grid-item">{cgstAmount.toFixed(2)}</div>
            <div class="sub-grid-item">
              <Typography
                variant="body1"
                sx={{
                  fontSize: "0.85rem",
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
                >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <TextField
                    variant="standard"
                    value={sgst}
                    onChange={(e) => setSgst(parseFloat(e.target.value) || 0)}
                    sx={{ flex: "0 0 auto" ,width:'30px'}}  InputProps={{ disableUnderline: true }}
                  />%
                </div>
              </Typography>
            </div>
            <div class="sub-grid-item">{sgstAmount.toFixed(2)}</div>
            <div class="sub-grid-item">
              <Typography
                variant="body1"
                sx={{
                  fontSize: "0.85rem",
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
                >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <TextField
                    variant="standard"
                    value={igst}
                    onChange={(e) => setIgst(parseFloat(e.target.value) || 0)}
                    sx={{ flex: "0 0 auto",width:'30px' }}  InputProps={{ disableUnderline: true }}
                  />%
                </div>
              </Typography>
            </div>
            <div class="sub-grid-item">{igstAmount.toFixed(2)}&nbsp;&nbsp;</div>
            <div class="sub-grid-item">
              <Typography
                variant="body1"
                sx={{ fontSize: "0.99rem", fontWeight: "bold" }}
              >
                RoundOff Amount:
              </Typography>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </div>
            <div class="sub-grid-item">{(()=>{
              const prefix = parseFloat(roundoffAdjustment) > 0 ? "+" : "";

              // Return formatted value with prefix
              return `${prefix}${roundoffAdjustment}`;
            })()}&nbsp;&nbsp;
  </div>
            <div class="sub-grid-item">
              <Typography
                variant="body1"
                sx={{ fontSize: "0.99rem", fontWeight: "bold" }}
              >
                Total Grand Amount:
              </Typography>&nbsp;&nbsp;
            </div>
            <div class="sub-grid-item">{roundedTotalGrandAmount.toFixed(2)}</div>
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default Invoice;
