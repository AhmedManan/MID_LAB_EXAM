var express = require('express');
var logindb      = require.main.require('./models/login');
var router = express.Router();

router.get('/', function(request, response, next){

	//if(request.session.loginemail != null){
		response.render('login/index')
	//}else{
	//	response.redirect('/logout');
	//}

});
router.post('/', function(req, res){
    var username = req.body.username;
    var password = req.body.password;
    logindb.getCredentials(username,password,function(result){
        if(result.length>0){
            if(result[0].password==password){
                var remember = req.body.remember;
                if(remember=="true"){
                    // res.cookie('username',result[0].username,{ maxAge: 60000, httpOnly: true });
                    // res.cookie('userid',result[0].pid,{ maxAge: 60000, httpOnly: true });
                    // res.cookie('type',result[0].type,{ maxAge: 60000, httpOnly: true });
                    req.session.loginemail=result[0].username;// creates session as loginemail
                    req.session.usertypes=result[0].type;// creates session as loginemail
                    req.session.userid=result[0].id;// creates session as loginemail
                    console.log('rem tru')
                    
                }
                else{
                console.log('rem false')
                    // res.cookie('username',result[0].username);
                    // res.cookie('userid',result[0].pid);
                    // res.cookie('type',result[0].type);
                   // console.log(result[0])
                   req.session.loginemail=result[0].username;// creates session as loginemail
                   req.session.usertypes=result[0].type;// creates session as usertype
                   req.session.userid=result[0].id;// creates session as loginemail
                   console.log(req.session.userid)

                }
                console.log(" after else")
               
                res.json({ status: 'valid' });
            } 
            else{
                res.json({ status: 'invalid' });
            }
        }
        else{
            res.json({ status: 'invalid' });
        }
    })
    
});

module.exports = router;