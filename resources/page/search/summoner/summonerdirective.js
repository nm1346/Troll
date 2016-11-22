
myApp.directive('summonerData', function(matchResource,matchData,SearchResource,summoner,$routeParams,BoardData,BoardResource){
	return {
		 scope: {}, // {} = isolate, true = child, false/undefined = no change
		 controller: function($scope, $element, $attrs, $transclude) {
		 	/*$scope.$emit('searchPageStart',{});*/
		 	$scope.$emit("loadingOn",{});
		 	$scope.$emit('searchPageStart', {loading : true , error : false});
		 	SearchResource.get({summonerName : $routeParams.summonerName}).$promise.then(function (data) {
		 		if (Boolean(Number(data.success))){
		 			summoner.set(data);
		 			BoardResource.get({id:data.leagueData.id,board_category:"category"}).$promise.then(function(data){
						if(data.success){
							$scope.boardCategory=data;
					
						}
						$scope.$emit('searchPageSuccess', {loading : false , error : false});
						$scope.$emit("loadingOff",{});
					},function(error){
						$scope.$emit('searchPageSuccess', {loading : false , error : false});
						$scope.$emit("loadingOff",{});
					});
		 		}else{
		 			$scope.$emit('searchPageError', {errorCode : data.errorcode , errorMessage : data.errormsg});
		 			$scope.$emit("loadingOff",{});
		 		}
		 	},function (error) {
		 		console.log('에러',error);
		 	});
		 	$scope.$on('pageonview',function (data) {
		 		var totaldata = summoner.get();
		 		$scope.summonerdata = totaldata['summonerData'];
		 		$scope.leaguedata = totaldata['leagueData'];
		 		$scope.recentgame = totaldata['recentgamelist'];
		 		if (totaldata['most'].length > 0) {
		 		var mostchamplist = summoner.champscore(totaldata['most']);
		 		$scope.mostchamp = mostchamplist[0];
		 		$scope.wostchamp = mostchamplist[mostchamplist.length - 1];
		 		
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
		 		});
		 	$scope.researchsummoner = function (summonerName) {
		 		
		 		$location.path('/'+summonerName);
		 	}
		 	$scope.match= function(sdata,matchId){
				//alert(matchId);
				//match로 전달 후 페이지 시작
	    		$scope.$emit("CoverOn",{});
	    		$scope.$emit("loadingOn",{});
	            matchResource.get({matchId : matchId}).$promise.then(function(data){
	            	matchData.setmatch(data);
	            	matchData.setsummoner(sdata);
	            	$scope.$emit("searchViewChange",3);
				},function(error){
					$scope.$emit("loadingOff",{});
				});
			};
			$scope.avgcs =  function (stats) {
				console.log(stats.minionsKilled,stats.timePlayed);
				return (stats.minionsKilled / (stats.timePlayed / 60)).toFixed(2);
			}
		 },
		restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
		templateUrl: '/resources/page/search/summoner/summonerdata.html',
		link: function($scope, iElm, iAttrs, controller) {
		}
	};
});
