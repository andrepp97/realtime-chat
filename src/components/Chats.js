import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { useChats } from '../context/ChatProvider';
import Avatar from '../assets/images/user.svg';

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
                        className="d-flex align-items-center"
                    >
                        <img
                            alt=""
                            height={25}
                            src={Avatar}
                            className="mr-2"
                        />
                        {chat.recipients.map(r => r.name).join(', ')}
                    </ListGroup.Item>
                ))
                : <p className="text-center text-muted py-3">No Conversations</p>
            }
        </ListGroup>
    );
};

export default ChatsComponent;