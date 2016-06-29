// server.js
var express = require('express')
var path = require('path')
var compression = require('compression')
var webpackAssets = require('./webpack-assets.json');

var app = express()

// must be first!
app.use(compression())

// serve our static stuff like index.css
app.use(express.static(path.join(__dirname, 'dist/client/public')));
app.set('views', path.join(__dirname, 'src/server/views'));
app.set('view engine', 'pug');

// send all requests to index.html so browserHistory in React Router works
app.get('*', function (req, res) {
	res.render('index', webpackAssets);
})

var PORT = process.env.PORT || 3000

app.listen(PORT, function() {
  console.log('Production Express server running at localhost:' + PORT)
})