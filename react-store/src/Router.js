import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import App from './pages/App';
import Cart from './pages/Cart';
import Login from './pages/Login';
import NotFound from './pages/NotFound'


const Router = () =>{
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact>
                <App/>
                </Route>
                <Route path="/login" component={Login}/>
                <Route path="/cart" component={Cart}/>
                <Route component={NotFound}/>
            </Switch>
        </BrowserRouter>
    );
}

export default Router;