import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <App />
              <Analytics />
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
