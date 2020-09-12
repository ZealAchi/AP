import React, { useContext, useState, createContext, useEffect } from "react";
import { useLoading } from "../Hooks/useLoading";
// import ContextDevTool from 'react-context-devtool';

export const LoadingContext = createContext();

function LoadingContextProvider({ children }) {
    const {setState,state} = useLoading()
    const LoadingIconTrue = () =>  setState({ type: 'Icon',Loading:true })
    const LoadingScreenTrue = () =>  setState({ type: 'Screen',Loading:true })
    const LoadingFalse = () => setState({  Loading: false,type:null })
    return (
        <LoadingContext.Provider
            value={{
                ...state,
                LoadingIconTrue,
                LoadingScreenTrue,
                LoadingFalse
            }}
        >
            {/* <ContextDevTool context={LoadingContext} id="LoadingContext" displayName="Loading Context" /> */}
            {children}
        </LoadingContext.Provider>
    );
}

export default LoadingContextProvider;