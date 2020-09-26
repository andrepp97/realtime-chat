import React, { useContext, createContext } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const ContactContext = createContext()

export const useContacts = () => {
    return useContext(ContactContext)
}

export const ContactProvider = ({ children }) => {
    // STATE
    const [contacts, setContacts] = useLocalStorage('contacts', [])

    // CREATE CONTACT
    const createContact = (obj) => {
        setContacts(prevContacts => {
            return [...prevContacts, {...obj}]
        })
    }

    // RENDER
    return (
        <ContactContext.Provider value={{ contacts, createContact }}>
            {children}
        </ContactContext.Provider>
    );
};
