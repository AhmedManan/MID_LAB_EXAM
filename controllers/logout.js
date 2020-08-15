var express = require('express');
var logindb      = require.main.require('./models/login');
var router = express.Router()

router.get('/', function(req, res){

	// cookies.set('username', {expires: Date.now()});
	// cookies.set('userid', {expires: Date.now()});
    // cookies.set('type', {expires: Date.now()});

	req.session.loginemail=null;
	req.session.usertypes=null;


	
	//console.log(req.cookies['type']);
    
	
	res.redirect('/login');
});





module.exports=router