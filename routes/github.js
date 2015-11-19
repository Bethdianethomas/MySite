var express = require('express');
var bodyParser = require('body-parser');
var axios = require('axios');

var url = "https://api.github.com/users/bethdianethomas/events";

fetchGithubEvents = function(req, res){
	console.log('going inside')
	axios.get(url)
	  .then(function (response) {
	  	var myEvents = response.data.map(function(g){
	  		return{
	  			"id": g.id,
				"type": g.type,
				"repo": g.repo.name,
				"timestamp": g.created_at}
	  		}
	  	);
	  	res.json(myEvents);
	  })
	  .catch(function (response) {
	    console.log(response);
	  });
}

module.exports = fetchGithubEvents;