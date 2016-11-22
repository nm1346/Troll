myApp.factory('matchResource',function($resource,TrollRestUrl){
    return $resource(TrollRestUrl+"match/:matchId", {matchId:"@matchId"},{
        get:{method:"GET"}
    });
});
myApp.factory('matchData', function(){
	var matchdata={};
	var summonerdata={};
	return {
		getmatch:function(){
			return matchdata;
		},
		setmatch:function(data){
			for (var member in matchdata) delete matchdata[member];
			angular.extend(matchdata,data);
		},
		getsummoner:function(){
			return summonerdata;
		},
		setsummoner:function(data){
			for (var member in summonerdata) delete summonerdata[member];
			angular.extend(summonerdata,data);
		}
	};
})