import React, { useState, useEffect } from 'react';
import { getProducts } from './apiCore';
import ProductCard from './ProductCard';
import Reusable from './Reusable';

const Home = () => {

    const [productsBySell, setProductsBySell] = useState([]);
    const [productsByArrival, setProductsByArrival] = useState([]);
    const [error, setError] = useState(false);

    const loadProductsBySell = () => {
        getProducts('sold').then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setProductsBySell(data);
            }
        });
    };

    const loadProductsByArrival = () => {
        getProducts('createdAt').then(data => {
            console.log(data);
            if (data.error) {
                setError(data.error);
            } else {
                setProductsByArrival(data);
            }
        });
    };

    useEffect(() => {
        loadProductsByArrival();
        loadProductsBySell();
    }, []);

    return (
        <div className="container">
            <Reusable title="Benvenuto" description="Puoi trovarci a Melito di Porto Salvo (RC) in via Nazionale 81 " _margin='15vh'/>
            <div className="row justify-content-center">
                <h2 className="text-center my-4">Più venduti</h2>
                {productsBySell.map((product, i) => (
                    //il prodotto viene passato come props
                    <ProductCard key={i} product={product}></ProductCard>
                ))}
            </div>
            <div className="row">
                <h2 className="text-center my-4">Nuovi arrivi</h2>
                {productsByArrival.map((product, i) => (
                    //il prodotto viene passato come props
                    <ProductCard key={i} product={product}></ProductCard>
                ))}
            </div>
        </div>
    )
}

export default Home;