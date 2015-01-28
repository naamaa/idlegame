#!/bin/env node
//  OpenShift sample Node application
var express = require('express');
var fs      = require('fs');
var app     = express();

app.use('/css', express.static(__dirname+'/css'));
