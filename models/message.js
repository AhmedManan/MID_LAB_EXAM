var mysql   = require('mysql');
var db      = require('./dbconnection');


module.exports = {
    getConv: function(from, to, callback){
        var sql = "SELECT * from message WHERE 1 AND (senderid = '"+from+"' OR senderid = '"+to+"') AND (receiverid = '"+from+"' OR receiverid = '"+to+"') ORDER BY time;";
        db.getResults(sql, function (results){
            callback(results);
        });
    },

    postMsg: function(from, to, msg, callback){
        var sql = "INSERT INTO `message`(`senderid`, `receiverid`, `description`, `seen`) VALUES ('"+from+"', '"+to+"', '"+msg+"', 0);";
        db.execute(sql, function(success){
            callback(success);
        });
    },

    seenConv: function(from, to, callback){
        var sql = "UPDATE message SET seen = 1 WHERE receiverid = '"+from+"' AND senderid = '"+to+"';";
        db.execute(sql, function(success){
            callback(success);
        });
    },

    getListLastMsg: function(from, callback){
        var sql = "SELECT x.id, x.receiverid, x.senderid, x.description, IF(x.senderid = '"+from+"', x.receiverid, x.senderid) as recipient, x.time, IF(x.seen = '0' AND senderid != '"+from+"', 'unseen', 'seen') as seen FROM message x INNER JOIN (SELECT IF(senderid = '"+from+"', receiverid, senderid) as recipient, MAX(time) AS time FROM message GROUP BY recipient) y ON IF(x.senderid = '"+from+"', x.receiverid, x.senderid) = y.recipient AND x.time = y.time;";
        db.getResults(sql, function(results){
            callback(results);
        });
    },
}