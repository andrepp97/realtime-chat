import React, { useContext, createContext, useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { useContacts } from './ContactProvider';

const ChatContext = createContext()

export const useChats = () => {
    return useContext(ChatContext)
}

export const ChatProvider = ({ children }) => {
    // STATE
    const [chats, setChats] = useLocalStorage('chats', [])
    const [selectedChatIndex, setSelectedChatIndex] = useState(0)

    // CONTEXT
    const { contacts } = useContacts()

    // FUNCTIONS
    const createChat = (recipients) => {
        setChats(prevChats => {
            return [...prevChats, { recipients, messages: [] }]
        })
    }

    // FORMATTING
    const formattedChats = chats.map((chat,idx) => {
        const recipients = chat.recipients.map(recipient => {
            const contact = contacts.find(contact => {
                return contact.id === recipient
            })
            const name = (contact && contact.name) || recipient
            return { id: recipient, name }
        })
        const selected = idx === selectedChatIndex
        return {...chats, recipients, selected}
    })

    const values = {
        chats: formattedChats,
        selectChatIndex: setSelectedChatIndex,
        selectedChat: formattedChats[selectedChatIndex],
        createChat
    }

    // RENDER
    return (
        <ChatContext.Provider value={values}>
            {children}
        </ChatContext.Provider>
    );
};
