import React,{Component} from "react";
//import Iframe from 'react-iframe';
//import ReactDOM from 'react-dom';
//import Carousel from 'react-responsive-carousel'
import './selected_collection.css';
import Iframe from 'react-iframe';
import {connect} from 'react-redux'; 
import {deleteVideo} from '../../../redux/main_reducer';


class SelectedCollection extends Component{
    constructor(props){
        super(props)

        this.state={
        selectedVideoInitial: 'mRf3-JkwqfU',
        selectedVideo: '',
        selectedVideoId: ''
        }
    }

    render(){
        console.log(this.state.selectedCollection)
       const selectedCollection=this.props.state.selectedCollection;
      // const selectedCollection0= this.props.state.selectedCollection[0].props.video.id.videoId
    


    
             return(
            <div className='selectedCollection'>

                <div className="selectedCollSpacer"></div>

                <div className="selectedCollVideo">
                             

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