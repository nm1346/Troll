//ajax처리 관련 service
myApp.constant('TrollRestUrl', "http://localhost:8080/");

myApp.factory('SearchResource',function($resource,TrollRestUrl){
    return $resource(TrollRestUrl+"/:summonerName", {summonerName:"@summonerName"},{
        get:{method:"GET",isArray:true}
    });
});
