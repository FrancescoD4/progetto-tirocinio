import React from 'react';
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom'

const AdminDashboard = () => {

    const { user: { _id, name, email, role } } = isAuthenticated()

    const adminLinks = () => {
        return (
            <Card>
                <Card.Header>User Links</Card.Header>
                <ListGroup variant="flush">
                    <ListGroup.Item className="text-center">
                        <Link to="/create/category">Crea categoria</Link>
                    </ListGroup.Item>
                    <ListGroup.Item className="text-center">
                        <Link to="/create/product">Crea prodotto</Link>
                    </ListGroup.Item>
                </ListGroup>
            </Card>
        )
    }

    const adminInfo = () => {
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


    return (
        <div className="container row mt-4">
            <div className="col-3">
                {adminLinks()}
            </div>
            <div className="col-9">
                {adminInfo()}
            </div>
        </div>
    )
}

export default AdminDashboard;