var express = require('express');
var app     = express();
 
app.get('/', express.static(__dirname+'/'));
app.use('/css', express.static(__dirname+'/css'));
app.use('/js', express.static(__dirname+'/js'));
app.use('/sfx', express.static(__dirname+'/sfx'));
 
app.set('port', process.env.OPENSHIFT_NODEJS_PORT || 3000);
app.listen(app.get('port'), process.env.OPENSHIFT_NODEJS_IP);