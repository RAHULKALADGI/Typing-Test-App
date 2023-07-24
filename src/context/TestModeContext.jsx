import { createContext, useContext, useState } from "react";

let TestModeContext = createContext();

export let TestModeContextProvider = ({children})=> {
    
    let [testTime , setTestTime] = useState(15);

    let values = {
        testTime,
        setTestTime,
    }
    
    return (
        <TestModeContext.Provider value={values}>
            {children}
        </TestModeContext.Provider>
    )
}

export let useTestMode = ()=> useContext(TestModeContext);