
import React from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter } from "react-router-dom";
import { CarritoProvider } from "./context/CarritoContext";
import { AuthProvider } from "./context/AuthContext";

import "./index.css";

import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
    <AuthProvider>
    <CarritoProvider>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </CarritoProvider>
    </AuthProvider>
    </React.StrictMode>,
);