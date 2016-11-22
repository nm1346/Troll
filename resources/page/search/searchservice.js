myApp.factory('SearchResource',function($resource,TrollRestUrl){
    return $resource(TrollRestUrl+"user/:summonerName", {summonerName:"@summonerName"},{
        get:{method:"GET"}
    });
});
myApp.factory('summoner', function(){
	var searchdata={};
	return {
		get:function(){
			return searchdata;
		},
		set:function(data){
			for (var member in searchdata) delete searchdata[member];
			angular.extend(searchdata,data);
		},
		champscore:function (champarray) {
		 			var mostarray = champarray;
		 			var jumsu = [];
		 			for (var i = 0; i < mostarray.length; i++) {
		 				if (mostarray[i].deaths === 0) {
		 					mostarray[i].deaths = 1
		 				}
		 				if(mostarray[i].avgwinlate === 0){
		 					mostarray[i].avgwinlate = 50;
		 				}
		 				var kda = (mostarray[i].kills + mostarray[i].assists) /  mostarray[i].deaths;
		 				var winlatescore = mostarray[i].winlate / mostarray[i].avgwinlate;
		 				var scoreobject = {index : mostarray[i],
		 					score:(winlatescore + (kda/ 2)).toFixed(2),
		 					kda : kda.toFixed(2)}
		 					jumsu.push(scoreobject);
		 				}
		 				console.log(jumsu);
		 				jumsu.sort(function (a,b) {
		 					return parseFloat(a.score) > parseFloat(b.score) ? -1 : parseFloat(a.score) < parseFloat(b.score) ? 1 : 0;
		 				});
		 		return jumsu;
		 }
	};
})