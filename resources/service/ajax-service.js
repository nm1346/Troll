//ajax처리 관련 service
myApp.constant('TrollRestUrl', "http://localhost:8080/");

myApp.factory('SearchResource',function($resource,TrollRestUrl){
    return $resource(TrollRestUrl+":summonerName", {summonerName:"@summonerName"},{
        get:{method:"GET",isArray:true}
    });
});
myApp.factory('StaticLocaleResource',function($resource,TrollRestUrl){
	return $resource(TrollRestUrl+"static/locale/:locale/:category/:id",{locale:"@locale",category:"@category",id:"@id"},{
		get:{method:"GET",isArray:false}
	});
});
