var express 	= require('express');
var exSession 	= require('express-session');
var bodyParser 	= require('body-parser');
var mysql       = require('mysql');
var async       = require('async');

//DB
var db = require.main.require('./models/dbconnection');
var page = require.main.require('./models/page');
var post = require.main.require('./models/post');
var comment = require.main.require('./models/comment');


var router = express.Router();


//root
router.get('/:id', function(req, res){
    var from = req.cookies['userid'];
    var id = req.params.id;

    page.getPostList(id, function(final){
        
        var username=req.cookies['username'];
        var userid=req.cookies['userid'];

        var loopCounter = 0;
        var final;
        
        async.each(final, function(row, callback){
    
            post.getPoster(row.posterid,function (results2){
                
                row.poster = results2[0].username;
                //console.log('Callpost');
                //console.log(row);
                comment.getComList(row.id,function (results3){
                    
                    row.comments = results3;
                    //console.log(results3);
                    //console.log(row.comments);
                    //console.log('+++++++++++++++++++++++++');
                    //callback();
                    //callback();
                    row.commentCount = 0;
                    var loopCounter2 = 0;
                    async.each(row.comments,function(comment1, callback2){
                        //console.log(comment1);
                        if(comment1){
                            //console.log(row);
                            
                            //console.log(row.comments);
                            row.commentCount += 1;
                            comment.getPoster(comment1.posterid,function(results4){
                                //console.log(results);
                                comment1.poster = results4[0].username;
                                
                                console.log(comment1.id);

                                
                                //console                                .log('iteration: '+loopCounter+' iteration: '+loopCounter2+';');
                                //console.log('Callcommnet');
                                //console.log(array.length+''+array2.length);
                                /* if (loopCounter === (array.length*array2.length)) {
                                    //console.log(results);
                                    //console.log(row.comments);
                                    //console.log('final iteration!');
                                    
                                } */

                            });
                        }
                        callback2(); 
                        
                        
                        loopCounter2 +=1;
                        
                    });
                    callback(); 
                });
            });
            loopCounter +=1;
            
        });

        setTimeout(function (){
            console.log("FINAL:");
            console.log(final);
    
            res.render('page/page.ejs',{userdata: [username,userid], posts: final});
        }, 500);
        
    });

    
        //console.log(results);
            
});
    
    
    //console.log(results);
    //res.render('page/page.ejs',{userdata: [username,userid], posts: results});
module.exports = router;