import axios from 'axios';
//import {SAVE_VIDEO} from './actions.js'
const SAVE_VIDEO = 'SAVE_VIDEO';
//const NEW_USER = 'NEW_USER';
const SET_USER = 'SET_USER';
const CREATE_COLLECTION = 'CREATE_COLLECTION';
const GET_COLLECTION ='GET_COLLECTION';
const COLLECTION_SELECTED = 'COLLECTION_SELECTED';
const USER_ALREADY_LOGGED_IN= 'USER_ALREADY_LOGGED_IN';
const SELECT_VIDEO='SELECT_VIDEO'
//const DELETE_COLLECTION= 'DELETE_COLLECTION';



//var data=getVideos();

var initialState= 
{
    userId: '',
    username: '',
    collections: [],
    videos: [],
    selectVideo:'',
    //somehow do I need both  of these to get collections to render correctly?
    selectedCollection: false,
    collTheySelected: [],

}


//ACTION CRETORS, prepare them to be dispatched to reducer, but changes will happen in server via axios before action is passed to reducer to alter redux state
export function saveVideo(userId, collectionId,videoId,descriptionUser, channelTitle, videoTitle, descriptionYouTube, thumbnailUrl){
    return {
        type: SAVE_VIDEO,
        payload: axios.post(`/api/addVideoToCollection/`,{userId:userId, videoId:videoId, collectionId:collectionId, descriptionUser: descriptionUser, channelTitle:channelTitle, videoTitle:videoTitle, descriptionYouTube: descriptionYouTube, thumbnailUrl:thumbnailUrl })
    .then((res)=>{
  
            return res.data;
})
    .catch(err=>console.log(err,' error from SaveVideo action creator axios request'))
    }
   
}



export function setUser(username){
    console.log("loginwithAuth0 fired")
    return{
        type: SET_USER,
        payload: axios.get(`/auth/getUserCollections`)
       .then((res)=>{
           //console.log(`set user axios fn returned `, res.data)
            return res.data
        })
    }
        
}


export function getCollections(userId){
    return {
        type: GET_COLLECTION,
        payload: axios.post(`/api/getCollections/`,{userId})
        .then((res)=>{
  
            return res.data
        })
        .catch(err=>console.log(err, 'error from getCollections axios request'))
    }
}



export function createCollection(userId, collectionName){
//console.log(collectionName, userId, 'this is what createCollection action creator takes in');
return{
    type: CREATE_COLLECTION,
    payload: axios.post(`/api/newCollection`,{userId:userId, newCollection:collectionName})
    .then((res)=>{
  
        return res.data
    })
    .catch(err=>console.log(err, 'error from createCollection axios request'))
}
}

export function deleteCollection(collectionId,userId ){
return{
    type:  GET_COLLECTION,
    payload: axios.delete(`/api/deleteCollection/${userId}/${collectionId}`,)
    .then ((res)=>{
       // console.log(res.data)
        return res.data
    })
      .catch(err=>console.log(err, 'error from deleteCollection axios request'))
}
}

export function selectCollection(collectionId){
    console.log(collectionId, ' this is collectionId selectCollection action creator takes in')
    return {
        type: COLLECTION_SELECTED,
        payload: axios.get(`/api/selectCollection/${collectionId}`)
        .then((res)=>{
           // console.log(res.data, 'this is what selectCollection axios call returned')
            return res.data
        })
        .catch(err=>console.log(err,' error from selectCollection axios request'))
    }
}




//DELETE VIDEO WITHIN DB, THEN GET NEW COLLECTION WITHOUT DELETED VIDEO AND SET IT TO SELECTED COLLECTION IN REDUX
export function deleteVideo(id, collectionId){
   return{
       type: COLLECTION_SELECTED,
       payload: axios.delete(`/api/deleteVideo/${id}/${collectionId}`)
        .then((res)=>{
            console.log(res.data, 'this is what deleteCollection axios call returned')
            return res.data
        })
        .catch(err=>console.log(err,' error from deleteCollection axios request'))
   }
    
}


export function selectVideo(video){
    console.log(`selectVideo recieves`, video)
    return{
        type: SELECT_VIDEO,
        payload: video
    }
}

export default function mainReducer(state=initialState,action){
   
    switch(action.type){
        
        case COLLECTION_SELECTED + '_FULFILLED':
        console.log('collection_select action.payload is', action.payload)
            return Object.assign({},state,{collTheySelected :action.payload, selectedCollection: true})
        
        case SAVE_VIDEO +  '_FULFILLED' :
         var newVideosArray = [...state.collections, action.payload];
            return Object.assign({},state,{videos: newVideosArray});//////////////this might be wrong
            
         
        case SET_USER + '_FULFILLED' :
            //console.log(action.payload, `this is what LOGIN_USER reducer fn takes in`);
            return Object.assign({},state,{userId: action.payload.userId, username: action.payload.display_name, collections:action.payload.collectionNames, videos : action.payload.videos});

        case USER_ALREADY_LOGGED_IN :
            console.log(action.payload, 'give to cookie whatever reducer')
            return Object.assign({},state,{username: action.payload.username, userId:action.payload.userId})

        case GET_COLLECTION + '_FULFILLED':
            
            return Object.assign({},state,{collections: action.payload});
            

        case CREATE_COLLECTION + '_FULFILLED':
            
            var newCollectionsArray = [...state.collections, action.payload];
            return Object.assign({},state,{collections : newCollectionsArray});

        case SELECT_VIDEO + '_FULFILLED':
        console.log(`select video action.payload`, action.payload)
            return Object.assign({},state,{ selectVideo : action.payload});

        
   

          default:
        return state;
    }
 
}