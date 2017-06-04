var express = require('express');
var router = express.Router();
var request = require('request');
var mysql = require('mysql');
var connection = mysql.createConnection({
     host : 'localhost',
     user : 'root',
     password : 'tlgnsqkqh1',
     database : 'example'
});
connection.connect();
/* GET home page. */
router.get('/', function(req, res, next) {
     if (req.session.user_id !== undefined){
          res.render('search', { username: req.session.user_id });
     } else {
          res.redirect('/');
     }
});
router.post('/',function(req,res,next){
     var API_KEY = 'AIzaSyCtqRTitDEhKk33wuROPK7zw5tW9zTuFHs';
     var youtubeURL = '/youtube/v3/search?part=snippet&key=';
     var hostURL = 'https://www.googleapis.com';
     var search = req.body.searchInput;
     //var search  = "love";
     var requestURL = hostURL + youtubeURL + API_KEY+ "&q="+ encodeURIComponent(search) + "&id=10" + "&type=video&maxResults=10";
     request(requestURL,function(error,response,body){
          //console.log(body);
          //var result = JSON.parse(body);
          //res.render('search', {result:result});
          //console.log(body);
          //console.log(result.items[0]);
          res.end(body);
     });
});
router.post('/post',function(req,res,next){
     var post_title = req.body.post_title;
     var text = req.body.text;
     var video_id = req.body.search;
     var video_thumbnail =req.body.video_thumbnail;
     var user_id = req.session.user_id;
     //console.log(video_thumbnail);
     var sql = 'INSERT INTO post (post_title, text, video_id,video_thumbnail, user_id ) VALUES(?, ? ,?, ?, ?)';
     connection.query(sql, [post_title, text, video_id, video_thumbnail, user_id], function(err, rows, fields){
          if(err){
               console.log(err);
          }else{
               res.redirect('/mypage');
               //res.send(rows);
          }
     });
});
module.exports = router;
