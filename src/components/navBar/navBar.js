import React,{Component} from 'react';
//import SearchBar from "../main_pg_logged_in/youtube_search/youtube_search_components/search_bar"
import "./navBar.css";
import {connect} from 'react-redux';
import axios from 'axios';
import {contactAuth} from '../../redux/main_reducer'
require('dotenv').config();
class NavBar extends Component{
  constructor(props){
      super(props)

      this.setState={

      }
     
  }


  render(){
      return(
<div className="navBarContainer">
          <div className='navBarDiv'>
                    <div className="hamburgerAndYouTube">
                                <div className="menuYouTubeLogo">
                                               
                                                            <svg className='hamburger' xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" width="512px" height="512px" viewBox="0 0 459 459"  xml="preserve">
                                                                    <g>
                                                                        <g id="menu">
                                                                            <path d="M0,382.5h459v-51H0V382.5z M0,255h459v-51H0V255z M0,76.5v51h459v-51H0z" fill="#b5b8ba"/>
                                                                        </g>
                                                                    </g>
                                                                    <g>
                                                                    </g>
                                                                    <g>
                                                                    </g>
                                                                    <g>
                                                                    </g>
                                                                    <g>
                                                                    </g>
                                                                    <g>
                                                                    </g>
                                                                    <g>
                                                                    </g>
                                                                    <g>
                                                                    </g>
                                                                    <g>
                                                                    </g>
                                                                    <g>
                                                                    </g>
                                                                    <g>
                                                                    </g>
                                                                    <g>
                                                                    </g>
                                                                    <g>
                                                                    </g>
                                                                    <g>
                                                                    </g>
                                                                    <g>
                                                                    </g>
                                                                    <g>
                                                                    </g>
                                                                    </svg>
                                </div>
                                
                                <div className="youTubeAndText">
                                                                    <svg className="youTube" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                                                        viewBox="0 0 461.001 461.001"  xml="preserve">
                                                                    <path  d="M365.257,67.393H95.744C42.866,67.393,0,110.259,0,163.137v134.728
                                                                        c0,52.878,42.866,95.744,95.744,95.744h269.513c52.878,0,95.744-42.866,95.744-95.744V163.137
                                                                        C461.001,110.259,418.135,67.393,365.257,67.393z M300.506,237.056l-126.06,60.123c-3.359,1.602-7.239-0.847-7.239-4.568V168.607
                                                                        c0-3.774,3.982-6.22,7.348-4.514l126.06,63.881C304.363,229.873,304.298,235.248,300.506,237.056z"/>
                                                                    <g>
                                                                    </g>
                                                                    <g>
                                                                    </g>
                                                                    <g>
                                                                    </g>
                                                                    <g>
                                                                    </g>
                                                                    <g>
                                                                    </g>
                                                                    <g>
                                                                    </g>
                                                                    <g>
                                                                    </g>
                                                                    <g>
                                                                    </g>
                                                                    <g>
                                                                    </g>
                                                                    <g>
                                                                    </g>
                                                                    <g>
                                                                    </g>
                                                                    <g>
                                                                    </g>
                                                                    <g>
                                                                    </g>
                                                                    <g>
                                                                    </g>
                                                                    <g>
                                                                    </g>
                                                                    </svg>
                                                                    <span className="youTubeText">YouTube</span>
                                </div>
                                 <a href={process.env.REACT_APP_LOGIN}>  
                                
                       <svg className="userIcon" xmlns="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 258.75 258.75" width="512px" height="512px">
                                <g>
                                    <circle cx="129.375" cy="60" r="60" />
                                    <path d="M129.375,150c-60.061,0-108.75,48.689-108.75,108.75h217.5C238.125,198.689,189.436,150,129.375,150z" />
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                </svg>
                            </a>
                                
                                 
              </div>
          
                      
                        
            </div>

</div>
         
      )
  }
}


function mapStateToProps(state){
   
    return{
       state:state
    }
}

export default connect(mapStateToProps)(NavBar);



