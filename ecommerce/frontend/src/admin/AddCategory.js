import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth";
import {createCategory, getCategories, deleteCategory} from './apiAdmin'

const AddCategory = () => {
    const [name, setName] = useState('')
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)
    const [categories, setCategories] = useState([]);

    const {user, token }= isAuthenticated();

    const handleChange = e => {
        setError("");
        setName(e.target.value);
    };

    const clickSubmit = e => {
        e.preventDefault();
        setError("");
        setSuccess(false);
        createCategory(user._id, token, { name }).then(data => {
            if (data.error) {
                setError(true);
            } else {
                setError("");
                setSuccess(true);
            }
        });
    };

    const newCategoryFom = () => (
        <Form className="mt-2" onSubmit={clickSubmit}>
            <Form.Group>
                <Form.Label>Nome</Form.Label>
                <Form.Control 
                    type="text"
                    className="form-control"
                    onChange={handleChange}
                    value={name}
                    autoFocus
                    required>
                </Form.Control>
            </Form.Group>
            <div className="d-flex justify-content-center">
            <Button type="submit" className="mt-2" variant="outline-danger">
                Crea Categoria
            </Button>
            </div>
        </Form>
    );

    const loadCategories = () => {
        getCategories().then(data => {
            console.log(data);
            if (data.error) {
                setError(data.error);
            } else {
                setCategories(data);
            }
        });
    }

    const handleClick = (categoryId, userId, token,) => {
        deleteCategory(categoryId,userId,token);
        setCategories(categories);
    }


    useEffect(() => {
        loadCategories();
    }, [])

    const showCategories = () => {
        return (
        <div className="row">
            {categories.map( (c,i) => {
                return (
                    <ul className="list-group mb-2">
                        <li className="list-group-item d-flex justify-content-between my-3" key={i}>
                            {c.name}
                            <Button variant="danger" onClick={() => handleClick(c._id,user._id,token)}>Elimina</Button>
                        </li>
                    </ul>
                )
            })}
        </div>
        )
    }

    const showSuccess = () => {
        if (success) {
            return <h3 className="text-success">La categoria {name} è stata creata</h3>;
        }
    };

    const showError = () => {
        if (error) {
            return <h3 className="text-danger">Una categoria dovrebbe essere unica</h3>;
        }
    };

    const goBack = () => (
        <div className="d-flex justify-content-end mt-5 ">
            <Link to="/admin/dashboard" className="text-danger text-decoration-none">
                Torna alla Dashboard
            </Link>
        </div>
    );

    return (
        <div className="row">
            <div className="col-md-8 offset-md-2">
                {showSuccess()}
                {showError()}
                {newCategoryFom()}
                {showCategories()}
                {goBack()}
            </div>
        </div>
    );
}

export default AddCategory;