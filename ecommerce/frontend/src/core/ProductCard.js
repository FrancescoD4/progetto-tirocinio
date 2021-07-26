import React from 'react';

import { Button, Card } from 'react-bootstrap';
import ShowImage from './ShowImage';
import './ProductCard.css';

const ProductCard = ({ product }) => {
    return (
        <Card className="custom">
            <Card.Header>{product.name}</Card.Header>
            <Card.Body>
                <Card.Img variant="top" src={product.src} />
                <ShowImage item={product} url="product"></ShowImage>
                <Card.Text>
                    <section>
                        <h6>descrizione</h6>
                        <p>{product.description.substring(0,100)} </p>
                    </section>

                    <section>
                        <h6>prezzo</h6>
                        <p>€ {product.price}  </p>
                    </section>
                    <section>
                        <h6>disponibilità:</h6>
                        <p>{product.quantity} </p>
                    </section>
                </Card.Text>
                <div className="d-flex flex-column">
                    <Button variant="outline-primary mb-2">Dettagli </Button>
                    <Button variant="outline-success">Aggiungi al carrello</Button>
                </div>
            </Card.Body>
        </Card>
    )
}

export default ProductCard;