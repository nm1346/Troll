var express = require('express'),
http = require('http'),
path = require("path"),
/*request = require("request"),
cheerio = require("cheerio"),
urlencode = require('urlencode'),*/
fs = require('fs');
  
 
var app = express();
var server = http.createServer(app).listen(5000, function () {
	console.log('server on !');
	console.log(__dirname);
});
app.use('/resources' , express.static(__dirname + '/resources'));
/*app.use('/resources', function (req , res , next) {
   res.end();
})*/
/*app.use(function (req , res , next) {
	var options = {  
  	url: "http://www.leagueoflegends.co.kr/?m=news&cate=update",
  	encoding: null
	};
	request(options,function (error, response, data) {
		var $ = cheerio.load(data , { decodeEntities: false });
		var updateelement = $("div.section-wrapper > .section-wrapper-content > .section-wrapper-content-wrapper > .contents-wrap > .left-contents > .border-box > .contents-table > .request-list").find("tbody");
		updateelement = updateelement.html("<table class='striped'><thead><tr><th>제목</th><th>내용</th><th>조회수</th></tr></thead>"+updateelement.html()+"</table>");
		var utfdata = urlencode(updateelement);
		var kordata = urlencode.decode(utfdata);
		fs.writeFile('./resources/page/index/update.html', updateelement, encoding='utf-8' ,function(err) {
			if(err) throw err;
		});
	});
	next();
});*/
app.get('*',function (req , res ) {
	res.sendfile(__dirname + '/index.html', function (html) {
		if (html) {
			res.send(html);
			res.end();
		}
	});
});