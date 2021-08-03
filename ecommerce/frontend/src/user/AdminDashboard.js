import React from 'react';
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom'
import Reusable from '../core/Reusable';

const AdminDashboard = () => {

    const { user: { _id, name, email, role } } = isAuthenticated()

    const adminLinks = () => {
        return (
            <div className="container">
                <Card>
                    <Card.Header>User Links</Card.Header>
                    <ListGroup variant="flush">
                        <ListGroup.Item className="text-center">
                            <Link to="/create/category">Crea categoria</Link>
                        </ListGroup.Item>
                        <ListGroup.Item className="text-center">
                            <Link to="/create/product">Crea prodotto</Link>
                        </ListGroup.Item>
                        <ListGroup.Item className="text-center">
                            <Link to="/admin/orders">Vedi ordini</Link>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </div>
        )
    }

    const adminInfo = () => {
        return (
            <div>
                <Card border="danger" style={{ width: '25%' }}>
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


    return (
        <div>
            <Reusable title="Admin Dashboard" description="" _margin="15vh"></Reusable>
            <div className="container row offset-md-2">
                <div className="col-3">
                    {adminLinks()}
                </div>
                <div className="col-9">
                    {adminInfo()}
                </div>
            </div>
        </div>

    )
}

export default AdminDashboard;