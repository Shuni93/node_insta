var express = require('express');
var session = require('express-session');
var mysql = require('mysql');
var router = express.Router();
var connection = mysql.createConnection({
     host : 'localhost',
     user : 'root',
     password : 'tlgnsqkqh1',
     database : 'example'
});
connection.connect();

router.get('/',function(req, res, next){
     if(req.session.user_id !== undefined){
          var user_id = req.session.user_id;
          var sql = 'SELECT post.post_title,post.video_id, post.text, user.user_id, post.video_thumbnail  FROM post, user WHERE post.user_id = user.id AND post.user_id = ?' ;
          connection.query(sql, [user_id], function(err, rows){
               if(err){
                    console.log(err);
               }else{
                    console.log(rows);
                    res.render ( 'mypage', { post : rows, username: req.session.user_id});
               }
          });
     }
     else{
          res.redirect('/');
     }
});
module.exports = router;
