import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap';
import ShowImage from './ShowImage';
import './ProductCard.css';
import { addItem, updateItem, removeItem } from './cartHelpers';

const ProductCard = ({
  product,
  showViewProductButton = true,
  showAddToCartButton = true,
  showViewProductCard = true,
  showRemoveProductButton = false,
  cartUpdate = false,
  setRun = f => f,
  run = undefined

}) => {

  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);

  const showViewButton = showViewProductButton => {
    return (
      showViewProductButton && (
        <Link to={`/product/${product._id}`}>
          <Button className="mb-2">Dettagli</Button>
        </Link>
      )
    )
  }
  const handleChange = productId => event => {
    setRun(!run); // run useEffect in parent Cart
    setCount(event.target.value < 1 ? 1 : event.target.value);
    if (event.target.value >= 1) {
      updateItem(productId, event.target.value);
    }
  };

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
      <Button onClick={addToCart} className="mb-2"variant="success">
        Metti nel carrello
      </Button>
    );
  };

  const showCartUpdateOptions = cartUpdate => {
    return (
      cartUpdate && (
        <div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Adjust Quantity</span>
            </div>
            <input type="number" className="form-control" value={count} onChange={handleChange(product._id)} />
          </div>
        </div>
      )
    );
  };

  const showRemoveButton = showRemoveProductButton => {
    return (
      showRemoveProductButton && (
        <button
          onClick={() => {
            removeItem(product._id);
            setRun(!run); // run useEffect in parent Cart
          }}
          className="btn btn-outline-danger mt-2 mb-2"
        >
          Remove Product
        </button>
      )
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
          <p>{product.description.substring(0, 100)} </p>
          <div className="d-flex justify-content-between">
            <div>
              <span>Prezzo: </span>
              €{product.price}
            </div>
            <div>
              <span>Disponibilità: </span>
              {product.quantity}
            </div>
          </div>
        </Card.Text>
        <div className="d-flex flex-column">
          <div className="d-flex justify-content-between">
            {showViewButton(showViewProductButton)}
            {showAddToCart(showAddToCartButton)}
          </div>
          {showRemoveButton(showRemoveProductButton)}
          {showCartUpdateOptions(cartUpdate)}
        </div>
      </Card.Body>
    </Card>
  )
}

export default ProductCard;