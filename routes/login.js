var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var connection = mysql.createConnection({
     host : 'localhost',
     user : 'root',
     password : 'tlgnsqkqh1',
     database : 'example'
});
connection.connect();
var sql = 'SELECT * FROM user';
router.get('/', function(req, res, next) {
     if(req.session.user_id == undefined){
          res.render('login', { title: 'Login' });
     } else {
          res.redirect('/feed');
     }
});
router.post('/', function(req, res, next){
     var user_id = req.body.id;
     var password = req.body.password;
     var sql = 'SELECT user_id FROM user WHERE name =?'
     var sql = 'SELECT id  FROM user WHERE user_id=? AND password=?';
     connection.query(sql, [user_id, password], function(err, rows){
          if(err){
               console.log(err);
          }else{
               var cnt = rows.length;
               if(cnt ==1){
                    //console.log(user_id);
                    req.session.user_id = rows[0].id;
                    res.redirect('/feed');
               }
          }
     });
});
router.post('/signup', function(req, res, next) {
     var name = req.body.username;
     var user_id = req.body.id;
     var password = req.body.password;
     var sql = 'INSERT INTO user (name, user_id, password) VALUES(?, ? ,?)';
     connection.query(sql, [name, user_id, password], function(err, rows, fields){
          if(err){
               console.log(err);
          }else{
               req.session.user_id = rows.insertId;
               res.redirect('/feed');
               //res.send(rows);
          }
     });
});
module.exports = router;
