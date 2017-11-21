import React,{Component} from 'react';
import Iframe from 'react-iframe';
import {DropdownButton} from 'react-bootstrap';
import {connect} from 'react-redux';
import {saveVideo,getCollections} from '../../../../redux/main_reducer';


 class VideoItem extends Component{
    constructor(){
        super()

        this.state={
            VideoList:[],
            description: '',
           
        }
    this.saveToCollection=this.saveToCollection.bind(this);
    
    }
 
 saveToCollection(collection,videoId){
     this.props.dispatch(saveVideo(this.props.userId,collection,videoId,'this is my new video description!!'))
 }



      render(){
          console.log(this.state)
  const collections=this.props.collections
  const userId=this.props.userId
        const collectionsList=collections.map((collection,i)=><li key={collection.id} ><button id={`${collection.id}SaveButton`} onClick={()=>this.props.saveVideo(userId, collection.id, this.props.video.id.videoId,this.state.description)}>{collection.collection_name}</button></li>) 
          
 
 

        return(
           <div className='youtTubeVideoDisplay'>
                <div className="youTubeSearchVideo">
                    
                    <Iframe className="embed-responsive-item" url={`https://www.youtube.com/embed/${this.props.video.id.videoId}`}   width="210px"
                    height="118px"
                    display="initial"
                    position="relative"
                    allowFullScreen/>
                    <br/> 
                    <input placeholder="Your Description ..." onChange={(event)=>this.setState(Object.assign({},this.state,{ description: event.target.value }))}/>
                     <div class="dropdown">
                        <button class="dropbtn">Save To</button>
                            <div class="dropdown-content">
                            {collectionsList}
                            </div>
                    </div>
                </div>
                    
                
         </div>
        )
    }
}

function mapStateToProps(state){
   
    return{
        heydoesitwork: state,
        userId : state.userId,
        collections: state.collections
    }
}

export default connect(mapStateToProps,{getCollections,saveVideo})(VideoItem);