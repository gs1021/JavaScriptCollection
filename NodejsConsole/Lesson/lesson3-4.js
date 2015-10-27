var express = require('express');
var superagent = require('superagent');
var cheerio = require('cheerio');
var url = require('url');
var eventproxy = require('eventproxy');

var app = express();
var u = 'https://cnodejs.org/';
var ep = new eventproxy();

app.get('/', function (req, res, next) {
    superagent.get(u).end(function (err, sres) {
        if (err) {
            return next(err);
        }
        
        var $ = cheerio.load(sres.text);
        var item = [];
        var topicUrls = [];
        
        $('#topic_list .cell').each(function (idx, element) {
            var $element = $(element);
            var data = {
                user_avatar: url.resolve(u, $element.children('.user_avatar').attr('href')),
                user_avatar_src: $element.children('.user_avatar').children('img').attr('src'),
                count_of_replies: $element.children('.reply_count').children('.count_of_replies').text(),
                count_of_visits: $element.children('.reply_count').children('.count_of_visits').text(),
                last_active_time : $element.children('.last_time').children('.last_active_time').text(),
                topic_title_url: url.resolve(u, $element.children('.topic_title_wrapper').children('.topic_title').attr('href')),
                topic_title: $element.children('.topic_title_wrapper').children('.topic_title').attr('title')
            };
            item.push(data);
            topicUrls.push(data.topic_title_url);
        });
        
        ep.after("topic_html", topicUrls.length, function (topic) {
            topic = topic.map(function (pair) {
                var topicUrl = pair[0];
                var topicHtml = pair[1];
                var $t = cheerio.load(topicHtml);
                return ({
                    title: $t('.topic_full_title').text().trim(),
                    href: topicUrl,
                    comment1: $t('.reply_content').eq(0).text().trim(),
                });
            });
            
            console.log('final:');
            console.log(topic);
        });
        
        topicUrls.forEach(function (topicUrl) {
            superagent.get(topicUrl).end(function (err, res) {
                console.log('fetch ' + topicUrl + ' successful');
                ep.emit('topic_html', [topicUrl, res.text]);
            })
        });
        
        
        res.send(item);
    })
});

app.listen(3000, function (req, res) {
    console.log('app is running at port 3000');
})