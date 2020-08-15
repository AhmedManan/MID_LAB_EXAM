var mysql = require('mysql');
var db = require('./dbconnection');
var post = require('./post');
var comment = require('./comment');
var user = require('./user');



module.exports = {
    
    getUID: function(from, callback){
        var sql = "SELECT * FROM `personal_info` WHERE 1 AND username like '"+from+"';";
        //console.log(sql);
        db.getResults(sql, function (results){
            //console.log(results);
            callback(results);
        });
    },

    getPostList: function(uname, callback){
        this.getUID(uname, function (uid){
            //console.log(uid);
            post.getPost(uid[0].id,function(results){
                callback(results);
            });
        });
    },

    getUser: function(id, callback){
        var sql = ("SELECT * FROM `personal_info` WHERE 1 AND id like '"+id+"';");
        db.getResults(sql, function(results){
            callback(results);
        });
    },

    getComList: function (post, callback){
        comment.getComList(post,function(results){
            callback(results);
        });
    }
}