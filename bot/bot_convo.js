/**
 * Created by mattheinke on 5/18/16.
 */
var express = require('express');
var request = require('request');

var app = express();
var token = "EAANmPlYMFUQBAF3BJYy6iZAvZCoJAS8vzXAIvVZAt9c8OnGbioZAKfc6ZA5QStVjoUHLIbytGwRHcLXfnStk7r1vW5RYMNh9XHEyZASqKp09nE4HTV419V7SuSKK39OZA9ZAJFSwOCjQ213kQCewZBwaLDLAzbA8CV6vB6b08ZAvUWyAZDZD";

module.exports = {
    sendMessage : function(sender, text) {
        messageData = {
            text:text
        };
        request({
            url: 'https://graph.facebook.com/v2.6/me/messages',
            qs: {access_token:token},
            method: 'POST',
            json: {
                recipient: {id:sender},
                message: messageData,
            }
        }, function(error, response, body) {
            if (error) {
                console.log('Error sending message: ', error);
            } else if (response.body.error) {
                console.log('Error: ', response.body.error);
            }
        });
    },
    
    sendCards : function(sender) {
        var messageData = {
            "attachment": {
                "type": "template",
                "payload": {
                    "template_type": "generic",
                    "elements": [{
                        "title": "First card",
                        "subtitle": "Element #1 of an hscroll",
                        "image_url": "http://messengerdemo.parseapp.com/img/rift.png",
                        "buttons": [{
                            "type": "web_url",
                            "url": "https://www.messenger.com/",
                            "title": "Web url"
                        }, {
                            "type": "postback",
                            "title": "Postback",
                            "payload": "WHY YOU TOUCHING MY BUTTONS!?",
                        }],
                    },{
                        "title": "Second card",
                        "subtitle": "Element #2 of an hscroll",
                        "image_url": "http://messengerdemo.parseapp.com/img/gearvr.png",
                        "buttons": [{
                            "type": "postback",
                            "title": "Postback",
                            "payload": "Payload for second element in a generic bubble",
                        }],
                    }]
                }
            }
        };
        request({
            url: 'https://graph.facebook.com/v2.6/me/messages',
            qs: {access_token:token},
            method: 'POST',
            json: {
                recipient: {id:sender},
                message: messageData,
            }
        }, function(error, response, body) {
            if (error) {
                console.log('Error sending message: ', error);
            } else if (response.body.error) {
                console.log('Error: ', response.body.error);
            }
        });
    }
};