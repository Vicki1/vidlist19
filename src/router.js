import React from 'react';
import {Switch, Route} from 'react-router-dom';
import App from './App';
import mainPgLoggedIn from './components/main_pg_logged_in/main_pg_logged_in';

export default(
    <Switch>
        <Route component={App} path='/' exact/>
        <Route component={mainPgLoggedIn} path="/mainPgLoggedIn" />
 
        
    </Switch>
)
