
import { useEffect, useState } from "react";
import { getApiHealth } from "./services/api";

function App() {
  const [status, setStatus] = useState("Connecting...");
  const [error, setError] = useState(false);

  useEffect(() => {
    getApiHealth()
      .then((data) => {
        setStatus(data.message);
        setError(false);
      })
      .catch(() => {
        setStatus("Backend connection failed");
        setError(true);
      });
  }, []);

  return (
    <main
      style={{
        maxWidth: 640,
        margin: "80px auto",
        padding: 24,
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <h1>PoshakSwitch</h1>
      <p>Your Nutrition Management Platform</p>

      <section aria-live="polite">
        <h2>Backend Connection</h2>
        <p style={{ color: error ? "crimson" : "green" }}>
          {status}
        </p>
      </section>
    </main>
  );
}

export default App;
