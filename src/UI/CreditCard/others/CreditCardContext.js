import React, { createContext, useState } from "react";
export const CreditCardContext = createContext();

function CreditCardContextProvider({ children }) {
    const [onFocus, setOnFocus] = useState()
    const [antesOnFocus, setAntesOnFocus] = useState()
    return (
        <CreditCardContext.Provider value={{ onFocus, setOnFocus}}>
            {children}
        </CreditCardContext.Provider>
    );
}

export default CreditCardContextProvider;