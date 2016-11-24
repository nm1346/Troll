myApp.directive('featuredgame',function(FeaturedResource,TrollRestUrl,StaticLocaleResource,$cookies,$location,$filter,$interval){
	// Runs during compile
	return {
		scope: {}, // {} = isolate, true = child, false/undefined = no change
		controller: function($scope, $element, $attrs, $transclude) {
			$scope.imgsrc="http://ddragon.leagueoflegends.com/cdn/6.22.1/img/";
			$scope.$emit("loadingOn");
			StaticLocaleResource.get({locale:"ko_KR",category:"champion"})
			.$promise.then(function(data){
				$scope.championList=$filter('orderObjectBy')(data.championlist.data,'id');
			},function(error){
				Materialize.toast("ddragon server에 문제가 생겼습니다 챔피언을 불러올 수 없습니다.",2000)
			});
			StaticLocaleResource.get({locale:"ko_KR",category:"summoner"})
			.$promise.then(function(data){
				$scope.spellList=$filter('orderObjectBy')(data.spell.data,'id');
			},function(error){
				Materialize.toast("ddragon server에 문제가 생겼습니다 스펠을 불러올 수 없습니다.",2000)
			});
			
			
			FeaturedResource.get().$promise.then(function(data){
				$scope.featuredList=data.featuredList.gameList;
				console.log($scope.featuredList);
				$scope.leagueIdList=$filter('orderObjectBy')(data.leagueIdList,'name');
				for(var i in $scope.featuredList){
					for(var j in $scope.featuredList[i].participants){
						var entryData=$filter('binaryWhere')($scope.leagueIdList,{name:$scope.featuredList[i].participants[j].summonerName});
						if(angular.isDefined(entryData[0])&&$scope.featuredList[i].participants[j].summonerName==entryData[0].name){
							angular.extend($scope.featuredList[i].participants[j],entryData[0]);
						}
						
					}
				}
				
				//console.log($scope.leagueIdList);
				$scope.$emit("loadingOff");
			},function(error){
				$scope.$emit("loadingOff");
			});

			$scope.searchList=[];
			if(angular.isDefined($cookies.get("searchList"))){
				angular.extend($scope.searchList,angular.fromJson($cookies.get("searchList")));
			}
			$scope.search = function (summonerName) {
				if($scope.searchList.indexOf(summonerName)==-1&&$scope.searchList.length<5){
					$scope.searchList.push(summonerName)
				}
				$cookies.putObject("searchList",$scope.searchList);
				$location.path("/"+summonerName).replace();
			}
			
			$scope.restUrl=TrollRestUrl;
			

		},
		restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
		templateUrl: '/resources/page/search/featuredgame/featuredgame.html',
		link: function($scope, iElm, iAttrs, controller) {
			
			
		}
	};
});
myApp.directive('featuredTime',function($interval){
	// Runs during compile
	
	return {
		scope: {time:"@time"}, // {} = isolate, true = child, false/undefined = no change
		controller: function($scope, $element, $attrs, $transclude) {	
					
			var nowTime;
			$scope.timeInterval=$interval(function(){
				var nowTime=new Date();
				$scope.subtime=nowTime.getTime()-$scope.time;
			},1000);
		},
		restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
		templateUrl: '/resources/page/search/featuredgame/featured-time.html',
		link: function($scope, iElm, iAttrs, controller) {
			iElm.on("$destroy",function(){
				$interval.cancel($scope.timeInterval);
			});
		}
	};
});