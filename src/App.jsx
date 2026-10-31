
import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [storage, setStorage] = useState({
    usage: 0,
    quota: 0,
    available: 0,
  });

  const [persistent, setPersistent] = useState(false);

  useEffect(() => {
    async function getStorageInfo() {
      try {
        // Get browser storage estimate
        const estimate = await navigator.storage.estimate();

        const usage = estimate.usage || 0;
        const quota = estimate.quota || 0;

        // Remaining estimated origin quota
        const available = quota - usage;

        // Request persistent storage
        const isPersistent =
          await navigator.storage.persist();

        setPersistent(isPersistent);

        setStorage({
          usage: (usage / 1024 ** 3).toFixed(3),
          quota: (quota / 1024 ** 3).toFixed(3),
          available: (available / 1024 ** 3).toFixed(3),
        });

      } catch (error) {
        console.error(error);
      }
    }

    getStorageInfo();
  }, []);

  return (
    <div>
      <h1>Browser Storage Information</h1>

      <h3>Used: {storage.usage} GB</h3>
      <h3>Quota: {storage.quota} GB</h3>
      <h3>Remaining: {storage.available} GB</h3>

      <h3>
        Persistent Storage: {persistent ? "Yes" : "No"}
      </h3>
    </div>
  );
}

export default App;
