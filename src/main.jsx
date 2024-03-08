import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

const accessToken = localStorage.getItem("spotifyAccessToken");

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              {accessToken && (
                <button
                  className="z-50 bg-black text-white p-2 fixed top-0 right-0 m-4 rounded-md"
                  onClick={() => {
                    localStorage.removeItem("spotifyAccessToken");
                    window.location.reload();
                  }}>
                  Cerrar sesión
                </button>
              )}
              <App />
              <Analytics />
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
