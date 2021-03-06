import React,{Component} from "react";
//import Iframe from 'react-iframe';
//import ReactDOM from 'react-dom';
//import Carousel from 'react-responsive-carousel'
import './selected_collection.css';
import Iframe from 'react-iframe';
import {connect} from 'react-redux'; 
import {deleteVideo} from '../../redux/main_reducer';


class SelectedCollection extends Component{
    constructor(props){
        super(props)

        this.state={
        selectedVideoInitial: 'mRf3-JkwqfU',
        selectedVideoId: '',
        
        }
    }


componentWillMount(){
    if(this.props.state.collTheySelected.length >0){
            this.setState({selectedVideoId: this.props.state.collTheySelected[0].video_id})
    }

}
    render(){
       // console.log(this.state.selectedCollection)
     
      const selectedCollection= this.props.state.collTheySelected
    const selectedCollList= selectedCollection.map((video,i)=>
                        <div onClick={()=>this.setState({
                             selectedVideo : video, 
                                  selectedVideoId: video.video_id,
                                  //description: this.state.description,  
                                  selectedVideoVideoId: video.video_id,
                                  selectedVideoChannelTitle : video.channel_title, 
                                  selectedVideoSnippetTitle : video.video_title, 
                                  selectedVideoYouTubeDescription :  video.description_youtube,
                                  selectedVideoImgUrl : video.thumbnail_url
                          
                          
                          })} className="collListVideo">
                                 
                                    <img width="210px" height="118px" src={video.thumbnail_url}/> 
                                   
                                    <div className="collVideoTitle">{video.video_title}</div><br/>
                                    <div className="collVideoDescription">{video.channel_title}</div>
                               </div> 
                                  
                          )


    
             return(
            <div className='selectedCollection'>

                <div className="selectedCollSpacer"></div>
                          
                <div className="selectedCollVideo2">

                    <Iframe className="embed-responsive-item selColVideo1" url={this.state.selectedVideoId? `https://www.youtube.com/embed/${this.state.selectedVideoId}` : `https://www.youtube.com/embed/${''}` }    width="640px"
                            height="360px"
                    display="initial"
                    position="relative"
                    allowFullScreen/>
                  
                     <div>       
                    {this.props.state.collTheySelected[0] ?     selectedCollList : 'There are no videos currently saved to this playlist'}
                    </div>
                </div>
                
              
             <div className="bottomSelColSpacer"></div>
                
                 
            </div>
        )
    }
}
function mapStateToProps(state){
   
    return{
       state:state
    }
}

export default connect(mapStateToProps,{deleteVideo})(SelectedCollection);


    /*var savedVideosDisplay= function(savedVideos){
                                console.log(savedVideos)
                                if(savedVideos){
                                    savedVideos.map((video,i)=>{
                                    return <Iframe key={i} className="embed-responsive-item" url={`https://www.youtube.com/embed/${video.videoId}`}   width="200px"
                                    height="150px"
                                    display="initial"
                                    position="relative"
                                    allowFullScreen/>
                                    
                                    })};
                               
                                    return 'no videos to display'
                                     
                                     }
        */

/* what was used to make video list but img and src instaed of Iframe and url
 <img className="embed-responsive-item" src={`https://www.youtube.com/embed/${video.video_id}`}  
                     width="400px"
                    height="150px"
                    display="initial"
                    position="relative"
                    allowFullScreen/>


 */

/* large video

<Iframe className="embed-responsive-item" 
                             url={`https://www.youtube.com/embed/mRf3-JkwqfU`}    width="970px"
                            height="250px"
                    display="initial"
                    position="relative"
                    allowFullScreen/>
*/



   /*const selectedCollectionList=()=>{
     if (selectedCollection.length>0){
       return  
          selectedCollection.map((video,i)=>
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
                                 
                                    <img width="210px" height="118px" src={video.thumbnail_url}/> 
                                   
                                    <div className="videoTitle">{video.video_title}</div><br/>
                                    <div className="videoDescription">{video.channel_title}</div>
                               </div> 
                                  
                          )
     }
     return ''
   }
   



   
*/