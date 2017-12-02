
import React, { Component } from 'react';
import {API_KEY} from '../../../config'
import YTSearch from 'youtube-api-search';
import SearchBar from './youtube_search_components/search_bar.js'
import VideoItem from  './youtube_search_components/video_list.js'
import _ from 'lodash';
import Iframe from 'react-iframe';
import {selectVideo,createCollection} from '../../../redux/main_reducer';
import {connect} from 'react-redux';
import axios from 'axios';
import AddToPlaylist from '../../imgs/add-to-playlist';


//import {GoogleAuth, gapi, initClient, updateSigninStatus} from 'googleauth';

const SAVE_VIDEO = "SAVE_VIDEO"

class YouTubeSearch extends Component {
  constructor(props){
    super(props);

    this.state={
      videos: [],
      selectedVideo: "mRf3-JkwqfU"
    };
    this.videoSearch=this.videoSearch.bind(this)
  }

 videolist
videoSearch(term){
   YTSearch({key: API_KEY, term:term,},(videos)=>{
  this.videolist = videos.map(video=>{
    return <VideoItem  key={video.etag} video={video}/>
  });
   this.setState({
       videos: this.videolist,
       selectVideoInitial: this.videolist[0].props.video.id.videoId,
       selectedVideo: true,
       selectedVideoId:this.videolist[0].props.video.id.videoId,
       description: '',  
        selectedVideoVideoId: this.videolist[0].props.video.id.videoId,
       selectedVideoChannelTitle : this.videolist[0].props.video.snippet.channelTitle, 
        selectedVideoSnippetTitle : this.videolist[0].props.video.snippet.title, 
        selectedVideoYouTubeDescription :  this.videolist[0].props.video.snippet.description,

        selectedVideoImgUrl : this.videolist[0].props.video.snippet.thumbnails.default.url, 
        
      });
    });

 this.saveVideo=this.saveVideo.bind(this)
}


  /*selectedVideo: false,
       selectedVideoId:'mRf3-JkwqfU',
       description: '',   description of selected video
        selectedVideoVideoId= "", // this.state.selectedVideo.props.video.id.videoId,
       selectedVideoUserDescription= "", // this.state.description,
       selectedVideoChannelTitle = "", // this.state.selectedVideo.props.video.snippet.channelTitle,
        selectedVideoSnippetTitle = "", // this.state.selectedVideo.props.video.snippet.title,
        selectedVideoYouTubeDescription =  "", // this.state.selectedVideo.props.video.snippet.description,
        selectedVideoImgUrl = "", // this.state.selectedVideo.props.video.snippet.thumbnails.default.url,
*/

/// figure out if presenting this.state.videoSelected wrong, or if need to have two turnaries going on lower, one to decide what to display, one to decide if to dipslay it, 
// if can try to get onClick function to take to other page after get state set----BUT I FEEL WEIRD ABOUT THIS SO DO IT LAST!!
// SET UP CHANNELS PAGE LAST AS MVP;
// CHECK OUT ASCP CLASSES!!! make sure get done in time
componentDidMount(){
  this.videoSearch(this.state.selectedVideo)
  this.setState({selectedVideo: this.state.videos[0]})
}


//ACTION CRETORS, prepare them to be dispatched to reducer, but changes will happen in server via axios before action is passed to reducer to alter redux state
saveVideo(userId, collectionId,videoId,descriptionUser, channelTitle, videoTitle, descriptionYouTube, thumbnailUrl){
    return {
        type: SAVE_VIDEO,
        payload: axios.post(`/api/addVideoToCollection/`,{userId:userId, videoId:videoId, collectionId:collectionId, descriptionUser: descriptionUser, channelTitle:channelTitle, videoTitle:videoTitle, descriptionYouTube: descriptionYouTube, thumbnailUrl:thumbnailUrl })
    .then((res)=>{
  
            return res.data;
})
    .catch(err=>console.log(err,' error from SaveVideo action creator axios request'))
    }
   
}

// <Iframe className="embed-responsive-item" url={this.state.selectedVideo? `https://www.youtube.com/embed/${this.state.selectedVideo.props.video.id.videoId}` : `https://www.youtube.com/embed/${this.state.selectVideoInitial}`}    width="970px"
  
  render() {
    const videoSearch=_.debounce((term)=>{this.videoSearch(term)},300);
  console.log(`this is this.state.selectedVideo`, this.state.selectedVideo)
        const selectedCollection=this.props.state.selectedCollection;
        //console.log(`selectedCollection`, selectedCollection)
   const videos=this.state.videos;
   console.log(`videos`, this.state.videos)

   /////trying to save video

          const collections=this.props.state.collections;
  const userId=this.props.state.userId;
  const selectedVideo = this.state.selectedVideo
  const selectedVideoVideoId= this.state.selectedVideoVideoId;
  const selectedVideoUserDescription= this.state.description;
  const selectedVideoChannelTitle = this.state.selectedVideoChannelTitle;
  const selectedVideoSnippetTitle = this.state.selectedVideoSnippetTitle;
  const selectedVideoYouTubeDescription =  this.state.selectedVideoYouTubeDescription;
  const selectedVideoImgUrl = this.state.selectedVideoImgUrl;
        const collectionsList=collections.map((collection,i)=><p id={`${collection.id}SaveButton`} onClick={()=>this.saveVideo(userId, collection.id, selectedVideoVideoId, selectedVideoUserDescription, selectedVideoChannelTitle, selectedVideoSnippetTitle,selectedVideoYouTubeDescription, selectedVideoImgUrl )}>{collection.collection_name}</p>) 
          
 

   
         console.log(this.state)
  



  const videoThumbnailList=videos.map((video,i)=>
                        
                               <div onClick={()=>this.setState({
                                  selectedVideo : video, 
                                  selectedVideoId: video.props.video.id.videoId,
                                  //description: this.state.description,  
                                  selectedVideoVideoId: video.props.video.id.videoId,
                                  selectedVideoChannelTitle : video.props.video.snippet.channelTitle, 
                                  selectedVideoSnippetTitle : video.props.video.snippet.title, 
                                  selectedVideoYouTubeDescription :  video.props.video.snippet.description,
                                  selectedVideoImgUrl : video.props.video.snippet.thumbnails.default.url 
                                 })} className="youTubeSearchVideo">
                                 
                                    <img width="210px" height="118px" src={video.props.video.snippet.thumbnails.default.url}/> 
                                   
                                    <div className="videoTitle">{video.props.video.snippet.title}</div><br/>
                                    <div className="videoDescription">{video.props.video.snippet.channelTitle}</div>
                               </div>     
                          )




                    
    return (
      <div>
        <SearchBar searchForTerm={videoSearch}/>
      <div className="youTubeSearchArea">
       <div className="selectedVideoContainer">
            <div className="selectedVideoSpacer">
           
            </div>
            <div className="selectedVideo">

                  <Iframe className="embed-responsive-item" url={this.state.selectedVideo? `https://www.youtube.com/embed/${this.state.selectedVideoId}` : `https://www.youtube.com/embed/${this.state.selectVideoInitial}`}    width="970px"
                            height="250px"
                    display="initial"
                    position="relative"
                    allowFullScreen/>

                     
                    
                   
                    <div className="dropdown addToPlaylistSelector">
                          <span className="addToPlaylist"><AddToPlaylist/></span>
                          <div class="dropdown-content">
                            
                          {collectionsList}
                          <div className="newCollEntry">
                            <input className="newCollectionName" placeholder="new collection name ..." onChange={(event)=>this.setState(Object.assign({},this.state,{newCollection:event.target.value}))}/>
                           <button id="createNewCollectionButton" onClick={()=>this.props.createCollection(this.props.state.userId,this.state.newCollection)}>create</button>
                           </div>
                          </div>
                    </div>
                  
            </div>
         </div>
          
          <div className="titleVideoTypeContainer">
           <span>Recommended</span>
         </div>
       <div className="searchedVideosContainer">
        
             {videoThumbnailList}
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


export default connect(mapStateToProps,{selectVideo,createCollection})(YouTubeSearch);


//onClick={()=>this.props.saveVideo(this.state.selectedVideo.props.state.userId, this.state.selectedVideo.props.state.collection.id, this.state.selectedVideo.props.video.id.videoId, this.state.selectedVideo.description, this.state.selectedVideo.props.video.snippet.channelTitle, this.state.selectedVideo.props.video.snippet.title, this.state.selectedVideo.props.video.snippet.description, this.state.selectedVideo.props.video.snippet.thumbnails.default.url)}>collection.name</button></li>) 

// <input placeholder="Your Description ..." onChange={(event)=>this.setState(Object.assign({},this.state,{ description: event.target.value }))}/>

/*
 <div class="dropdown">
                        <button class="dropbtn">Save To</button>
                            <div class="dropdown-content">
                                 {collectionsList}
                            </div>
                    </div>
*/ 