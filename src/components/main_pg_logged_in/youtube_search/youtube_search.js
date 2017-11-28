import React, { Component } from 'react';
import {API_KEY} from '../../../config'
import YTSearch from 'youtube-api-search';
import SearchBar from './youtube_search_components/search_bar.js'
import VideoItem from  './youtube_search_components/video_list.js'
import _ from 'lodash';
import Iframe from 'react-iframe';
import {selectVideo} from '../../../redux/main_reducer';
import {connect} from 'react-redux'

//import {GoogleAuth, gapi, initClient, updateSigninStatus} from 'googleauth';

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
       selectVideoInitial: 'mRf3-JkwqfU',
       selectedVideo: '',
       selectedVideoId:'',
       
      });
    });

}
/// figure out if presenting this.state.videoSelected wrong, or if need to have two turnaries going on lower, one to decide what to display, one to decide if to dipslay it, 
// if can try to get onClick function to take to other page after get state set----BUT I FEEL WEIRD ABOUT THIS SO DO IT LAST!!
//SET UP CHANNELS PAGE LAST AS MVP;
// CHECK OUT ASCP CLASSES!!! make sure get done in time
componentDidMount(){
  this.videoSearch(this.state.selectedVideo)
}

// <Iframe className="embed-responsive-item" url={this.state.selectedVideo? `https://www.youtube.com/embed/${this.state.selectedVideo.props.video.id.videoId}` : `https://www.youtube.com/embed/${this.state.selectVideoInitial}`}    width="970px"
  
  render() {
    const videoSearch=_.debounce((term)=>{this.videoSearch(term)},300);
  console.log(`this is this.state.selectedVideo`, this.state.selectedVideo)
     
   const videos=this.state.videos;

  const videoThumbnailList=videos.map((video,i)=>
                        
                               <div onClick={()=>this.setState({selectedVideo : video, selectedVideoId: video.props.video.id.videoId})} className="youTubeSearchVideo">
                                 
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


export default connect(mapStateToProps,{selectVideo})(YouTubeSearch);