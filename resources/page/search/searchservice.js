myApp.factory('SearchResource',function($resource,TrollRestUrl){
	return $resource(TrollRestUrl+"user/:summonerName", {summonerName:"@summonerName"},{
		get:{method:"GET"}
	});
});
myApp.factory('itemResource',function($resource){
	return $resource("http://ddragon.leagueoflegends.com/cdn/6.23.1/data/ko_KR/item.json", {},{
		get:{method:"GET"}
	});
});
myApp.factory('recentchampResource',function($resource, TrollRestUrl){
	return $resource(TrollRestUrl+"recentchamp/:summonerId", {summonerId:"@summonerId"},{
		get:{method:"GET"}
	});
});
myApp.factory('MasteryResource',function($resource){
   return $resource("http://ddragon.leagueoflegends.com/cdn/6.22.1/data/ko_KR/mastery.json", {},{
      get:{method:"GET"}
   });
});  
myApp.factory('SpellResource',function($resource){
	return $resource("http://ddragon.leagueoflegends.com/cdn/6.23.1/data/ko_KR/summoner.json", {},{
		get:{method:"GET"}
	});
});
myApp.factory('summoner', function(){
	var searchdata={};
	var itemdata = {};
	var spelldata = {};
	return {
		get:function(){
			return searchdata;
		},
		set:function(data){
			for (var member in searchdata) delete searchdata[member];
				angular.extend(searchdata,data);
		},
		champscore:function (champarray,leaguedata,$scope) {
			var mostarray = champarray;
			var randomcolor = 'rgba('+(Math.random() * 254).toFixed(0)+','+(Math.random() * 254).toFixed(0)+','+(Math.random() * 254).toFixed(0)+',1)';
			var jumsu = [];
			var scoreavg = 0;
			var kdaavg = 0;
			for (var i = 0; i < mostarray.length; i++) {
				if (mostarray[i].deaths === 0) {
					mostarray[i].deaths = 1
				}
				if(mostarray[i].avgwinlate === 0){
					mostarray[i].avgwinlate = 50;
				}
				var fick = Math.round((100 / (leaguedata.entrylist[0].wins + leaguedata.entrylist[0].losses) * mostarray[i].played));
				var kda = (mostarray[i].kills + mostarray[i].assists) /  mostarray[i].deaths;
				var winlatescore = mostarray[i].winlate / mostarray[i].avgwinlate;
				var scoreobject = {index : mostarray[i],
					score:(winlatescore + (kda/ 2)).toFixed(2),
					kda : kda.toFixed(2),
					pickrank:i + 1,
					chartdata:[{label : mostarray[i].championNameK , value : fick , suffix: "%" , color : 'white' , colorComplement: "rgba(150,150,150,0)"}]}
					scoreavg += parseInt(scoreobject.score);
					kdaavg += kda;
					jumsu.push(scoreobject);
				}
				$scope.scoreavg = ((scoreavg / jumsu.length) * 2).toFixed(2);
				$scope.kdaavg = ((kdaavg / jumsu.length) * 2).toFixed(2);
				jumsu.sort(function (a,b) {
					return parseFloat(a.score) > parseFloat(b.score) ? -1 : parseFloat(a.score) < parseFloat(b.score) ? 1 : 0;
				});
				return jumsu;
			},
			getitem:function(){
				return itemdata;
			},
			setitem:function(data){
				for (var member in itemdata) delete itemdata[member];
					angular.extend(itemdata,data);
			},
			getspell:function(){
				return spelldata;
			},
			setspell:function(data){
				for (var member in spelldata) delete spelldata[member];
					angular.extend(spelldata,data);
			},
			addsummonerdata:function ($scope , summoner) {
				var totaldata = summoner.get();
				$scope.summonerdata = totaldata['summonerData'];
				$scope.leaguedata = totaldata['leagueData'];
				$scope.recentgame = totaldata['recentgamelist'];
				if (totaldata['most'].length > 0 && angular.isObject(totaldata['leagueData'])) {
					$scope.mostchamplist = summoner.champscore(totaldata['most'],totaldata['leagueData'],$scope);
				}
				if (angular.isObject(totaldata['leagueData'])){
					if (totaldata['leagueData'].entrylist[0].division === 'I') {
						$scope.tierurl = totaldata['leagueData'].tier.toLowerCase();
					}else{
						$scope.tierurl = totaldata['leagueData'].tier.toLowerCase() +'_'+totaldata['leagueData'].entrylist[0].division.toLowerCase();
					}
				}else{
					$scope.tierurl = "unRanked";
				}
			},
	};
});


