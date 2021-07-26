import React, { useEffect, useState } from 'react';
import Reusable from './Reusable';
import ProductCard from './ProductCard'
import { getCategories, getFilteredProducts } from './apiCore';
import Checkbox from './Checkbox';
import Radiobox from './RadioBox';
import { prices } from './FixedPrices';
import { Button } from 'react-bootstrap';

const Shop = () => {
    const [myFilters, setMyFilters] = useState({
        filters: { category: [], price: [] }
    });
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(false);
    const [limit, setLimit] = useState(6);
    const [skip, setSkip] = useState(0);
    const [size, setSize] = useState(0);
    const [filteredResults, setFilteredResults] = useState([]);

    const init = () => {
        getCategories().then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setCategories(data)
            }
        });
    };

    const loadFilteredResults = newFilters => {
        //console.log(newFilters)
        getFilteredProducts(skip, limit, newFilters).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setFilteredResults(data.data);
                setSize(data.size);
                setSkip(0);
            }
        });
    };

    const loadMore = () => {
        let toSkip = skip + limit;
        getFilteredProducts(toSkip, limit, myFilters.filters).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setFilteredResults([...filteredResults, ...data.data]);
                setSize(data.size);
                setSkip(toSkip);
            }
        });
    };

    const loadMoreButton = () => {
        return (
            size>0 && size>=limit && (
                <Button onClick={loadMore}>Carica altri prodotti</Button>
            )
        )
    }

    useEffect(() => {
        init();
        //per popolare lo shop appena si entra per la prima volta
        loadFilteredResults(skip, limit, myFilters.filters);
    }, [])

    const handleFilters = (filters, filterBy) => {
        //console.log("SHOP", filters, filterBy);
        const newFilters = { ...myFilters };
        newFilters.filters[filterBy] = filters;

        if (filterBy === "price") {
            let priceValues = handlePrice(filters);
            newFilters.filters[filterBy] = priceValues;
        }
        loadFilteredResults(myFilters.filters);
        setMyFilters(newFilters);
    };

    const handlePrice = value => {
        const data = prices;
        let array = [];

        for (let key in data) {
            if (data[key]._id === parseInt(value)) {
                array = data[key].array;
            }
        }
        return array;
    };

    return (
        <div className="container">
            <Reusable title="Visita il nostro Shop" description="dai un'occhiata ai nostri capi di abbigliamento" _margin='20vh' />
            <div className="row">
                <h1>Shop</h1>
                <div className="col-4">
                    <h4>Filtra per categoria:</h4>
                    <ul>
                        <Checkbox categories={categories}
                            handleFilters={filters => handleFilters(filters, 'category')}>
                        </Checkbox>
                    </ul>
                    <h4>Filtra per prezzo:</h4>
                    <ul>
                        <Radiobox prices={prices}
                            handleFilters={filters => handleFilters(filters, 'price')}>
                        </Radiobox>
                    </ul>
                </div>
                <div className="col-8">
                    <h2 className="mb-4">Prodotti</h2>
                    <div className="row">
                        {filteredResults.map((product, i) => (
                            <ProductCard key={i} product={product}></ProductCard>
                        ))}
                    </div>
                    {loadMoreButton()}
                </div>
            </div>
        </div>
    )
}

export default Shop;