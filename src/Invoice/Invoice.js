import "../Invoice/Invoice.css";

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
  const [items, setitems] = useState([{ si_no: 1, name: "", hsn: 0, qty: 0, weight: 0, rate: 0, value: 0 }]);
  const [cgst, setCgst] = useState();
  const [sgst, setSgst] = useState();
  const [igst, setIgst] = useState();
  const [totalInWords, setTotalInWords] = useState("");
  const toWords = new ToWords();

  const handleAddRow = (e) => {
    e.preventDefault();
    setitems([
      ...items,
      { si_no: 0, name: "", hsn: 0, qty: 0, weight: 0, rate: 0, value: 0 },
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
      updatedItems[index].value =
        updatedItems[index].weight * updatedItems[index].rate;
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
      return Math.ceil(amount);
    }

    return Math.floor(amount);
  };
  
  const roundedTotalGrandAmount = roundOffAmount(totalGrandAmount);
  useEffect(() => {
    let words = toWords.convert(roundedTotalGrandAmount || 0, { currency: true, ignoreDecimal: true });
    setTotalInWords(words);
  }, [roundedTotalGrandAmount]); 
  
  useEffect(() => {
    if (onInvoiceChange) {
      onInvoiceChange(items, cgst, sgst, igst,totalTaxableValue,totalGrandAmount,totalInWords);
    }
  }, [items, cgst, sgst, igst,totalTaxableValue,totalGrandAmount,totalInWords, onInvoiceChange ]);

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
                  width: "2.8%",
                }}
              >
                SI.No
              </TableCell>
              <TableCell
                sx={{
                  padding: "2px",
                  borderRight: "1px solid black",
                  width: "20%",
                }}
              >
                Name Of Products
              </TableCell>
              <TableCell
                sx={{
                  padding: "2px",
                  borderRight: "1px solid black",
                  width: "12.8%",
                }}
              >
                HSN CODE
              </TableCell>
              <TableCell
                sx={{
                  padding: "2px",
                  borderRight: "1px solid black",
                  width: "8%",
                }}
              >
                Qty
              </TableCell>
              <TableCell
                sx={{
                  padding: "3px",
                  borderRight: "1px solid black",
                  width: "10%",
                }}
              >
                Weight
              </TableCell>
              <TableCell
                sx={{
                  padding: "2px",
                  borderRight: "1px solid black",
                  width: "9%",
                }}
              >
                Rate
              </TableCell>
              <TableCell sx={{ padding: "2px", width: "10%" }}>
                Taxable Value
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item, index) => (
              <TableRow>
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
                        "hsn",
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
          <Typography
            variant="body1"
            sx={{ fontSize: "0.85rem", fontWeight: "bold" }}
          >
            Total Invoice Amount in Words:
            <div>{totalInWords}</div>
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
                >
                  <TextField
                    variant="standard"
                    value={cgst}
                    onChange={(e) => setCgst(parseFloat(e.target.value) || 0)}
                    sx={{ flex: "0 0 auto" ,width:'30px'}}
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
                >
                  <TextField
                    variant="standard"
                    value={sgst}
                    onChange={(e) => setSgst(parseFloat(e.target.value) || 0)}
                    sx={{ flex: "0 0 auto" ,width:'30px'}}
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
                >
                  <TextField
                    variant="standard"
                    value={igst}
                    onChange={(e) => setIgst(parseFloat(e.target.value) || 0)}
                    sx={{ flex: "0 0 auto",width:'30px' }}
                  />%
                </div>
              </Typography>
            </div>
            <div class="sub-grid-item">{igstAmount.toFixed(2)}</div>
            <div class="sub-grid-item">
              <Typography
                variant="body1"
                sx={{ fontSize: "0.99rem", fontWeight: "bold" }}
              >
                Total Grand Amount:
              </Typography>
            </div>
            <div class="sub-grid-item">{totalGrandAmount.toFixed(2)}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Invoice;
