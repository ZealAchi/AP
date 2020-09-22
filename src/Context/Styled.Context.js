/* eslint-disable prettier/prettier */
/* eslint-disable no-trailing-spaces */

import React, { createContext, useState } from 'react';
import Colors from '../UI/Colors';
export const StyledContext = createContext();

export default function StyledContextProvider({ children }) {
    const theme = {
        dark: {
            // No disponible
        },
        light: {
            primary: {
                color1: Colors.Primary
            },
            secondary: {
                color1: Colors.Primary
            }
        }
    }
    const [themeCurrent, setThemeCurrent] = useState(theme.light.primary);
    const changeThemeSecondLight = () => {
        setThemeCurrent(theme.light.secondary);
    }
    const changeThemePrimaryLight = () => {
        setThemeCurrent(theme.light.primary);
    }
    return (
        <StyledContext.Provider value={{themeCurrent, changeThemeSecondLight, changeThemePrimaryLight}}>
            {children}
        </StyledContext.Provider>

    )

}
