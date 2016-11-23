myApp.factory('SearchResource',function($resource,TrollRestUrl){
	return $resource(TrollRestUrl+"user/:summonerName", {summonerName:"@summonerName"},{
		get:{method:"GET"}
	});
});
myApp.factory('itemResource',function($resource){
	return $resource("http://ddragon.leagueoflegends.com/cdn/6.22.1/data/ko_KR/item.json", {},{
		get:{method:"GET"}
	});
});
myApp.factory('recentchampResource',function($resource, TrollRestUrl){
	return $resource(TrollRestUrl+"recentchamp/:summonerId", {summonerId:"@summonerId"},{
		get:{method:"GET"}
	});
});
myApp.factory('SpellResource',function($resource){
	return $resource("http://ddragon.leagueoflegends.com/cdn/6.22.1/data/ko_KR/summoner.json", {},{
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
					kda : kda.toFixed(2),
					pickrank:i + 1}
					jumsu.push(scoreobject);
				}
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
				if (totaldata['most'].length > 0) {
					$scope.mostchamplist = summoner.champscore(totaldata['most']);
				}

				if (angular.isObject(totaldata['leagueData'])){
					if (totaldata['leagueData'].entrylist[0].division === 'I') {
						$scope.tierurl = totaldata['leagueData'].tier.toLowerCase();
					}else{
						$scope.tierurl = totaldata['leagueData'].tier.toLowerCase() +'_'+totaldata['leagueData'].entrylist[0].division.toLowerCase();
					}
				}else{
					$scope.tierurl = "unlanked";
				}
			},
	};
});

