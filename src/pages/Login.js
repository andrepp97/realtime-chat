import React, { useState } from 'react';
import { v4 as uuidV4 } from 'uuid';
import { Container, Form, Card } from 'react-bootstrap';

const Login = ({ userLogin }) => {
    // REFS
    const [input, setInput] = useState("")

    // CREATE ID
    const createNewId = () => {
        userLogin(uuidV4())
    }

    // HANDLE LOGIN
    const handleLogin = () => {
        if (input) {
            userLogin(input)
        } else {
            alert("Please fill your ID")
        }
    }

    // RENDER
    return (
        <Container className="login-page">
            <Card className="shadow">
                <Card.Body>
                        <Form.Group>
                            <Form.Label>Enter Your ID</Form.Label>
                            <Form.Control
                                type="text"
                                value={input}
                                onChange={e => setInput(e.target.value)}
                            />
                        </Form.Group>
                        <button
                            type="submit"
                            onClick={handleLogin}
                            className="btn btn-dark"
                        >
                            Login
                        </button>
                        <small className="mx-3">or</small>
                        <button
                            className="btn btn-light"
                            onClick={createNewId}
                        >
                            Create New ID
                        </button>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default Login;