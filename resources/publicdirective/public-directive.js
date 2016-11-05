//공용디렉티브 혹은 메인페이지에 속하는 디렉티브모음
myApp.directive('loading',function(){ 
	return {
		scope: {}, // {} = isolate, true = child, false/undefined = no change
		restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
		templateUrl: '/resources/publicdirective/loading.html',
		link: function($scope, iElm, iAttrs, controller) {
		}
	};
});
myApp.directive('error',function($route){
	// Runs during compile
	return {
		scope: {errorCode:"@errorCode",errorMessage:"@errorMessage"}, // {} = isolate, true = child, false/undefined = no change
		controller: function($scope, $element, $attrs, $transclude) {
			$scope.reload=function(){
				$route.reload();
			}
		},
		restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
		templateUrl: '/resources/publicdirective/error.html',
		link: function($scope, iElm, iAttrs, controller) {
		}
	};
});
myApp.directive('backCover',function($routeParams,$location){
	return {
		scope: {}, // {} = isolate, true = child, false/undefined = no change
		controller: function($scope, $element, $attrs, $transclude) {	
			$scope.$on("$routeChangeSuccess",function(){
				if(angular.isUndefined($routeParams.summonerName)&&!($location.path()=="/static/")){
					$scope.params=true;
	
				}else{
					$scope.params=false;
				}
			});
		},
		restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
		templateUrl: '/resources/publicdirective/back-cover.html',
		link: function($scope, iElm, iAttrs, controller) {
			
		}
	};
});
myApp.directive('testVideo', function(){
	return {
		scope: {}, // {} = isolate, true = child, false/undefined = no change
		controller: function($scope, $element, $attrs, $transclude) {
			
		},
		restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
		templateUrl: '/resources/publicdirective/test-video.html',
		link: function($scope, iElm, iAttrs, controller) {
			var video2=iElm.children().eq(0)[0];
			video2.muted=true
			var video=document.getElementById("myVideo");
			video.muted=true
			console.log(video)
		}
	};
});