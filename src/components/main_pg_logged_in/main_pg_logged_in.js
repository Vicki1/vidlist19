import React, {Component} from 'react';
import Collections from './collections/collections';
import SelectedCollection from './selected_collection/selected_collection';
import YouTubeSearch from './youtube_search/youtube_search';
import {setUser} from '../../redux/main_reducer';
import {connect} from 'react-redux';
import axios from 'axios';




class MainPage extends Component{
    constructor(props){
        super(props)

            this.state={
                    loggedIn: false,
                    showLoginSignUpButton: false,
                    user: ''
            }
    }

componentDidMount(){
 axios.get(`/auth/me`)
 .then((results)=>{
     //console.log(`results from ComponentDidMoutn `,results)
     //this.setState({username:results.data})
     this.props.setUser(results.data)
    })
 .catch((err)=>console.log(`error see main_pg_logged_in.componentDidMount`,err))
}

    render(){
        console.log(`local state`, this.state)
         console.log(`redux store state`, this.props.state)
        return(
            <div className="mainPageDiv">
                
              collections  <Collections/>
            selected collections <SelectedCollection/> 
                <h2>Search YouTube Videos</h2>
                <YouTubeSearch/>
            </div>
        )
    }
}



/*<Collections/>
            </div>
              <SelectedCollection/>
              <YouTubeSearch/>*/
function mapStateToProps(state){
   
    return{
        state: state
    }
}

export default connect(mapStateToProps,{setUser})(MainPage);

