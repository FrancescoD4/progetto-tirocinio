import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap';
import ShowImage from './ShowImage';
import './ProductCard.css';

const ProductCard = ({ 
    product, 
    showViewProductButton = true, 
    showViewProductCard = true 

}) => {

    const showViewButton = (showViewProductButton) => {
        return (
            showViewProductButton && (
                <Link to={`/product/${product._id}`}>
                    <Button className="mt-2 mb-2">Dettagli prodotto</Button>
                </Link>
            )
        )
    }

    // const addToCart = () => {
    //     // console.log('added');
    //     addItem(product, setRedirect(true));
    //   };

    const showAddToCartBtn = showAddToCartButton => {
        return (
            <Button variant="outline-warning mt-2 mb-2">
                Aggiungi al carrello
            </Button>
          );
      };

      const showStock = quantity => {
        return quantity > 0 ? (
          <span className="badge badge-primary badge-pill">In Stock </span>
        ) : (
          <span className="badge badge-primary badge-pill">Out of Stock </span>
        );
      };


    return (
        <Card className="custom">
            <Card.Header>{product.name}</Card.Header>
            <Card.Body>
                <Card.Img variant="top" src={product.src} />
                <ShowImage item={product} url="product"></ShowImage>
                <Card.Text>
                    <p>{product.description.substring(0,100)} </p>
                    <p>€ {product.price}  </p>
                    <p>Categoria: {product.category && product.category.name}  </p>
                    <p>{product.quantity} </p>
                </Card.Text>
                <div className="d-flex flex-column">
                    {showStock(product.quantity)}
                    {showViewButton(showViewProductButton)}
                    {showAddToCartBtn()}
                    <Button variant="outline-success">Aggiungi al carrello</Button>
                </div>
            </Card.Body>
        </Card>
    )
}

export default ProductCard;