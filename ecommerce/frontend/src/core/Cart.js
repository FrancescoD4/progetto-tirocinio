import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCart } from './cartHelpers';
import ProductCard from './ProductCard';
import Checkout from './Checkout';

const Cart = () => {
    const [items, setItems] = useState([]);
    const [run, setRun] = useState(false);

    useEffect(() => {
        setItems(getCart());
    }, [run]);

    const showItems = items => {
        return (
            <div>
                <h2>Your cart has {`${items.length}`} items</h2>
                <hr />
                {items.map((product, i) => (
                    <ProductCard
                        key={i}
                        product={product}
                        showAddToCartButton={false}
                        cartUpdate={true}
                        showRemoveProductButton={true}
                        setRun={setRun}
                        run={run}
                    />
                ))}
            </div>
        );
    };

    const noItemsMessage = () => (
        <h2>
            Your cart is empty. <br /> <Link to="/shop">Continue shopping</Link>
        </h2>
    );

    return (
    <div className="container">
        <div className="row">
            <div className="col-6">{items.length > 0 ? showItems(items) : noItemsMessage()}</div>

            <div className="col-6">
                <h2 className="mb-4">Your cart summary</h2>
                <hr />
                <Checkout products={items} setRun={setRun} run={run} />
            </div>
        </div>
    </div>



    );
};

export default Cart;
