import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth';

const Checkout = ({ products}) => {

    const getTotal = () => {
        return products.reduce((currentValue, nextValue) => {
            return currentValue + nextValue.count * nextValue.price;
        }, 0);
    };

    const showCheckout = () => {
        return isAuthenticated() ? (
            <Button>Checkout</Button>
        ) : (
            <Link to="/signin">
                <Button>Sign in to checkout</Button>
            </Link>
        );
    };
   
    return (
        <div>
            <h2>Total: ${getTotal()}</h2>
            {showCheckout()}
        </div>
    );
};

export default Checkout;
