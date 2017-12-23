
require('dotenv').config()

const express= require('express')
    , bodyParser= require('body-parser')
    , passport = require('passport')
    , Auth0Strategy = require('passport-auth0')
    , massive = require('massive')
    , session = require('express-session')
    , cors = require('cors')
    , cookieParser = require('cookie-parser')
    , path = require('path')
    //, con = require('./src/config')
    , herokuURI = process.env.HEROKU_URI //con.herokuURI
    , connectionString = herokuURI

    const app=express();

app.use(cors())

///////////////////////////////////////////////////////////

 


app.use(cookieParser())
app.use(bodyParser());
app.use(session({
        secret: process.env.SESSION_SECRET,     //con.sessionSecret,
        resave: false,
        saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/../build'));



massive({connectionString
}).then(db=>{
    app.set('db',db) 
 
   console.log(`index recieving?`,process.env.REACT_APP_CALLBACK_URL)
       db.createUsersTable().then(response=>{
            console.log(response,'collections table created')
            }).catch(err=>console.log(err))
        
            db.createCollectionsTable().then(response=>{
            console.log(response,'collections table created')
            }).catch(err=>console.log(err))

            
               db.createVideosTable().then(response=>{
               console.log(response,'video table  created')
               }).catch(err=>console.log(err))
                 
            
}).catch(err=>console.log(err))


/////////////////////////
//AUTH0 AUTHENTICATION//
///////////////////////





/*const strategy = new Auth0Strategy(
  {
    domain: process.env.AUTH_DOMAIN, //con.domain,
    clientID:process.env.AUTH_CLIENT_ID, // con.clientID,
    clientSecret: process.env.AUTH_CLIENT_SECRET, //con.clientSecret,
    callbackURL:process.env.AUTH_CALLBACK //con.callbackURL
  },
  (accessToken, refreshToken, extraParams, profile, done) => {
    
    return done(null, profile);
  }
);

passport.use(strategy);
*/


passport.use(new Auth0Strategy({
  domain: process.env.AUTH_DOMAIN,
  clientID: process.env.AUTH_CLIENT_ID,
  clientSecret: process.env.AUTH_CLIENT_SECRET,
  callbackURL: process.env.AUTH_CALLBACK
}, function(accessToken, refreshToken, extraParams, profile, done) {

 
 return done(null, profile);
  



}));

app.get('/auth', passport.authenticate('auth0'));

app.get('/auth/callback', passport.authenticate('auth0', {
  successRedirect: process.env.SUCCESS_REDIRECT,
  failureRedirect:  process.env.FAILURE_REDIRECT
}))

// This can be used to keep a smaller payload
passport.serializeUser(function(user, done) {
  done(null, user);
});


passport.deserializeUser(function(user, done) {
 
  done(null, user);
});

// ...




///////////////////
//AUTH0 ENDPOINTS//
//////////////////




/*
passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(user, done) {
  app.get('db').find_session_user([user.id])
  .then( user => {
    return done(null, user[0]);
  })
});*/

app.get('/auth/me', (req, res, next) => {
  if (!req.user) {
    console.log(`not logged in so req.user doesn't exist`)
    return res.status(401).send('Log in required');
  } else {
    console.log(`req.user exists: `)
    return res.status(200).send(req.user.emails[0].value);
  }
})

app.get('/auth/logout', (req, res) => {
  req.logOut();
  return res.redirect('http://localhost:3000/#/');
})


///////////////////
//OTHER ENDPOINTS//
//////////////////
 app.get("/test", (req,res)=>{
console.log('this is working ',req.user.displayName)


})  


app.get(`/auth/getUserCollections`, (req,res)=>{
  const db = req.app.get('db')

     // if doesn't work  try taking off req.app.get('db') and do app.get('db')
     req.app.get('db').getUserId(req.user.displayName)
    .then(results=>{
      if(!results[0]){
        db.createUserByAuth([req.user.id,req.user.displayName])
        .then(results=>res.status(200).send({userId:results[0].id, display_name:req.user.displayName, collections:[] }))
      }
      else{
        var userId=results[0].id
        db.getUserCollectionNames(results[0].id)
        .then(results=>{
          var collectionNames=results
          db.getUserVideos(userId)
          .then(results=>res.status(200).send({userId : userId, display_name: req.user.displayName, collectionNames: collectionNames, videos : results}))
        })
         //db.getUsersVideos(results[0].id).then(results=>res.status(200).send({userId: userId, display_name: req.user.displayName, videos:results}))
      }
    }
   )
  })


app.post(`/api/newCollection`, (req,res)=>{
     let db= req.app.get('db')
     console.log(req.body, 'this is what createCollection endpoint takes in')
     db.createCollection([req.body.userId,req.body.newCollection])
     .then(results=>{
         console.log('new collection results', results[0])
         res.status(200).send(results[0])
    })
    .catch(err=>{console.log(err, 'see newCollection server endpoint')})
})


app.post(`/api/addVideoToCollection/`, (req,res)=>{
     let db= req.app.get('db')
     console.log(req.body, 'this is what addVideo endpoint takes in')

     db.addVideoToCollection([req.body.videoId, req.body.collectionId, req.body.userId, req.body.descriptionUser, req.body.channelTitle, req.body.videoTitle, req.body.descriptionYouTube, req.body.thumbnailUrl ])
     .then(results=>{
         console.log('new video added to collection ', results[0])
         db.getUserId(req.user.displayName)
     })
     .catch(err=>console.log(err,' see addVideoToCollection endpoint'))
})


app.get('/api/getUserCollectionNames/:collectionId', (req,res)=>{
    let db= req.app.get('db')
    console.log(req.params.collectionId, 'this is what selectedCollection endpoint is taking in')
    db.getUserCollectionNames(req.params.collectionId)
    .then(results=>{
        console.log('this is data returned to selectCollection endpoint', results)
        res.status(200).send(results)
    })
    .catch(err=>console.log(err, ' see selectCollection server endpoint'))

})

//get all videos for whatever collection user clicked on to select
app.get('/api/selectCollection/:collectionId', (req,res)=>{
    let db= req.app.get('db')
    console.log(req.params.collectionId, 'this is what selectedCollection endpoint is taking in')
    db.selectCollection(req.params.collectionId)
    .then(results=>{
        console.log('this is data returned to selectCollection endpoint', results)
        res.status(200).send(results)
    })
    .catch(err=>console.log(err, ' see selectCollection server endpoint'))

})



//////////////////////////////////////////
///THIS NEEDS TO BE THE LAST ENDPOINT////
/////////////////////////////////////////



/*app.get('*', (req, res)=>{
  res.sendFile(path.join(__dirname + '/../build'));
})*/

///////////////////////////////////////////////////
//// END OF WHAT NEEDS TO BE THE LAST ENDPOINT////
//////////////////////////////////////////////////


///////////////////
    let PORT = 3001;
    app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`)
    })



/* MY PREVIOUSLY ALLOWED CALLBACK URL FOR AUTH0
http://localhost:3001/api/callback, http://localhost:3001/api/login, http://localhost:3000/callback, https://vidlist0.now.sh/auth/me, http://localhost:3000/auth/callback, http://localhost:3001/auth/callback, https://vidl-atvcgyjdec.now.sh/, https://vidlist0.now.sh/mainPgLoggedIn, https://vidlist0.now.sh/api/callback, https://vidlist0.now.sh/callback, https://vidlist0.now.sh/auth/callback, https://vidlist0.now.sh/api/login, https://vidlist0.now.sh/, https://vidlist0.now.sh
*/ 