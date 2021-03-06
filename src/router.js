import React from 'react';
import {Switch, Route} from 'react-router-dom';
import App from './App';
import MainPgLoggedIn from './components/main_pg_logged_in/main_pg_logged_in';
import VideoSelectedPage from './components/video_selected/video_selected';
import SelectedCollection from './components/selected_collection/selected_collection';


export default(
    <Switch>
        <Route component={MainPgLoggedIn} path='/' exact/>
        <Route component={MainPgLoggedIn} path="/mainPgLoggedIn" exact/>
        <Route component={SelectedCollection} path="/selectedCollection" exact/>


 
        
    </Switch>
)
