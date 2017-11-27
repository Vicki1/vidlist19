import React from 'react';
import {Switch, Route} from 'react-router-dom';
import App from './App';
import MainPgLoggedIn from './components/main_pg_logged_in/main_pg_logged_in';
import VideoSelectedPage from './components/video_selected/video_selected'

export default(
    <Switch>
        <Route component={App} path='/' exact/>
        <Route component={MainPgLoggedIn} path="/mainPgLoggedIn" exact/>
        <Route component={VideoSelectedPage} path="/videoSelectedPage" exact/>

 
        
    </Switch>
)
