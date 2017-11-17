


const express= require('express')
    , bodyParser= require('body-parser')
    , passport = require('passport')
    , Auth0Strategy = require('passport-auth0')
    , massive = require('massive')
    , session = require('express-session')
    , cors = require('cors')
    , cookieParser = require('cookie-parser')
    //, path = require('path')
    , con = require('./src/config')
    , herokuURI = con.herokuURI
    , connectionString = herokuURI

    const app=express();

app.use(cors())

///////////////////////////////////////////////////////////

 

app.use(express.static(__dirname + '/../build'));
app.use(cookieParser())
app.use(bodyParser());
   app.use(session({
        secret: con.sessionSecret,
        resave: false,
        saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());



///////////////////
//DATABASE SETUP//
/////////////////

massive(connectionString).then(db =>{
    app.set('db', db)
})


/////////////////////////
//AUTH0 AUTHENTICATION//
///////////////////////

const strategy = new Auth0Strategy(
  {
    domain: con.domain,
    clientID: con.clientID,
    clientSecret: con.clientSecret,
    callbackURL: con.callbackURL
  },
  (accessToken, refreshToken, extraParams, profile, done) => {
    
    return done(null, profile);
  }
);

passport.use(strategy);

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

app.get('/auth', passport.authenticate('auth0'));

app.get('/auth/callback', passport.authenticate('auth0', {
  successRedirect: 'http://localhost:3000/mainPgLoggedIn',
  failureRedirect: 'http://localhost:3000/#/'
}))
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
req.app.get('db').getUserIdCollections(req.user.displayName).then(results=>res.status(200).send(results[0]))

})  


app.get(`/auth/getUserCollections/:username`, (req,res)=>{
  const db = req.app.get('db')
     // if doesn't work  try taking off req.app.get('db') and do app.get('db')
     console.log(req.params.username)
     db.getUserId(res.params.username)
        .then(results=>
            getUserCollections(results[0])
            .then(res.status(200).send()))
   
})


///////////////////
    let PORT = 3001;
    app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`)
    })



