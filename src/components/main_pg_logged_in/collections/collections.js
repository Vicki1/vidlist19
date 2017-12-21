import React,{Component} from 'react';
import {connect} from 'react-redux';
import {getCollections, createCollection, selectCollection, deleteCollection} from '../../../redux/main_reducer';
import {DropdownButton} from 'react-bootstrap';



class Collections extends Component{
    constructor(props){
        super(props)

        this.state={
            newCollection: '',
            collections:[]
           
        }
 
    }

/*/////// create collection button///////////
             <button id="createNewCollectionButton" onClick={()=>this.props.createCollection(this.props.state.userId,this.state.newCollection)}>create</button><input className="newCollectionName" placeholder="new collection name ..." onChange={(event)=>this.setState(Object.assign({},this.state,{newCollection:event.target.value}))}/>


*/ 

componentWillMount(){
    this.setState({collections: this.props.state.collections})
    
}

    render(){
       //console.log(this.props.state.collections);
       var collections=this.props.state.collections
      
        const collectionsList=(collections).map((collection,i)=>
        <div key ={collection.id} className="individualCollectionDiv">
        <button key={collection.id} className="collectionsDropdownChoices" onClick={()=>this.props.selectCollection(collection.id)} key={collection.id}>{collection.collection_name}</button>
  
        </div>
        ) 
         /*const deleteCollectionsList=(this.state.collections).map((collection,i)=>
        <div key={collection.id} className="deleteIndividualCollectionDiv">
        <button className="deleteCollectionsDropdownChoices" onClick={()=>this.props.deleteCollection(collection.id,this.props.state.userId)} key={collection.id}>{collection.collection_name}</button>
        <button key={collection.id} onClick={()=>deleteCollection(collection.id, this.props.state.userId)}>x</button>
        </div>
        ) */
        return(
           
            <div className="collectionsList">
                 
               
                            
                         
                            
                    
                    <br/>

                            
               
                            
               
                <br/>
               
   
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

export default connect(mapStateToProps,{getCollections,createCollection,selectCollection,deleteCollection})(Collections);
