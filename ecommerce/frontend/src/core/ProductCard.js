import React, {useState} from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap';
import ShowImage from './ShowImage';
import './ProductCard.css';
import { addItem } from './cartHelpers';

const ProductCard = ({
    product,
    showViewProductButton = true,
    showAddToCartButton=true,
    showViewProductCard = true

}) => {

    const [redirect, setRedirect] = useState(false);

    const showViewButton = showViewProductButton => {
        return (
            showViewProductButton && (
                <Link to={`/product/${product._id}`}>
                    <Button variant="outline-primary mb-2">Dettagli prodotto</Button>
                </Link>
            )
        )
    }

    const addToCart = () => {
        addItem(product, setRedirect(true));
    };

    const shouldRedirect = redirect => {
        if (redirect) {
          return <Redirect to="/cart" />;
        }
      };

    const showAddToCart = showAddToCartButton => {
        return showAddToCartButton && (
            <Button onClick={addToCart} variant="outline-warning mb-2">
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

        <Card className="product-card-custom">
            <Card.Body>
                {shouldRedirect(redirect)}
                <ShowImage item={product} url="product"></ShowImage>
                <Card.Text>
                    <span className="fs-2">
                        {product.name}
                    </span>
                    {/* <p className="d-flex flex-column">
                        <span className="fs-5">Breve descrizione: </span>
                        {product.description.substring(0, 100)} 
                    </p> */}
                    <p>{product.description} </p>
                    <p>
                        <span className="fs-5">Prezzo: </span>
                        €{product.price}
                    </p>
                    <p>
                    <span className="fs-5">Categoria: </span>
                        {product.category && product.category.name}
                    </p>
                    <p>
                        <span className="fs-5">Disponibilità: </span>
                        {product.quantity} 
                    </p>
                </Card.Text>
                <div className="d-flex flex-column">
                    {showStock(product.quantity)}
                    {showViewButton(showViewProductButton)}
                    {showAddToCart(showAddToCartButton)}
                </div>
            </Card.Body>
        </Card>
    )
}

export default ProductCard;