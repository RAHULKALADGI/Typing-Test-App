import React, { useState } from "react";
import { GlobalStyle } from "./styles/global.js";
import { ThemeProvider } from "styled-components";
import { useTheme } from "./context/ThemeContext.jsx"
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import UserPage from "./pages/UserPage.jsx";

const App=()=> {
    let {theme} = useTheme();

    return (
        <ThemeProvider theme={theme}>
            <ToastContainer />
            <GlobalStyle/>
        <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/user" element={<UserPage/>}/>
        </Routes>
        </ThemeProvider>
    )
    


}




export default App;
