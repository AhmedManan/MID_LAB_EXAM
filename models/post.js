var mysql   = require('mysql');
var db      = require('./dbconnection');

module.exports = {
    createPost: function(info,callback){
        var sql="INSERT INTO `post`(`posterid`, `description`, `media`, `privacy`) VALUES ('"+info.userID+"','"+info.desc+"','"+ info.media+"','"+info.privacy+"')";
        db.execute(sql,function(result){
            callback(result);
        });
    },
    getPost: function(from, callback){
        var sql = "SELECT * from post WHERE 1 AND posterid = '"+from+"' ORDER BY time;";
        db.getResults(sql, function (results){
            callback(results);
        });
    },
    getPostbyID: function(id, callback){
        var sql = "SELECT * from post WHERE id ="+id+"";
        db.getResults(sql, function (results){
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
    }
}

