myApp.directive('featuredgame',function(FeaturedResource,StaticLocaleResource,$cookies,$location){
	// Runs during compile
	return {
		scope: {}, // {} = isolate, true = child, false/undefined = no change
		controller: function($scope, $element, $attrs, $transclude) {
			$scope.imgsrc="http://ddragon.leagueoflegends.com/cdn/6.22.1/img/";
			$scope.$emit("loadingOn");
			StaticLocaleResource.get({locale:"ko_KR",category:"champion"})
			.$promise.then(function(data){
				$scope.championList=data.championlist.data;
				console.log($scope.championList);
			},function(error){
				Materialize.toast("ddragon server에 문제가 생겼습니다 챔피언을 불러올 수 없습니다.",2000)
			});
			StaticLocaleResource.get({locale:"ko_KR",category:"summoner"})
			.$promise.then(function(data){
				$scope.spellList=data.spell.data;
				console.log($scope.spellList);
			},function(error){
				Materialize.toast("ddragon server에 문제가 생겼습니다 스펠을 불러올 수 없습니다.",2000)
			});
			FeaturedResource.get().$promise.then(function(data){
				$scope.featuredList=data.featuredList.gameList;
				console.log(data);
				$scope.$emit("loadingOff");
			},function(error){
				$scope.$emit("loadingOff");
				console.log(error);
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
				
				if (summonerName == "" ||summonerName == null) {
					Materialize.toast('소환사의 아이디를 입력해주세요.', 4000)
					return;
				}
				$location.path("/"+summonerName).replace();
			}
		},
		restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
		templateUrl: '/resources/page/search/featuredgame/featuredgame.html',
		link: function($scope, iElm, iAttrs, controller) {
			
		}
	};
});