import React from 'react';
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';
import Reusable from '../core/Reusable';

const Dashboard = () => {

    const { user: { _id, name, email, role } } = isAuthenticated()

    const userLinks = () => {
        return (
            <Card>
                <Card.Header>User Links</Card.Header>
                <ListGroup variant="flush">
                    <ListGroup.Item className="text-center">
                        <Link to="/cart">Il mio carrello</Link>
                    </ListGroup.Item>
                    <ListGroup.Item className="text-center">
                        <Link to="/profile/update">Aggiorna Profilo</Link>
                    </ListGroup.Item>
                </ListGroup>
            </Card>
        )
    }

    const userInfo = () => {
        return (
            <div>
                <Card border="danger" style={{ width: '18rem' }}>
                    <Card.Header className="text-center">Utente con _id: {_id}</Card.Header>
                    <Card.Body>
                        <ListGroup variant="flush">
                            <ListGroup.Item className="text-center"> <h6>{name}</h6></ListGroup.Item>
                            <ListGroup.Item className="text-center"><h6>{email}</h6></ListGroup.Item>
                            <ListGroup.Item className="text-center"> <h6>{role === 1 ? 'Amministratore' : 'Utente'}</h6></ListGroup.Item>
                        </ListGroup>
                    </Card.Body>
                </Card>
            </div>
        )
    }

    const purchaseHistory = () => {
        <div>
            <Card border="success" style={{ width: '18rem' }}>
                <Card.Header>Prodotti acquistati</Card.Header>
                <Card.Body>
                    <ListGroup variant="flush">
                        <ListGroup.Item className="text-center"> </ListGroup.Item>
                    </ListGroup>
                </Card.Body>
            </Card>
        </div>
    }

    return (
        <div>
            <Reusable title="User Dashboard" description="" _margin="15vh"></Reusable>
            <div className="container row offset-md-2">
                <div className="col-3">
                    {userLinks()}
                </div>
                <div className="col-9">
                    {userInfo()}
                    {purchaseHistory()}
                </div>
            </div>
        </div>

    )
}

export default Dashboard;