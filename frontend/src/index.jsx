// frontend/src/index.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { LoanProvider } from "../hooks/LoanContext";
import "../styles.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <LoanProvider>
      <App />
    </LoanProvider>
  </React.StrictMode>
);
