import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { useContacts } from '../context/ContactProvider';

const Contacts = () => {
    const { contacts } = useContacts()

    return (
        <ListGroup variant="flush">
            {
                contacts.length
                ? contacts.map(contact => (
                    <ListGroup.Item key={contact.id}>
                        {contact.name}
                    </ListGroup.Item>
                ))
                : <p className="text-center text-muted py-3">No Contacts</p>
            }
        </ListGroup>
    );
};

export default Contacts;