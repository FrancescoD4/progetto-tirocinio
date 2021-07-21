import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Home from './core/Home'
import Signup from './user/Signup'
import Signin from './user/Signin'
import Menu from './core/Menu'

const Routes = () => {
    return (
        <BrowserRouter>
        <Menu></Menu>
            <Switch>
                <Route path='/' exact component={Home}></Route>
                <Route path='/signin' exact component={Signin}></Route>
                <Route path='/signup' exact component={Signup}></Route>
            </Switch>
        </BrowserRouter>
    );
};

export default Routes;
