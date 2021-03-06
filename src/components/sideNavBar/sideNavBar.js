import React,{Component} from 'react';
import HomeImg from '../imgs/home-button'
import Library from './library/library';
import './sideNavBar.css';
export default class SideNavBar extends Component{
  constructor(props){
      super(props)

      this.setState={

      }
  }
  render(){
      return(
          <div className="sideNavBarContainer">
               <div className="homeTrendingSubMenu">
                        <a href="/mainPgLoggedIn">
                        <div className="singleMenuItemContainer">
                            <div className="menuLogoContainer">
                                    <HomeImg/>   
                            </div>
                            <div className="menuWordContainer">
                                         <span className="menuWord">Home</span>
                            </div>
                        </div>
                        </a>
                        <Library/>
                        
               </div>     
          </div>
      )
  }
}

/*
<svg xmlns="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" width="512px" height="512px" viewBox="0 0 510 510"  xml="preserve">
                                        <g>
                                            <g id="home">
                                                <polygon points="204,471.75 204,318.75 306,318.75 306,471.75 433.5,471.75 433.5,267.75 510,267.75 255,38.25 0,267.75     76.5,267.75 76.5,471.75   " />
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

*/