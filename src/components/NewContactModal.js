import React, { useState } from 'react';
import { Modal, Form } from 'react-bootstrap';
import { useContacts } from '../context/ContactProvider';

const NewContactModal = ({ onClose }) => {
    // STATE
    const [state, setState] = useState({
        id: '',
        name: '',
    })

    // CONTEXT
    const { createContact } = useContacts()

    // ON SUBMIT
    const handleSubmit = (e) => {
        e.preventDefault()
        createContact(state)
        onClose()
    }
    
    // RENDER
    return (
        <>
            <Modal.Header closeButton>
                Add New Contact
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>ID</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            value={state.id}
                            onChange={e => setState({...state, id: e.target.value})}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            value={state.name}
                            onChange={e => setState({...state, name: e.target.value})}
                        />
                    </Form.Group>
                    <div className="text-right">
                        <button className="btn btn-dark rounded-0 px-4">
                            Save
                        </button>
                    </div>
                </Form>
            </Modal.Body>
        </>
    );
};

export default NewContactModal;