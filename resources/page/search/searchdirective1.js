//search첫번째 페이지에 들어갈 인덱스모음

myApp.directive('summonerData', function(SearchResource,summoner,$routeParams){
	return {
		 scope: {}, // {} = isolate, true = child, false/undefined = no change
		 controller: function($scope, $element, $attrs, $transclude) {
			/*$scope.$emit('searchPageStart',{});*/
			$scope.$emit('searchPageStart', {loading : true , error : false});
			console.log('summonerData 생성',$routeParams.summonerName);
			SearchResource.get({summonerName : $routeParams.summonerName}).$promise.then(function (data) {
				console.log('성공',data);
				summoner.set(data);
			},function (error) {
				console.log('에러',error);
			});
		},
		restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
		//templateUrl: 'search.html',
		link: function($scope, iElm, iAttrs, controller) {

		}
	};
});
