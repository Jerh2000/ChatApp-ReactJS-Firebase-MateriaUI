import React from 'react';
import {Route, Switch} from 'react-router-dom';

import Login from './Components/login';
import Signup from './Components/signup';
import Chat from './Components/Chat/index'


const Routes = () =>(
    <Switch>
        <Route exact path="/" component={Chat}/>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/signup" component={Signup}/>
    </Switch>
);

export default Routes;