import React, { useState, useCallback } from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import { useChats } from '../context/ChatProvider';

const OpenChat = () => {
    // STATE
    const [text, setText] = useState('')

    // REFS
    const setRef = useCallback(node => {
        if (node) node.scrollIntoView({ smooth: true })
    }, [])

    // CONTEXT
    const { sendMessage, selectedChat } = useChats()

    // HANDLE SUBMIT
    const handleSubmit = () => {
        if (text) {
            sendMessage(selectedChat.recipients.map(r => r.id), text)
            setText('')
        }
    }

    // RENDER
    return (
        <div className="d-flex flex-column flex-grow-1 border bg-white">
            <div className="flex-grow-1 overflow-auto">
                <div className="d-flex flex-column justify-content-end px-3 py-2">
                    {selectedChat.messages.map((message,idx) => {
                        const lastMessage = selectedChat.messages.length-1 === idx
                        return (
                            <div
                                key={idx}
                                ref={lastMessage ? setRef : null}
                                className={`d-flex flex-column my-1 ${message.fromMe ? 'align-self-end align-items-end' : 'align-items-start'}`}
                            >
                                <div className={`rounded-pill px-3 py-1 ${message.fromMe ? 'bg-success text-white' : 'bg-light'}`}>
                                    {message.text}
                                </div>
                                <div className={`text-muted small ${message.fromMe ? 'text-right' : ''}`}>
                                    {message.fromMe ? 'You' : message.senderName}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
            <Form.Group className="m-2">
                <InputGroup>
                    <Form.Control
                        required
                        value={text}
                        as="textarea"
                        className="chat-textarea"
                        placeholder="Type something"
                        onChange={e => setText(e.target.value)}
                        />
                    <InputGroup.Append>
                        <button className="btn btn-dark" onClick={handleSubmit}>
                            Send
                        </button>
                    </InputGroup.Append>
                </InputGroup>
            </Form.Group>
        </div>
    );
};

export default OpenChat;