import React from 'react';
import { Container } from 'react-bootstrap';
import { useChats } from '../context/ChatProvider';

// COMPONENTS
import Sidebar from '../components/Sidebar';
import OpenChat from '../components/OpenChat';

const Dashboard = ({ id, logout }) => {
    const { selectedChat } = useChats()

    return (
        <div className="dashboard">
            <Container className="dashboard-container shadow">
                <Sidebar id={id} logout={logout} />
                {selectedChat && <OpenChat />}
            </Container>
        </div>
    );
};

export default Dashboard;