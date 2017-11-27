import React,{Component} from 'react';
import {connect} from 'react-redux';
import Iframe from 'react-iframe';


/*export default function VideoSelectedPage(props){
    return(
        <div className="videoSelectedPageContainer">
           
            hey this is the videoselectedPage
            
        </div>
    )
}
*/
class VideoSelectedPage extends Component{
    constructor(props){
        super(props)

        this.state={
            test: "test"
        }
    }
    render(){
        /*
         <div className="videoTitle">{this.props.state.selectedVideo.props.video.snippet.title}</div><br/>
                            <div className="videoDescription">{this.props.state.selectedVideo.props.video.snippet.channelTitle}</div>
             
         */
        console.log(this.props.state)
        console.log(this.state)
        return(
            <div className="videoSelectedPageContainer">
                ojoajd;flkajs;ldkjf;alkdjf;lakjs;dflkas
                las;df<br/>
                asdf<br/>
                alskfj<br/>
                aksdfj<br/>
                asdf<br/>
                aldsjfl<br/>
                a;lksdjf<br/>
                a;lsdkfj<br/>
                alksdjfh<br/>
                alkdsjf<br/>
                    
                            <div>
                            <Iframe className="embed-responsive-item" url={ this.props.state.selectedVideo? `https://www.youtube.com/embed/${this.props.state.selectedVideo.props.video.id.videoId}` : `https://www.youtube.com/embed/mRf3-JkwqfU`}   width="210px"
                            height="118px"
                            display="initial"
                            position="relative"
                            allowFullScreen/>
                            </div>
                           
                            <br/> 
                           
          
            </div>
        )
    }
}

function mapStateToProps(state){
   
    return{
        state:state
    }
}

export default connect(mapStateToProps,{})(VideoSelectedPage);