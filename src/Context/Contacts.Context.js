import React, {createContext, useState} from 'react'
export const ContactsContext = createContext()

function ContactsContextProvider({children}) {
  const [state, setState] = useState([])
  const [contactsM, setContactsM] = useState([])

  return (
    <ContactsContext.Provider value={{state, setState,contactsM, setContactsM}}>
      {children}
    </ContactsContext.Provider>
  );
}

export default ContactsContextProvider;
