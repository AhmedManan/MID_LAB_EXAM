var mysql = require('mysql');
var db = require('./dbconnection');
var express = require('express');


module.exports = {

    getReport: function(callback){
        var sql="select * from report";
        db.getResults(sql,function(result){
            if(result.length>0){
                callback(result)
            }
            else{
                callback([])
            }
        })
    },

    viewPost: function(id,callback){
        console.log(id);
        var sql="select * from post where id='"+id+"' ";
      
        db.getResults(sql,function(result){
            if(result.length>0){
                console.log(result)
                callback(result)
            }
            else{
                callback([])
            }
        })

    },

    //working on 
    viewProfile: function(id,callback){
        console.log(id);
        var sql="select * from personal_info where id='"+id+"' ";
      
        db.getResults(sql,function(result){
            if(result.length>0){
                console.log(result)
                callback(result)
            }
            else{
                callback([])
            }
        })

    },

    deletePost: function(id,callback){

        var sql="delete from post where id='"+id+"'";
        db.execute(sql, function (status) {
            callback(status);
        });

    },

    increaseStrike: function(id,callback){
        var sql="update login_cred set strike=strike+1 where id='"+id+"'";
        db.execute(sql, function (status) {
            callback(status);
        });
    },


    getUsers: function(callback){
        var sql="select * from login_cred";
        db.getResults(sql,function(result){
            if(result.length>0){
                callback(result)
            }
            else{
                callback([])
            }
        })
    },

    ViewUsers: function(callback){
        var sql="select * from login_cred";
        db.getResults(sql,function(result){
            if(result.length>0){
                callback(result)
            }
            else{
                callback([])
            }
        })
    },
    
    deleteAccount:function(id,callback){ //inner join used to delete from multiple table...
        var sql="delete login_cred,personal_info from login_cred inner join personal_info on personal_info.id=login_cred.id where login_cred.id='"+id+"'";

        db.execute(sql,function(status){
            callback(status);
        });
    },

    sendNotice:function(value,callback){
        
        var today = new Date().toISOString().slice(0, 10)

         console.log(today)
        var sql = "insert into post values('','" + value.id + "', '"+value.notice+"' , '','public', '"+today+"' )";
        db.execute(sql, function (status) {
           
                callback(status);
    
        });
    },

    updateProfile: function(value,callback){
        var sql="update personal_info set school='"+value.school+"',college='"+value.college+"',university='"+value.university+"',phone='"+value.phone+"',dob='"+value.dob+"' where id='"+value.id+"' ";
   
        db.execute(sql, function (status) {
           
            callback(status);

    });


    }


}