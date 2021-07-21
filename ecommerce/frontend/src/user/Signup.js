import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import { signup } from '../auth';

const Signup = () => {

    //sato del componente, ogni volta che l'input cambia si deve catturare l'evento e aggiornare lo stato
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: '',
        success: false
    });

    const { name, email, password, success, error } = values;

    //funzione che ritorna un'altra funzione, dinamicamente aggiorna una chiave dello stato del componente(o il capo email, o pass o nome)
    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
    };

    const clickSubmit = (event) => {
        event.preventDefault();
        setValues({...values, error: false});
        signup({ name, email, password })
            .then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error, success: false })
                } else {
                    setValues({
                        ...values,
                        name: '',
                        email: '',
                        password: '',
                        error: '',
                        success: true
                    })
                }
            })
    }

    const showError = () => (
        <div className="d-flex justify-content-center">
            <div className="alert alert-danger mt-4" style={{ display: error ? '' : 'none' }}>
                {error}
            </div>
        </div>
    );

    const showSuccess = () => (
        <div className="d-flex justify-content-center">
            <div className="alert alert-info mt-4" style={{ display: success ? '' : 'none' }}>
                Un nuovo account è stato creato. Per favore, <Link to="/signin">accedi</Link>
            </div>
        </div>
    );

    const signUpForm = () => (
        <form className="col-md-4 offset-md-4 mt-5">
            <div className="form-group my-3">
                <label className="text-muted">Nome</label>
                <input onChange={handleChange('name')} type="text" className="form-control" value={name}/>
            </div>

            <div className="form-group my-3">
                <label className="text-muted">Email</label>
                <input onChange={handleChange('email')} type="email" className="form-control" value={email}/>
            </div>

            <div className="form-group my-3">
                <label className="text-muted">Password</label>
                <input onChange={handleChange('password')} type="password" className="form-control" value={password}/>
            </div>
            <div className="d-flex justify-content-center">
                <button onClick={clickSubmit} className="btn btn-danger mt-2">
                    Inserisci
                </button>
            </div>
        </form>
    );

    return (
        <Container >
            {showSuccess()}
            {showError()}
            {signUpForm()}
        </Container>
    )
}

export default Signup;