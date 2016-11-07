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

myApp.directive('searchNav',function($cookies,$timeout,$location){
	return {
		scope: {}, // {} = isolate, true = child, false/undefined = no change
		controller: function($scope, $element, $attrs, $transclude) {
			//cookie 클릭시 search input에 값 입력
		
			$scope.searchList=[];
			if(angular.isDefined($cookies.get("searchList"))){
				angular.extend($scope.searchList,angular.fromJson($cookies.get("searchList")));
				
			}
			$scope.cookieClick=function(searchval){
				$scope.summonerName=searchval;
			}
			
			//검색시 실행 메소드
			$scope.search = function (summonerName) {
				if($scope.searchList.indexOf(summonerName)==-1&&$scope.searchList.length<5){
					$scope.searchList.push(summonerName)
				}
				$cookies.putObject("searchList",$scope.searchList);
				
				if (summonerName == "" ||summonerName == null) {
					Materialize.toast('소환사의 아이디를 입력해주세요.', 4000)
					return;
				}
				$scope.$emit("searchStart",{});
				$timeout(function(){
					$location.path("/"+summonerName);
				},1000);	
			}
		},
		restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
		templateUrl: '/resources/publicdirective/search-nav.html',
		link: function($scope, iElm, iAttrs, controller) {
		}
	};
});
