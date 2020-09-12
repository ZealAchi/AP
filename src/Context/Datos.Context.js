/* eslint-disable prettier/prettier */
/* eslint-disable no-trailing-spaces */
import React, { useEffect, createContext, useState } from "react";
import { useData } from "../Hooks/useData";
import { useLocalStorage } from "../Hooks/useLocalStorage";

export const DataContext = createContext();

function DataContextProvider({ children }) {
    const data = useData()
    const localStorage = useLocalStorage()
    const [pagarWhats,setPagarWhats]=useState()
    const [password, setPassword] = useState()
    const [isNewUser,setIsNewUser]= useState()
    const [token, setToken] = useState()
    const [tokenX,setTokenX]=useState()
    const [avatar, setAvatar] = useState()
    const [withFinger, setWithFinger] = useState(false)
    const [contactsMatch,setContactsMatch]=useState([])
    const [newPassword,setNewPassword]=useState(false)
    const [usersReferences,setUsersReferences]=useState([])
    const [saveImgUser,setSaveImgUser]=useState([])
    const [balances,setBalances]=useState()

    const updateNewPassword=(value)=>{
        setNewPassword(value)
    }
    
    const getRut = (usuarioRUT) => {
        data.setState({ ...data.state, usuarioRUT })
    }
    const getPassword = (pass) => {
        setPassword(pass)
    }
    const getWithFinger = (finger) => {
        setWithFinger(finger)
    }
    const getNewUser=(newUser)=>{
        setIsNewUser(newUser)
    }
    const getToken=(token)=>{
        setToken(token)
        console.log('token',token,'token')
    }
    const getTokenX=(token)=>{
        setTokenX(token)
    }

    // console.log(token,'token')
    useEffect(() => {
        localStorage.getData('@App:RUT', getRut)
        localStorage.getData('@App:Password', getPassword)
        localStorage.getData('@App:withFinger', getWithFinger)
        localStorage.getData('@App:isNewUser', getNewUser)
        // localStorage.getData('@App:token',getToken)
        localStorage.getData('@App:tokenX',getTokenX)
    }, [])
    const getAvatar = (newAvatar) => {
            setAvatar(newAvatar)
    }
    
    const obtenerPin=()=>localStorage.getData('@App:Password', getPassword)
    
    return (
        <DataContext.Provider value={{ ...data,usersReferences,saveImgUser,setSaveImgUser,setUsersReferences,contactsMatch,setContactsMatch,password, token, getPassword, setToken, withFinger, setWithFinger,avatar, getAvatar,newPassword,updateNewPassword,balances,setBalances,isNewUser,getNewUser,getToken, obtenerPin,pagarWhats,setPagarWhats,tokenX,setTokenX}}>
            {children}
        </DataContext.Provider>
    );
}

export default DataContextProvider;

