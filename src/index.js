import React from "react";
import ReactDOM from "react-dom/client";
import App from './App.js';
import { TestModeContextProvider } from "./context/TestModeContext.jsx";
import { ThemeContextProvider } from "./context/ThemeContext.jsx";
import { BrowserRouter } from "react-router-dom";

const root  =document.getElementById("root")
ReactDOM.createRoot(root).render(
<ThemeContextProvider>
<TestModeContextProvider>
    <BrowserRouter>
    <App/>
    </BrowserRouter>
</TestModeContextProvider>
</ThemeContextProvider>
);



