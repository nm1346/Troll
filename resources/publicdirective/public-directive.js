//공용디렉티브 혹은 메인페이지에 속하는 디렉티브모음
myApp.directive('searchNav', function($routeParams,$location,$timeout){
	return {
		scope: {}, // {} = isolate, true = child, false/undefined = no change
		controller: function($scope, $element, $attrs, $transclude) {
			$scope.summonerName = "";
			$scope.search = function () {
				if ($scope.summonerName == "" || $scope.summonerName == null) {
					Materialize.toast('소환사의 아이디를 입력해주세요.', 4000)
					return;
				}

				$timeout(function(){
					$location.path("/" + $scope.summonerName);
				},1000);	
			}
		},
		restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
		templateUrl: '/resources/publicdirective/search-nav.html',
		link: function($scope, iElm, iAttrs, controller) {
		}
	};
});

myApp.directive('loading',function(){
	return {
		scope: {}, // {} = isolate, true = child, false/undefined = no change
		restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
		templateUrl: '/resources/publicdirective/loading.html',
		link: function($scope, iElm, iAttrs, controller) {
			
		}
	};
});
myApp.directive('error',function(){
	// Runs during compile
	return {
		scope: {errorCode:"@errorCode",errorMessage:"@errorMessage"}, // {} = isolate, true = child, false/undefined = no change
		controller: function($scope, $element, $attrs, $transclude) {},
		restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
		templateUrl: '/resources/publicdirective/error.html',
		link: function($scope, iElm, iAttrs, controller) {
		}
	};
});