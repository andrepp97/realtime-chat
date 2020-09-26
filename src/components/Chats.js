import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { useChats } from '../context/ChatProvider';

const ChatsComponent = () => {
    // CONTEXT
    const { chats, selectChatIndex } = useChats()

    // RENDER
    return (
        <ListGroup variant="flush">
            {chats.map((chat,idx) => (
                <ListGroup.Item
                    action
                    key={idx}
                    active={chat.selected}
                    onClick={() => selectChatIndex(idx)}
                >
                    {chat.recipients.map(r => r.name).join(', ')}
                </ListGroup.Item>
            ))}
        </ListGroup>
    );
};

export default ChatsComponent;