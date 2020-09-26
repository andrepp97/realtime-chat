import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { useChats } from '../context/ChatProvider';

const ChatsComponent = () => {
    // CONTEXT
    const { chats, selectChatIndex } = useChats()

    // RENDER
    return (
        <ListGroup variant="flush">
            {
                chats.length
                ? chats.map((chat,idx) => (
                    <ListGroup.Item
                        action
                        id="chat"
                        key={idx}
                        active={chat.selected}
                        onClick={() => selectChatIndex(idx)}
                    >
                        {chat.recipients.map(r => r.name).join(', ')}
                    </ListGroup.Item>
                ))
                : <p className="text-center text-muted py-3">No Conversations</p>
            }
        </ListGroup>
    );
};

export default ChatsComponent;