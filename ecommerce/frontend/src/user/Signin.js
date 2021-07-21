import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { Redirect} from 'react-router-dom';
import { signin, authenticate, isAuthenticated } from '../auth';

const Signin = () => {

    //sato del componente, ogni volta che l'input cambia si deve catturare l'evento e aggiornare lo stato
    const [values, setValues] = useState({
        email: 'seby@gmail.com',
        password: 'sssss5',
        error: '',
        loading: false,
        redirectToReferrer: false//dopo una signin con successo viene posto a true
    });

    
    const { email, password, loading, error, redirectToReferrer } = values;
    const {user} = isAuthenticated();


    //funzione che ritorna un'altra funzione, dinamicamente aggiorna una chiave dello stato del componente(o il capo email, o pass o nome)
    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
    };

    const clickSubmit = (event) => {
        event.preventDefault();
        setValues({ ...values, error: false, loading: true });//quando si clicca sul pulsante voglio far apparire il caricamento
        signin({ email, password })
            .then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error, loading: false })
                } else {
                    authenticate(data, () => {
                        setValues({
                            ...values,
                            redirectToReferrer: true
                        });
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

    const showLoading = () => (
        loading && (
            <div className="d-flex justify-content-center">
                <div className="alert alert-info mt-4">
                    <h2>Loading...</h2>
                </div>
            </div>
        )
    );

    const redirectUser = () => {
        if (redirectToReferrer) {
            if(user && user.role ===1){
                return <Redirect to="/admin/dashboard" />
            } else {
                return <Redirect to="user/dashboard"/>
            }
        }
        if (isAuthenticated()) {
            return <Redirect to="/"></Redirect>
        }
    }

    const signUpForm = () => (
        <form className="col-md-4 offset-md-4 mt-5">

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
            {showLoading()}
            {showError()}
            {signUpForm()}
            {redirectUser()}
        </Container>
    )
}

export default Signin;