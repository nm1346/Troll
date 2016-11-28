//서버 상태에 대한 resource 요청
myApp.factory('ShardResource', function($resource){
	return $resource('http://status.leagueoflegends.com/shards/kr',{},{
		get:{method:"GET",isArray:false}
	});
});
//ajax요청하기위한 RestApi model서버 url
myApp.constant('TrollRestUrl', "http://localhost:8080/");

//현재 게임 요청에대한 Ajax resource
myApp.factory('CurrentGameResource',function($resource,TrollRestUrl){
    return $resource(TrollRestUrl+"currentGame/:summonerName2", {summonerName2:"@summonerName2"},{
        get:{method:"GET",isArray:false}
    });
});

//Challenger요청에대한 resource
myApp.factory('ChallengerResource',function($resource,TrollRestUrl){
    return $resource(TrollRestUrl+"challenger",{},{
        get:{method:"GET",isArray:false}
    });
});

