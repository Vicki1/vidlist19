import React,{Component} from 'react';
import './library.css';
import {connect} from 'react-redux';
import HomeImg from '../../imgs/home-button';
import PlaylistImg from '../../imgs/playlist';
import {selectCollection} from '../../../redux/main_reducer'


class Library extends Component{
    constructor(props){
        super(props)

        this.state={
            hello: 'hello library'
        }
    }




    render(){
        console.log(`library get this`,this.props.state)
        var collections=this.props.state.collections
         const collectionsList=(collections).map((collection,i)=>
    
                <div onClick={()=>this.props.selectCollection(collection.id)} key ={collection.id} className="singleMenuItemContainer">
                            <div className="menuLogoContainer">
                                    <PlaylistImg/> 
                            </div>
                            <div className="menuWordContainer">
                                         <span className="menuWord">{collection.collection_name}</span>
                            </div>
                 </div>


        ) 
        return(
         <div className="libraryDiv">
             <span className="libraryLabel">LIBRARY</span>
               
                {collectionsList}    
           </div>
        )
    }
}


function maptStateToProps(state){
    return { state: state}
}

export default connect(maptStateToProps,{selectCollection})(Library);