import React, { useState } from 'react';
import { Container } from 'react-bootstrap';

const Signup = () => {

    //sato del componente, ogni volta che l'input cambia si deve catturare l'evento e aggiornare lo stato
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: '',
        success: false
    });

    const { name, email, password } = values;

    //funzione che ritorna un'altra funzione, dinamicamente aggiorna una chiave dello stato del componente(o il capo email, o pass o nome)
    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
    };

    const signup = user => {
        fetch('http://localhost:8000/api/signup', {
            method: "POST",
            headers: {
                Accept: 'application/json',
                "Content_Type": "application/json"
            },
            body: JSON.stringify(user)
        })
            .then(response => {
                return response.json();
            })
            .catch(err => {
                console.log(err);
            })
    }

    const clickSubmit = (event) => {
        event.preventDefault();
        signup({ name, email, password });
    }

    const signUpForm = () => (
        <form className="col-md-4 offset-md-4 mt-5">
            <div className="form-group my-3">
                <label className="text-muted">Nome</label>
                <input onChange={handleChange('name')} type="text" className="form-control" />
            </div>

            <div className="form-group my-3">
                <label className="text-muted">Email</label>
                <input onChange={handleChange('email')} type="email" className="form-control" />
            </div>

            <div className="form-group my-3">
                <label className="text-muted">Password</label>
                <input onChange={handleChange('password')} type="password" className="form-control" />
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
            {signUpForm()}
            {JSON.stringify(values)}
        </Container>
    )
}

export default Signup;