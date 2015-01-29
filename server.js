#!/bin/env node
//  OpenShift sample Node application
var express = require('express');
var fs      = require('fs');
var app     = express();

app.use('/', express.static(__dirname +'/index.html'));
app.get('/', function(req,res){
    res.render('index.html', function(err,html) {
        res.send(html); });
    });
app.listen(process.env.OPENSHIFT_NODEJS_PORT, process.env.OPENSHIFT_NODEJS_IP);
