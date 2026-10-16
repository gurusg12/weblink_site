import React from "react";
import "./App.css";

import { useState, useEffect } from "react";


function App() {


    const [q, setq] = useState("");
    const [U, setU] = useState("");
  


  
  const { usage, quota } = await navigator.storage.estimate();

console.log("Used MB:", Math.round(usage / 1024 / 1024));
console.log("Quota MB:", Math.round(quota / 1024 / 1024));


    useEffect(() => {
    const { usage, quota } = await navigator.storage.estimate();

      const data = Math.round(usage / 1024 / 1024)
      const data2 = Math.round(quota / 1024 / 1024)

      setq(data)
      setU(data2)
      
      

console.log("Used MB:", Math.round(usage / 1024 / 1024));
console.log("Quota MB:", Math.round(quota / 1024 / 1024));

  }, []);


  
  const handlePrint = () => {

    const printData = {
      action: "print",
      text: `
        ==============================
              MY SHOP
        ==============================

        Invoice No: INV-1001
        Customer: Guru

        ------------------------------
        Product        Qty       Price
        ------------------------------
        Paracetamol     2        100
        Syrup           1         80
        ------------------------------

        TOTAL                    180
        ==============================

              THANK YOU!
        
        \n\n\n
      `,
    };

    const encodedData = encodeURIComponent(
      JSON.stringify(printData)
    );

    // Open your React Native Android app
    window.location.href = `miterprint://${encodedData}`;
  };

  return (
    <div className="app">

      <h1>Miter Billing</h1>

      <button onClick={handlePrint}>
        🖨️ Print Invoice
      </button>

<h1>Used MB: {q}</h1>
<h1>Quota MB: {U}</h1>
      
    </div>
  );
}

export default App;
