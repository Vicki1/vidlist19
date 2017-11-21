import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import router from './router';
import NavBar from './components/navBar/navBar';
import SideNavBar from './components/sideNavBar/sideNavBar';


class App extends Component {
  render() {
    return (
   <div className="App">
       
      <NavBar/>
       
      <div className="underNavBar">
                    <SideNavBar/>
                  
                    <div className="app-router-container">

                        {router}
                    
                    </div>
      </div>
                 
    
   </div>
    );
  }
}

export default App;
