import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Home from './core/Home'
import Signup from './user/Signup'
import Signin from './user/Signin'
import Menu from './core/Menu'
import PrivateRoute from './auth/PrivateRoute';
import Dashboard from './user/UserDashboard';
import AdminRoute from './auth/AdminRoute';
import AdminDashboard from './user/AdminDashboard';
import AddCategory from './admin/AddCategory';
import AddProduct from './admin/AddProduct';
import Shop from './core/Shop';
import ProductDetail from './core/ProductDetail';
import Cart from './core/Cart';
import Orders from './admin/Orders';

const Routes = () => {
    return (
        <BrowserRouter>
        <Menu></Menu>
        <div className="container-fluid">
        <Switch>
                <Route path='/' exact component={Home}></Route>
                <Route path='/signin' exact component={Signin}></Route>
                <Route path='/signup' exact component={Signup}></Route>
                <PrivateRoute path='/user/dashboard' exact component={Dashboard}></PrivateRoute>{/*un pro di questo approccio è che può essere riutilizzato per altri componenti*/}
                <AdminRoute path='/admin/dashboard' exact component={AdminDashboard}></AdminRoute>
                <AdminRoute path='/create/category' exact component={AddCategory}></AdminRoute>
                <AdminRoute path='/create/product' exact component={AddProduct}></AdminRoute>
                <Route path='/shop' exact component={Shop}></Route>
                <Route path='/product/:productId' exact component={ProductDetail}></Route>
                <Route path='/cart' exact component={Cart}></Route>
                <AdminRoute path='/admin/orders' exact component={Orders}></AdminRoute>
            </Switch>
        </div> 
        </BrowserRouter>
    );
};

export default Routes;

