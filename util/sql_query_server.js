var mysql = require('mysql');
var http = require('http');
var querystring = require('querystring');
var url = require('url');

var test = [
    //slide 1 - 7.11.2012
    {
        slide_title: "Slide1",
        slide_subheading: "sub slide 1",
        content: "bla bla bla",
        timestamp: 1352242800
    },
    //slide 2 - 2012-12-20 00:00
    {
        slide_title: "Slide 2",
        slide_subheading: "sub slide 1",
        content: "na na na ",
        timestamp: 1355958000
    },
    //slide 3 - 30.11.1012 16:00
    {
        slide_title: "Slide 3",
        slide_subheading: "sub slide 1",
        content: "na na na ",
        timestamp: 1356634800
    },
    //slide 4 - 2013-01-25 00:00
    {
        slide_title: "Slide 4",
        slide_subheading: "sub slide 1",
        content: "na na na ",
        timestamp: 1359068400
    }
    ];

var conn = mysql.createConnection({
    host: 'sql.evo.pl',
    user: 'backbone.sql',
    password: 'p5rTGMNK3eez5EX5',
    database: 'backbone'
});
conn.connect();

function readPresentations(callback) {
    var rows = conn.query('select p.*,u.* from presentations p inner join users u on (p.leader=u.uid)', function(err, rows, fields) {
                   if(err) {
                       throw err;
                   }
                   // console.log({'rows': rows});
                   callback(rows);
               });
}

function writePresentations(data) {

}

http.createServer(function(req,res) {
    var params = querystring.parse(url.parse(req.url).query);
    if(params['direction'] == 'out' && !params['query']) {
        res.writeHead(200, {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        });
        console.log(querystring.parse(url.parse(req.url).query));
        readPresentations(function(data) {res.end(JSON.stringify(data));});
    }
    else if(params['direction'] == 'in' && !params['query']) {
        var data = JSON.parse(params['data']);
        res.writeHead(200, {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        });
        console.log(data);
        // readPresentations(function(data) {res.end(JSON.stringify(data));});
        res.end();
    }
    else if(params['query']) {
        
    }
}).listen(6666);
// conn.end();
