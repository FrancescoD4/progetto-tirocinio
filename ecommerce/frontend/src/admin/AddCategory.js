import React, { useState } from "react";
// import { Route, Redirect } from "react-router-dom";
// // import { isAuthenticated } from "./index";
// import Link from 'react-router-dom';
import { Form, Button } from "react-bootstrap";

const AddCategory = () => {
    const [name, setName] = useState('')
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)

    const handleChange = e => {
        setError("");
        setName(e.target.value);
    };

    const clickSubmit = e => {
        e.preventDefault();
        setError("");
        setSuccess(false);
        // make request to api to create category
        // createCategory(user._id, token, { name }).then(data => {
        //     if (data.error) {
        //         setError(data.error);
        //     } else {
        //         setError("");
        //         setSuccess(true);
        //     }
        // });
    };

    const newCategoryFom = () => (
        // <form onSubmit={clickSubmit}>
        //     <div className="form-group">
        //         <label className="text-muted">Name</label>
        //         <input
        //             type="text"
        //             className="form-control"
        //             onChange={handleChange}
        //             value={name}
        //             autoFocus
        //             required
        //         />
        //     </div>
        //     <button className="btn btn-outline-primary">Create Category</button>
        // </form>

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
            <Button type="submit" className="mt-2" variant="outline-danger">
                Crea Categoria
            </Button>
        </Form>
    );

    // const showSuccess = () => {
    //     if (success) {
    //         return <h3 className="text-success">{name} is created</h3>;
    //     }
    // };

    // const showError = () => {
    //     if (error) {
    //         return <h3 className="text-danger">Category should be unique</h3>;
    //     }
    // };

    // const goBack = () => (
    //     <div className="mt-5">
    //         <Link to="/admin/dashboard" className="text-warning">
    //             Back to Dashboard
    //         </Link>
    //     </div>
    // );

    return (
        <div className="row">
            <div className="col-md-8 offset-md-2">{newCategoryFom()}</div>
        </div>
    );
}

export default AddCategory;