import React, { useState } from 'react';
import { Modal, Form } from 'react-bootstrap';
import { useChats } from '../context/ChatProvider';
import { useContacts } from '../context/ContactProvider';

const NewChatModal = ({ onClose }) => {
    // STATE
    const [selectedContact, setSelectedContact] = useState([])

    // CONTEXT
    const { createChat } = useChats()
    const { contacts } = useContacts()

    // HANDLE CHECKBOX
    const handleContactCheckbox = (contactId) => {
        setSelectedContact(prevState => {
            if (prevState.includes(contactId)) {
                return prevState.filter(prevId => contactId !== prevId)
            } else {
                return [...prevState, contactId]
            }
        })
    }

    // ON SUBMIT
    const handleSubmit = (e) => {
        e.preventDefault()
        if (selectedContact.length) {
            createChat(selectedContact)
            onClose()
        } else {
            alert("Choose at least 1 contact to start a conversation with")
        }
    }
    
    // RENDER
    return (
        <>
            <Modal.Header closeButton>
                Start A Conversation
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    {contacts.map(contact => (
                        <Form.Group controlId={contact.id} key={contact.id}>
                            <Form.Check
                                type="checkbox"
                                label={contact.name}
                                value={selectedContact.includes(contact.id)}
                                onChange={() => handleContactCheckbox(contact.id)}
                            />
                        </Form.Group>
                    ))}
                    <div className="text-right">
                        <button
                            type="submit"
                            className="btn btn-dark rounded-0 px-4"
                        >
                            Start
                        </button>
                    </div>
                </Form>
            </Modal.Body>
        </>
    );
};

export default NewChatModal;