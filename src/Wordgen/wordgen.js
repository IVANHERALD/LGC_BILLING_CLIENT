import React, { useState,useEffect } from 'react';

function NumberToWords({total}) {
  
  const [words, setWords] = useState('');

  const units = ["", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
  const teens = ["", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];
  const tens = ["", "ten", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];
  const thousands = ["", "thousand", "lakh", "crore"];
  useEffect(() => {
    if (total) {
      setWords(convertToWords(total));
    }
  }, [total]);

  function convertToWords(num) {
    if (num === "0") return "zero";

    let numStr = parseInt(num, 10).toString();  // Remove leading zeros
    let words = '';
    let parts = [];

    // Break number into parts based on Indian system grouping (3-2-2)
    if (numStr.length > 3) {
      parts.unshift(numStr.slice(-3));  // Last three digits
      numStr = numStr.slice(0, -3);
    }
    while (numStr.length > 2) {
      parts.unshift(numStr.slice(-2));  // Next two digits
      numStr = numStr.slice(0, -2);
    }
    if (numStr.length > 0) {
      parts.unshift(numStr);  // Remaining digits
    }

    // Convert each part into words
    for (let i = 0; i < parts.length; i++) {
      const part = parseInt(parts[i], 10);
      if (part) {
        words += chunkToWords(part) + (thousands[parts.length - i - 1] ? " " + thousands[parts.length - i - 1] + " " : "");
      }
    }

    return words.trim() + " only";
  }

  function chunkToWords(num) {
    let str = '';

    if (num >= 100) {
      str += units[Math.floor(num / 100)] + " hundred ";
      num %= 100;
    }

    if (num >= 11 && num <= 19) {
      str += teens[num - 10] + " ";
    } else {
      str += tens[Math.floor(num / 10)] + " ";
      num %= 10;
      str += units[num] + " ";
    }

    return str.trim();
  }

  

  return (
    <div>
      {words}
    </div>
  );
}

export default NumberToWords;
