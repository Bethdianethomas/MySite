var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }))

var validBlogs = [];

function filterByTitle(obj) {
 if ('title' in obj && typeof(obj.title) === 'string') {
   validBlogs.push(obj);
   return true;
 } else {
   return false;
 }
};

router.route('/')

/* GET All Blogs */
 .get(function(req, res) {
   mongoose.model('Blog').find({}, function(err, blogs){
     if(err){
       return console.log(err);
     } else {
       var arrByTitle = blogs.filter(filterByTitle);
       res.json(arrByTitle);
     }
   });
 })

 .post(function(req, res){
   var title = req.body.title;
   var body = req.body.body;

   mongoose.model('Blog').create({
     title: title,
     body: body
   }, function(err, blog){
     if(err){
       res.send("houston we have a problem")
     } else{
       console.log("New blog named " + blog + "created!");
       res.send(blog);
     }
   });
 });


 router.route('/:id')
   .get(function(req, res) {
       mongoose.model('Blog').findById({
           _id: req.params.id
       }, function(err, blog) {
           if (err)
               res.send(err);

           res.json(blog);
       });
   })

   // update the bear with this id (accessed at PUT http://localhost:8080/api/bears/:id)
.put(function(req, res) {

       mongoose.model('Blog').findById({
           _id: req.params.id
       }, function(err, blog) {
         blog.title = req.body.title;
         blog.body = req.body.body;
           if (err)
               res.send(err);

           blog.save();
           res.json(blog)
       });
   })

   // delete the bear with this id (accessed at DELETE http://localhost:8080/api/blogs/:id)
   .delete(function(req, res) {
       mongoose.model('Blog').remove({
           _id: req.params.id
       }, function(err, blog) {
           if (err)
               res.send(err);

           res.json({ message: 'Successfully deleted' });
       });
   });

module.exports = router;