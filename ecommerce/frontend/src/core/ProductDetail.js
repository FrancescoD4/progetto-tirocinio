import React, { useState, useEffect } from 'react';
import { getProducts } from './apiCore';
import ProductCard from './ProductCard';
import Reusable from './Reusable';
import { read } from './apiCore';

const ProductDetail = (props) => {

    const [product, setProduct] = useState({});
    const [error, setError] = useState(false);

    const loadSingleProduct = productId => {
        read(productId).then(data=> {
            if(data.error) {
                setError(data.error)
            }else{
                setProduct(data);
            }
        })
    }

    useEffect(() => {
        const productId = props.match.params.productId;
        loadSingleProduct(productId);
    })

    return (
        <div>
            <Reusable 
                title={product.name} 
                description={product && 
                            product.description && 
                            product.description.substring(0,100)}>
            </Reusable>
            
            <div className="row">
                <div className="col-8">
                    {product && product.description && <ProductCard product={product} showViewProductButton={false} />}
                </div>

                <div className="col-4">
                    <h4>Related products</h4>
                    {/* {relatedProduct.map((p, i) => (
                        <div className="mb-3" key={i}>
                            <Card product={p} />
                        </div>
                    ))} */}
                </div>
            </div>
        </div>
        
    )
}

export default ProductDetail;