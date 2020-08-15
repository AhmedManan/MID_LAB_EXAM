var express = require('express');
var router = express.Router();

router.get('/', function(req, res){

    if( req.session.usertypes != null){
        
        if(req.session.usertypes=="member")
        {
            var username=req.cookies['username'];
            var userid=req.cookies['userid'];
            var data= {
                userdata: [username,userid],
            }
            res.render('home/index',data);
        }
        else{
            res.redirect('/admin');
        }
        
	}else{
		res.redirect('/login');
	}
});

module.exports = router;