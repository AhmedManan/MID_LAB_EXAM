var express = require('express');
var router = express.Router();
var multer      = require('multer');
var path        = require('path');
var db      = require.main.require('./models/post');
var storage = multer.diskStorage({
    destination: './assets/images/uploads',
    filename: function(req,file,cb){
        cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
var upload = multer({
    storage: storage,
    fileFilter:function(req,file,cb){
        checkFileType(file,cb);
    }
}).single('postImage');
function checkFileType(file,cb){
    var filetypes=/jpeg|jpg|png|gif/;
    var extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    var mimetype = filetypes.test(file.mimetype);
    if(mimetype && extname){
        return cb(null,true);
    }else{
        cb('Error: images only')
    }
}
router.get('/createpost', function(req, res){

    if(req.cookies['username'] != null){
        if(req.cookies['type']=="member")
        {
            var username=req.cookies['username'];
            var userid=req.cookies['userid'];
            var data= {
                userdata: [username,userid],
                error: ''
            }
            res.render('post/createpost',data);
        }
        else{
            res.redirect('/admin');
        }
        
	}else{
		res.redirect('/login');
	}
});
router.post('/createpost',function(req,res){
    console.log(req.body);
    upload(req,res,(err) =>{
        if(err){
            var username=req.cookies['username'];
            var userid=req.cookies['userid'];
            var data= {
                userdata: [username,userid],
                error : err
            }
            res.render('post/createpost',data);
            console.log(err);
        }
        else{
            var imgpath;
            if(req.file==null)
            {
                imgpath="";
            }
            else{
                imgpath=req.file.filename;
            }
            var data = {
                userID  : req.cookies['userid'],
                desc    : req.body.postDesc,
                media   : imgpath,
                privacy : req.body.privacy
            }
            db.createPost(data,function(result){
                if(result){
                    res.redirect('/post/'+result.insertId);
                }
                else{
                    consol.log('error');
                }
            });
        }
    });
});
router.get('/:id',function(req,res){
    db.getPostbyID(req.params.id,function(result){
        console.log(result);
        var post ={
            poster : result.posterid,
            description : result.description,
            media : result.media
        }
    })
});
module.exports = router;