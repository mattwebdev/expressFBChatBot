/**
 * Created by mattheinke on 5/18/16.
 */
var express = require('express');
var app = express();

module.exports = {
    challenge : function(token) {
        "use strict";
        app.get('/webhook', function (req, res) {
            if (req.query['hub.verify_token'] === token) {
                res.send(req.query['hub.challenge']);
            }
            res.send('Error, wrong validation token');
        });

    }
};