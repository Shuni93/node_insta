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
connection.query(sql, function(err, rows, fields){
     if(err){
          console.log(err);
     }else{
          //console.log('rows', rows);
          //console.log('fields', fields);
     }
});
connection.end();
/* GET home page. */
router.get('/', function(req, res, next) {
     if(req.session.user_id == undefined){
          res.render('login', { title: 'Login' });
     } else {
          res.redirect('/feed');
     }
});
module.exports = router;
