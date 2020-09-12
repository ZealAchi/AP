/* eslint-disable prettier/prettier */
/* eslint-disable no-trailing-spaces */
import React, { createContext, useState } from 'react';

export const ModalContext = createContext();

export default function ModalContextProvider({ children }) {
    const [status, setStatus] = useState(false);
    const changeStatus = () => {
        setStatus(!status)
    }
    const [type,setType]=useState('')
    
    return (
        <ModalContext.Provider value={{changeStatus,status,setType,type}}>
            {children}
        </ModalContext.Provider>

    )

}
