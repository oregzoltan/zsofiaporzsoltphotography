'use strict';

var newApp = require('./backend/server');
// var connect = require('./backend/connect');

var app = newApp();

app.listen(process.env.PORT || 3000);
