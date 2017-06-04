var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var connection = mysql.createConnection({
     host : 'localhost',
     user : 'root',
     password : 'tlgnsqkqh1',
     database : 'example'
});
var sql = 'SELECT * FROM post' ;
connection.connect();

/* GET home page. */
router.get('/', function(req, res, next) {
     if(req.session.user_id !== undefined){
          var sql = 'SELECT post.post_title,post.video_id, post.text, user.user_id FROM post, user WHERE post.user_id = user.id' ;
          connection.query (sql, function(err, rows){
               res.render ( 'feed', { post : rows, username: req.session.user_id});
          });
     }
     else{
          res.redirect('/');
     }
});

module.exports = router;
