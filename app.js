var express 	= require('express');
var exSession 	= require('express-session');
var bodyParser 	= require('body-parser');
var app 		= express();
var login       = require('./controllers/login');
var home        = require('./controllers/home/home')
var reg         = require('./controllers/registration/registration');
var post        = require('./controllers/user/post/post');
var session = require('express-session');
var message = require('./controllers/user/message');
var page = require('./controllers/page');
var user = require('./controllers/user');
var admin = require('./controllers/admin/admin');
var logout = require('./controllers/logout');
const cookieParser = require('cookie-parser');

app.set('view engine', 'ejs');
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false}));
app.use(exSession({secret: 'my secret value', saveUninitialized: true, resave: false}));
app.use(bodyParser.urlencoded({extended: false}));
app.use(exSession({secret: 'my secret value', saveUninitialized: true, resave: false}));
app.use('/message',message);
app.use('/page',page);
app.use('/user',user);
app.use('/logout',logout);
app.use('/login',login);
app.use('/assets',express.static('assets'));
app.use('/post',post);


app.listen(3000, function(){
    console.log('express http server started at...3000');
    
});

// app.get('/', function(req, res){
//     res.redirect('/login');
// });
//app.use('/login',login);
app.use('/home',home);
app.use('/registration',reg);
app.use('/admin',admin);


// changes
// Errors => page not found 404
app.use((req, res, next) =>  {
    var err = new Error('Page not found');
    err.status = 404;
    next(err);
})

// Handling errors (send them to the client)
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send(err.message);
});