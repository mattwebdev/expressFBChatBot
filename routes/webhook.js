/**
 * Created by mattheinke on 5/18/16.
 */
var express = require('express');
var request = require('request');
var bot_conversation = require('./bot/bot_convo');
var ball = require('./eight_ball/answers');
String.prototype.contains = function(it) { return this.indexOf(it) != -1; };

var token = "EAANmPlYMFUQBAF3BJYy6iZAvZCoJAS8vzXAIvVZAt9c8OnGbioZAKfc6ZA5QStVjoUHLIbytGwRHcLXfnStk7r1vW5RYMNh9XHEyZASqKp09nE4HTV419V7SuSKK39OZA9ZAJFSwOCjQ213kQCewZBwaLDLAzbA8CV6vB6b08ZAvUWyAZDZD";
var challengeID = 'hathway8ballapp_is_awesome';
var app = express();