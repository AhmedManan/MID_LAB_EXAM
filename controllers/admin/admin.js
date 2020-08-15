var express = require('express');
var adminmodel = require('../../models/adminmodel');
var router = express.Router();


router.get('*', function (request, response, next) {

        if (request.session.loginemail != null && request.session.usertypes=="admin") {
            next();
        } else {
            response.redirect('/logout');
        }
    
 });


router.get('/', function(req, res){
    
        res.render('admin/adminhome');
   
	
});
router.get('/report', function(req, res){

        adminmodel.getReport(function(result){

                res.render('admin/adminreport',{result:result});
        })

    
   
	
});

router.get('/AllEmployeeList', function(req, res){

        adminmodel.ViewUsers(function(result){

                res.render('admin/adminusers',{result:result});
        })

    
   
	
});

router.get('/notice', function(req, res){

              res.render('admin/adminnotice',{sessionid:req.session.userid});
   
	
});

router.get('/viewpost/:id', function(req, res){

        var postid = req.params.id;
        adminmodel.viewPost(postid,function(result){
                res.render('admin/adminviewpost',{result:result});
        })         
	
});

//new working for profile view
router.get('/viewprofile/:id', function(req, res){

        var pid = req.params.id;
        adminmodel.viewProfile(pid,function(result){
                res.render('admin/adminviewprofile',{result:result,usertype:req.session.usertypes});
        })         
	
});

router.post('/deletepost', function(req, res){

        var posterid = req.body.posterid;
        var postid = req.body.postid;
        adminmodel.deletePost(postid,function(status){
                if(status){
                        adminmodel.increaseStrike(posterid,function(status){
                                if(status){
                                        res.redirect('/admin/report');

                                }
                                else{

                                }
                        })
                }
                else{

                        res.redirect('/admin/report');


                }
        })         
	
});

router.post('/deleteprofile', function(req, res){

        var id = req.body.id;
       // var postid = req.body.postid;
        console.log(id);
        adminmodel.deleteAccount(id,function(status){
                if(status){
                        res.redirect('/admin/users');
                }
                else{

                        res.redirect('/admin/users');


                }
        })         
	
});


// current
router.post('/sendNotice', function(req, res){

        var value={
                id:req.body.userid,
                notice: req.body.noticebox
        }
        adminmodel.sendNotice(value,function(status){

                if(status){
                        res.redirect('/admin');
                }
                else{

                        res.redirect('/admin');


                }

        })
  
	
});


router.post('/updateprofile', function(req, res){

        var value={
                id:req.body.id,
                school: req.body.school,
                college: req.body.college,
                university: req.body.university,
                phone: req.body.phone,
                dob: req.body.dob
        }

        adminmodel.updateProfile(value,function(status){

                if(status){
                        res.redirect('/admin');
                }
                else{

                        res.redirect('/admin');


                }

        })


});










module.exports = router;