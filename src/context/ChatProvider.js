import React, { useContext, createContext, useState, useEffect, useCallback } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { useContacts } from './ContactProvider';
import { useSocket } from './SocketProvider';

const ChatContext = createContext()

export const useChats = () => {
    return useContext(ChatContext)
}


export const ChatProvider = (props) => {

    // PROPS
    const { id, children } = props


    // STATE
    const [chats, setChats] = useLocalStorage('chats', [])
    const [selectedChatIndex, setSelectedChatIndex] = useState(0)


    // CONTEXT
    const { contacts } = useContacts()
    const socket = useSocket()


    // ===== FUNCTIONS =====
    const createChat = (recipients) => {
        setChats(prevChats => {
            return [...prevChats, { recipients, messages: [] }]
        })
    }

    const addMessageToChat = useCallback(({ recipients, text, sender }) => {
        setChats(prevChats => {
            let changed = false
            const newMessage = { sender, text }
            const newChats = prevChats.map(chat => {
                if (arrayEquality(chat.recipients, recipients)) {
                    changed = true
                    return {
                        ...chat,
                        messages: [...chat.messages, newMessage]
                    }
                }

                return chat
            })

            if (changed) {
                return newChats
            } else {
                return [
                    ...prevChats,
                    { recipients, messages: [newMessage] }
                ]
            }
        })
    }, [setChats])

    const sendMessage = (recipients, text) => {
        socket.emit('send-message', { recipients, text })

        addMessageToChat({ recipients, text, sender: id })
    }
    // ===== FUNCTIONS =====


    // LIFECYCLE
    useEffect(() => {
        if (socket == null) return

        socket.on('receive-message', addMessageToChat)

        return () => socket.off('receive-message')
    }, [socket, addMessageToChat])


    // FORMATTING
    const formattedChats = chats.map((chat,index) => {
        const recipients = chat.recipients.map(recipient => {
            const contact = contacts.find(contact => {
                return contact.id === recipient
            })
            const name = (contact && contact.name) || recipient
            return { id: recipient, name }
        })

        const messages = chat.messages.map(message => {
            const contact = contacts.find(contact => {
                return contact.id === message.sender
            })
            const name = (contact && contact.name) || message.sender
            const fromMe = id === message.sender
            return {...message, senderName: name, fromMe}
        })

        const selected = index === selectedChatIndex
        return {...chats, messages, recipients, selected}
    })


    // RETURNED OBJECTS
    const values = {
        chats: formattedChats,
        selectChatIndex: setSelectedChatIndex,
        selectedChat: formattedChats[selectedChatIndex],
        sendMessage,
        createChat,
    }


    // RENDER
    return (
        <ChatContext.Provider value={values}>
            {children}
        </ChatContext.Provider>
    );
};



// INDEPENDENT FUNCTIONS
const arrayEquality = (a, b) => {
    if (a.length !== b.length) return false

    a.sort()
    b.sort()

    return a.every((element, index) => {
        return element === b[index]
    })
}