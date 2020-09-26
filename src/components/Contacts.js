import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { useContacts } from '../context/ContactProvider';
import Avatar from '../assets/images/user.svg';

const Contacts = () => {
    const { contacts } = useContacts()

    return (
        <ListGroup variant="flush">
            {
                contacts.length
                ? contacts.map(contact => (
                    <ListGroup.Item key={contact.id} className="d-flex align-items-center">
                        <img
                            alt=""
                            height={25}
                            src={Avatar}
                            className="mr-2"
                        />
                        {contact.name}
                    </ListGroup.Item>
                ))
                : <p className="text-center text-muted py-3">No Contacts</p>
            }
        </ListGroup>
    );
};

export default Contacts;