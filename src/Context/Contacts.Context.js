import React, {createContext, useState} from 'react'
export const ContactsContext = createContext()

function ContactsContextProvider({children}) {
  const [state, setState] = useState([])

  return (
    <ContactsContext.Provider value={{state, setState}}>
      {children}
    </ContactsContext.Provider>
  );
}

export default ContactsContextProvider;
