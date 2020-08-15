var mysql = require('mysql');
var db = require('./dbconnection');
var post = require('./post');


module.exports = {
    getComList: function(post, callback){
        sql = "SELECT * FROM `comment` WHERE post like '"+post+"'";
        db.execute(sql,function(results){
            callback(results);
        });
    },

    getPoster: function(from, callback){
        if(from){
            if(from.startsWith('p')){
                var sql = "SELECT * from page WHERE 1 AND pageid = '"+from+"';";
                db.getResults(sql, function (results){
                    callback(results);
                });
            }
            else {
                var sql = "SELECT * from personal_info WHERE 1 AND id = '"+from+"';";
                db.getResults(sql, function (results){
                    callback(results);
                });
            }
        }
    },

}