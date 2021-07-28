import React, { useState, useEffect } from 'react';
//import { getProducts } from './apiCore';
import ProductCard from './ProductCard';
import { read, listRelated } from './apiCore';
import ShowImage from './ShowImage';
import { Button } from 'react-bootstrap';

const ProductDetail = props => {

    const [product, setProduct] = useState({});
    const [relatedProduct, setRelatedProduct] = useState([]);
    const [error, setError] = useState(false);

    const loadSingleProduct = productId => {
        read(productId).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setProduct(data);
                // fetch related products
                listRelated(data._id).then(data => {
                    if (data.error) {
                        setError(data.error);
                    } else {
                        setRelatedProduct(data);
                    }
                });
            }
        });
    };

    useEffect(() => {
        const productId = props.match.params.productId;
        loadSingleProduct(productId);
    }, [props]);//passando props dopo un click su un prodotto correlato verrà aggiornato l'url della pagina con un nuovo prodotto

    return (
        <div className="container">
            <h1 className="text-center my-4">{product._id}</h1>
            <div className="row">
                <div className="col-8">
                <ShowImage item={product} url="product"></ShowImage>
                </div>
                <div className="col-4 text-center">
                <span className="fs-2">
                        {product.name}
                    </span>
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
                    <Button>aggiungi al carrello</Button>
                </div>
            </div>
            <h4 className="text-center">Prodotti simili</h4>
            <div className="d-flex flex-wrap">
                {relatedProduct.map((p,i) => (
                    <div className="my-4">
                        <ProductCard key={i} product={p}></ProductCard>
                    </div>
                ))}
            </div>
            {/* <ProductCard product={product} showViewProductButton={false} showViewProductCard={true}></ProductCard> */}
        </div>
        
    )
}

export default ProductDetail;