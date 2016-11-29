var express = require('express'),
http = require('http'),
path = require("path"),
request = require("request"),
cheerio = require("cheerio"),
urlencode = require('urlencode'),
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
app.use(function (req , res , next) {
	var options = {  
  	url: "http://www.leagueoflegends.co.kr/?m=news&cate=update",
  	encoding: null
	};
	request(options,function (error, response, data) {
		var $ = cheerio.load(data , { decodeEntities: false });
		var updateelement = $("div.section-wrapper > .section-wrapper-content > .section-wrapper-content-wrapper > .contents-wrap > .left-contents > .border-box > .contents-table > .request-list ").html();
		$ = cheerio.load(updateelement , { decodeEntities: false });
		var newdata = $("tbody").html();
		var readdata = "<table class='updatetable'><thead><th>최근 업데이트 내역</th><th>날짜</th><th>조회수</th></thead><tbody>"+newdata+"</tbody></table>";
		fs.writeFile('./resources/page/index/update.html', readdata, encoding='utf-8' ,function(err) {
			if(err) throw err;
		});
	});
	next();
});
app.get('*',function (req , res ) {
	res.sendfile(__dirname + '/index.html', function (html) {
		if (html) {
			res.send(html);
			res.end();
		}
	});
});