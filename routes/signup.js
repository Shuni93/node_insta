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
router.get('/', function(req, res, next) {
     res.render('signup', { title: 'Express' });
});
router.post('/',function(req,res,next){
     //var user_id = req.body
//     var sql = 'INSERT INTO user '
});

module.exports = router;
