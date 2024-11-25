import React from "react";
import ReactDOM from "react-dom/client"; // Use 'react-dom/client' for React 18+
import App from "./containers/App/App"; // Ensure this path is correct
import "./index.css"; // Import your CSS file if you have one

// Create a root for React 18
const root = ReactDOM.createRoot(document.getElementById("root"));

// Render the App component into the root
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
