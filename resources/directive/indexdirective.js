//메인페이지및 인덱스 페이지에 들어갈 디렉티브 모음
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
		templateUrl: '/resources/directive/nav-bar.html',
		link: function($scope, iElm, iAttrs, controller) {
			
		}
	};
});