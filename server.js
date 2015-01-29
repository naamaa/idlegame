#!/bin/env node
//  OpenShift sample Node application
var express = require('express');
var fs      = require('fs');
var app     = express();

app.get('/', express.static(__dirname +'/index.html'));
app.get('/', function(req,res){
    res.render('index.html', function(err,html) {
        res.send(html); });
    });
app.listen(process.env.OPENSHIFT_NODEJS_PORT, process.env.OPENSHIFT_NODEJS_IP);
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
