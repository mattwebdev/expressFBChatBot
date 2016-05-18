/**
 * Required Libs
 */
var express = require('express');
var path = require('path');
var request = require('request');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var webhook = require('./routes/webhook');
/**
 * Bot Logic
 */
var bot_challenge = require('./bot/bot_challenge');
var bot_conversation = require('./bot/bot_convo');

/**
 * 8Ball Logic
 */
var ball = require('./eight_ball/answers');

/**
 * Start Express
 */
var app = express();

/**
 * logger and body parser setup
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

/**
 * index route
 */
app.use('/', routes);

/**
 * Facebook issues a challenge to the bot connection to determine authentication.
 */
bot_challenge.challenge('hathway8ballapp_is_awesome');

/**
 * where we handle incomming connections to /webhook
 */
app.post('/webhook', function (req, res) {
    /**
     * this is not the right place to do this...BUT it works for now....
     */
    String.prototype.contains = function(it) { return this.indexOf(it) != -1; };

    var messaging_events = req.body.entry[0].messaging;
    for (i = 0; i < messaging_events.length; i++) {
        var event = req.body.entry[0].messaging[i];
        var sender = event.sender.id;
        if (event.message && event.message.text) {
            var text = event.message.text;

            /**
             * Standard 8 ball logic
             */
            if (text.contains('?')) {
                var answer = ball.getAnswers();
                bot_conversation.sendMessage(sender,answer);
                
            } else if(!text.contains('?') && text != 'Generic') {
                bot_conversation.sendMessage(sender,"Is that even a question?");
            }

            /**
             * Testing the card feature
             */
            if (text === 'Generic') {
                bot_conversation.sendCards(sender);
            }
        }

        /**
         * postback button event on the card feature
         */
        if (event.postback) {
            var text = JSON.stringify(event.postback);
            bot_conversation.sendMessage(sender, text.substring(0, 200), token);
        }
    }
    res.sendStatus(200);
});

// Make Express listen for requests on port 3000
app.listen(3000);

module.exports = app;
