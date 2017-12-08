import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import router from './router';
import NavBar from './components/navBar/navBar';
import SideNavBar from './components/sideNavBar/sideNavBar';
import {connect} from 'react-redux';
require('dotenv').config();

class App extends Component {

  render() {
      console.log(this.props.state)
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


function mapStateToProps(state){
   
    return{
        state:state
    }
}

export default connect(mapStateToProps,{})(App);
