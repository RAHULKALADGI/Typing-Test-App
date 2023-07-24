import { createContext, useContext, useState } from "react";
import { themeOptions } from "../Utils/themeOptions";

let ThemeContext = createContext();

export let ThemeContextProvider = ({children})=> {
    
    let defaultValue = JSON.parse(localStorage.getItem("theme")) || themeOptions[0].value;
    let [theme , setTheme] = useState(defaultValue);

    let values = {
        theme,
        setTheme
    }

    return (<ThemeContext.Provider value={values}>
        {children}
    </ThemeContext.Provider>)
}

export let useTheme = ()=> useContext(ThemeContext);