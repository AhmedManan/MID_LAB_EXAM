var express = require('express');
var db      = require.main.require('./models/reg');
var router  = express.Router();
router.get('/', function(req, res){
    if(req.cookies['username'] == null){
        res.render('registration/index');
    }
    else{
        res.redirect('/home');
    }
});
router.post('/', function(req,res){
    
    db.regUser(req.body,function(result,result2){
        
        if(result && result2){
            
            res.json({ status: 'valid' });
        }
        else{
            res.json({ status: 'invalid' });
        }
    });

});
router.post('/checking',function(req,res){
    console.log(req.body);
    if(req.body.username)
    {
        db.checkUname(req.body.username,function(value){
        if(value){   
            res.json({check:"true"});
        }
        else{
            res.json({check:"false"});
        }
        });
        
    }
    if(req.body.email)
    {
        db.checkEmail(req.body.email,function(value){
        if(value){   
            
            res.json({check:"true"});
        }
        else{
            
            res.json({check:"false"});
        }
        });
        
    }
    
});
module.exports = router;
