import React, { useState, useEffect } from "react";
import { Form, Button, Col, Row, } from "react-bootstrap";
import { isAuthenticated } from "../auth";
import { createProduct, getCategories } from './apiAdmin'

const AddProduct = () => {
    //Hook che viene eseguito ogni volta che c'è un cambiamento nello stato
    const [values, setValues] = useState({
        name: '',
        description: '',
        price: '',
        categories: [],
        category: '',
        shipping: '',
        quantity: '',
        photo: '',
        loading: false,
        error: '',
        createdProduct: '',
        redirectToProfile: false,
        formData: ''
    });

    const { user, token } = isAuthenticated();
    const {
        name,
        description,
        price,
        categories,
        // category,
        // shipping,
        quantity,
        loading,
        error,
        createdProduct,
        // redirectToProfile,
        formData
    } = values;

    // load categories and set form data 
    const init = () => {
        getCategories().then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({
                    ...values,
                    categories: data,
                    formData: new FormData()
                });
            }
        });
    };

    useEffect(() => {
        init();
    }, []);

    const handleChange = name => event => {
        const value = name === 'photo' ? event.target.files[0] : event.target.value;
        formData.set(name, value);
        setValues({ ...values, [name]: value });
    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: '', loading: true });

        createProduct(user._id, token, formData).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({
                    ...values,
                    name: '',
                    description: '',
                    photo: '',
                    price: '',
                    quantity: '',
                    loading: false,
                    createdProduct: data.name
                });
            }
        });
    };

    const newPostForm = () => (
        <div className="container mt-4">
            <Form onSubmit={clickSubmit}>
                <h4 className="text-center">Aggiungi un prodotto</h4>

                <Form.Group as={Row} controlId="formFile" className="mb-3">
                    <Form.Label column sm={2}>Foto prodotto</Form.Label>
                    <Col>
                        <Form.Control onChange={handleChange('photo')} type="file" />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formHorizontalName">
                    <Form.Label column sm={2}>
                        Nome
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control onChange={handleChange('name')} type="text" placeholder="Maglia esempio" value={name} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label column sm={2}>Descrizione</Form.Label>
                    <Col sm={10}>
                        <Form.Control onChange={handleChange('description')} as="textarea" rows={3} value={description} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formHorizontalPrice">
                    <Form.Label column sm={2}>
                        Prezzo
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control onChange={handleChange('price')} type="number" placeholder="99.00" value={price} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formHorizontalCategory">
                    <Form.Label column sm={2}>
                        Categoria
                    </Form.Label>
                    <Col sm={10}>
                        <select onChange={handleChange('category')} className="form-control">
                            <option>Please select</option>
                            {categories &&
                                categories.map((c, i) => (
                                    <option key={i} value={c._id}>
                                        {c.name}
                                    </option>
                                ))}
                        </select>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formHorizontalShipping">
                    <Form.Label column sm={2}>
                        Shipping
                    </Form.Label>
                    <Col sm={10}>
                        <select onChange={handleChange('shipping')} className="form-control">
                            <option>Please select</option>
                            <option value="0">No</option>
                            <option value="1">Yes</option>
                        </select>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formHorizontalQuantity">
                    <Form.Label column sm={2}>
                        Quantità
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control onChange={handleChange('quantity')} type="number" placeholder="5" value={quantity} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="text-center mb-3">
                    <Col sm={{ span: 10, offset: 2 }}>
                        <Button type="submit">Aggiungi Prodotto</Button>
                    </Col>
                </Form.Group>
            </Form>
        </div>
    )

    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );

    const showSuccess = () => (
        <div className="alert alert-info" style={{ display: createdProduct ? '' : 'none' }}>
            <h2>{`${createdProduct}`} is created!</h2>
        </div>
    );

    const showLoading = () =>
        loading && (
            <div className="alert alert-success">
                <h2>Loading...</h2>
            </div>
        );

    return (
        <div className="row">
            <div className="col-md-8 offset-md-2">
                {showLoading()}
                {showSuccess()}
                {showError()}
                {newPostForm()}
            </div>
        </div>

    );
};

export default AddProduct;