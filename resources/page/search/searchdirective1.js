//search첫번째 페이지에 들어갈 인덱스모음

myApp.directive('summonerData', function(SearchResource,summoner,$routeParams){
	return {
		 scope: {}, // {} = isolate, true = child, false/undefined = no change
		 controller: function($scope, $element, $attrs, $transclude) {
			/*$scope.$emit('searchPageStart',{});*/
			$scope.$emit('searchPageStart', {loading : true , error : false});
			console.log('summonerData 생성',$routeParams.summonerName);
			SearchResource.get({summonerName : $routeParams.summonerName}).$promise.then(function (data) {
				if (Boolean(Number(data.success))){
					summoner.set(data);
					$scope.$emit('searchPageSuccess', {loading : false , error : false});
				}else{
					$scope.$emit('searchPageError', {errorCode : data.errorcode , errorMessage : data.errormsg});
				}
			},function (error) {
				console.log('에러',error);
			});
			$scope.$on('pageonview',function (data) {
				var totaldata = summoner.get();
				$scope.summonerdata = totaldata['summonerData'];
				$scope.leaguedata = totaldata['leagueData'];
				$scope.recentgame = totaldata['recentgamelist'];
				$scope.tierurl = totaldata['leagueData'].tier.toLowerCase();
				$scope.divisionurl = totaldata['leagueData'].entrylist[0].division.toLowerCase();
				console.log($scope.summonerdata , $scope.leaguedata , $scope.recentgame)
			});
		},
		restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
		templateUrl: '/resources/page/search/summonerdata.html',
		link: function($scope, iElm, iAttrs, controller) {
		}
	};
});
