var express = require('express');
var fs      = require('fs');
var app     = express();
 
app.get('/', express.static(__dirname+'/'));
app.use('/css', express.static(__dirname+'/css'));
app.use('/js', express.static(__dirname+'/js'));
 
app.listen(process.env.OPENSHIFT_NODEJS_PORT, process.env.OPENSHIFT_NODEJS_IP);