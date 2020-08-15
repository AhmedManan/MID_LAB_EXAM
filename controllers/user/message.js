var express 	= require('express');
var exSession 	= require('express-session');
var bodyParser 	= require('body-parser');
var mysql       = require('mysql');

//DB
var db = require.main.require('./models/dbconnection');
var message = require.main.require('./models/message');


var router = express.Router();


//root
router.get('/:id', function(req, res){
    var from = req.cookies['userid'];
    var to = req.params.id;

    message.getListLastMsg(from, function(list){
        message.getConv(from,to,function (rows) {
            rows.forEach(row => {
                 
                if(row.senderid == from){
                    row.msgAlign = 'left';
                }
                else{
                    row.msgAlign = 'right';
                }            
            });            
            res.render('message/message',{data:{rows:rows, list:list, to:to}});
        });

    });

    
    
    
});

//postMSG
router.post('/:id/postMsg', function(req, res){
    var from = req.cookies['userid'];
    var to = req.params.id;
    var msg = req.body.msg;

    message.postMsg(from, to, msg, function(){});
});

//seenConv
router.post('/:id/seenConv', function(req, res){
    from = req.cookies['username'];
    to = req.params.id;

    message.seenConv(from, to, function(){});
    
});

//msgUpdate
router.post('/:id/msgUpdate', function(req, res){
    var from = req.cookies['userid'];
    var to = req.params.id;

    var rowsold = JSON.parse(req.body.rows);

    //var sql = "SELECT * from message ORDER BY time";
    //db.getResults('SELECT * from message ORDER BY time', function(rows){

    message.getConv(from,to,function (rows) {
    rows.forEach(row => {
        if(row.senderid == from){
            row.msgAlign = 'left';
        }
        else{
            row.msgAlign = 'right';
        }            
    });

    if(JSON.stringify(rows) == JSON.stringify(rowsold)){
        resp = 'unchanged';
    }else{
        resp = 'changed';
    }

    res.send({resp : resp, newrows : rows});
    });
});

//listUpdate
router.post('/:id/listUpdate', function(req, res){
    var from = req.cookies['userid'];

    var listold = JSON.parse(req.body.list);

    message.getListLastMsg(from,function (list) {

        if(JSON.stringify(list) == JSON.stringify(listold)){
            resp = 'unchanged';
        }else{
            resp = 'changed';
        }

        res.send({resp : resp, newlist : list});
    });
});

module.exports = router;