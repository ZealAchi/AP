import React, {createContext } from "react";
export const VariablesContext = createContext();

function VariablesContextProvider({children}) {
    // const uri= 'https://192.168.1.112'
    // const uri='http://192.168.1.109:3000'
    const uri= 'https://186.64.122.181'
    return (
        <VariablesContext.Provider value={{ uri }}>
            {children}
        </VariablesContext.Provider>
    );
}

export default VariablesContextProvider;