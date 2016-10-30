//공용디렉티브 혹은 메인페이지에 속하는 디렉티브모음
myApp.directive('navBar',function($routeParams){
	return {
		scope: {}, // {} = isolate, true = child, false/undefined = no change
		controller: function($scope, $element, $attrs, $transclude) {
			$scope.getNavClass=function(){
				if(angular.isUndefined($routeParams.summonerName)){
					return "ngNavIndex";
				}else{
					return "ngNavOther";
				}
			}
		},
		restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
		templateUrl: '/resources/publicdirective/nav-bar.html',
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