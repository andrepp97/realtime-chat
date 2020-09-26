import React from 'react';
import Sidebar from '../components/Sidebar';
import { Container } from 'react-bootstrap';

const Dashboard = ({ id }) => {
    return (
        <Container className="dashboard-page">
            <Sidebar id={id} />
        </Container>
    );
};

export default Dashboard;