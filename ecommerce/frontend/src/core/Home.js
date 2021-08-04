import React, { useState, useEffect } from 'react';
import { getProducts } from './apiCore';
import ProductCard from './ProductCard';
import Reusable from './Reusable';
import { Carousel } from 'react-bootstrap';

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
            <Reusable title="Benvenuto" description="Puoi trovarci a Melito di Porto Salvo (RC) in via Nazionale 81 " _margin='15vh' />
            <Carousel>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://cdn.pixabay.com/photo/2018/08/07/19/39/childrens-photo-shoot-3590536_960_720.jpg"
                        alt="First slide"
                    />
                    <Carousel.Caption>
                        <h3>First slide label</h3>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://cdn.pixabay.com/photo/2021/05/24/12/46/kids-6279080_960_720.jpg"
                        alt="Second slide"
                    />

                    <Carousel.Caption>
                        <h3>Second slide label</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://cdn.pixabay.com/photo/2017/08/07/04/47/people-2599980_960_720.jpg"
                        alt="Third slide"
                    />

                    <Carousel.Caption>
                        <h3>Third slide label</h3>
                        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
            
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