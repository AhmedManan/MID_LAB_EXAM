var mysql = require('mysql');
var db = require('./dbconnection');
var post = require('./post');
var comment = require('./comment');


module.exports = {
    getPostList: function(from, callback){
        post.getPost(from,function(results){
            callback(results);
        });
    },

    getPage: function(id, callback){
        var sql = ("SELECT * FROM `page` WHERE 1 AND pageid like '"+id+"'");
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