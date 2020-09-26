import React from 'react';
import { Container } from 'react-bootstrap';
import { useChats } from '../context/ChatProvider';

// COMPONENTS
import Sidebar from '../components/Sidebar';
import OpenChat from '../components/OpenChat';

const Dashboard = ({ id }) => {
    const { selectedChat } = useChats()

    return (
        <Container className="dashboard-page">
            <Sidebar id={id} />
            {selectedChat && <OpenChat />}
        </Container>
    );
};

export default Dashboard;