var express = require('express');
var path = require('path');
var http = require('http');
var fs = require('fs');
var bodyParser = require('body-parser');
var db = require('./model/db');
var blogModel = require('./model/blog');
var blogRoutes = require('./routes/blog');
var githubRoutes = require('./routes/github');
var passport = require('passport');
var flash    = require('connect-flash');
var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

var app = express();

require('./config/passport')(passport); // pass passport for configuration
app.set('port', (process.env.PORT || 3000));

app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash());


app.use(express.static('public'));

require('./routes/userRoutes.js')(app, passport);
app.use('/api/blogs', blogRoutes);
app.use('/api/github', githubRoutes);

app.get('/', function(req, res){
    res.readFile('index.html');
});

app.listen(app.get('port'), function(){
	console.log('Node app is running on port', app.get('port'));
});


app.get('/blog', function(req, res) {
       res.render('blog.ejs');
   });






