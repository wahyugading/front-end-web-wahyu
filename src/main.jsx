// src/main.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App.jsx";
import { AuthProvider } from "./context/authContext.jsx";
import { PublicationProvider } from "./context/PublicationsContext.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <AuthProvider> {/* Memastikan useAuth() berfungsi */}
        <PublicationProvider> {/* Memastikan usePublications() berfungsi */}
          <App />
        </PublicationProvider>
      </AuthProvider>
    </Router>
  </StrictMode>
);