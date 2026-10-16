
import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [q, setq] = useState(0);
  const [U, setU] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    const getStorageInfo = async () => {
      try {
        const { usage, quota } =
          await navigator.storage.estimate();

        const data = Math.round(usage / 1024 / 1024);
        const data2 = Math.round(quota / 1024 / 1024);

        setq(data);
        setU(data2);

        console.log("Used MB:", data);
        console.log("Quota MB:", data2);
      } catch (err) {
        console.error("Storage estimate failed:", err);
        setError("Unable to get storage information.");
      }
    };

    getStorageInfo();
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
Paracetamol     2         100
Syrup           1          80
------------------------------

TOTAL                     180
==============================

          THANK YOU!


`,
    };

    const encodedData = encodeURIComponent(
      JSON.stringify(printData)
    );

    window.location.href = `miterprint://${encodedData}`;
  };

  return (
    <div className="app">
      <h1>Miter Billing</h1>

      <button onClick={handlePrint}>
        🖨️ Print Invoice
      </button>

      <h2>Used MB: {q}</h2>
      <h2>Quota MB: {U}</h2>

      {error && <p>{error}</p>}
    </div>
  );
}

export default App;
