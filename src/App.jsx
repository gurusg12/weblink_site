import React from "react";
import "./App.css";

function App() {

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

    </div>
  );
}

export default App;