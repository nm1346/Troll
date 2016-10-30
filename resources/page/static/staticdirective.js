myApp.directive('staticNav',function(StaticLocaleResource,staticLocaleData){
	return {
		scope: {}, // {} = isolate, true = child, false/undefined = no change
		controller: function($scope, $element, $attrs, $transclude) {
			$scope.$emit("categoryChangeStart",{});
			StaticLocaleResource.get({locale:"ko_KR"}).$promise.then(function(data){
				staticLocaleData.set(data);
				$scope.data=staticLocaleData.get();
				$scope.$emit("categoryChangeSuccess",{});
				console.log(data);
			},function(error){
				$scope.$emit("categoryChangeError",error);
			});
			$scope.localeChange=function(locale){
				$scope.$emit("categoryChangeStart",{});
				StaticLocaleResource.get(locale).$promise.then(function(data){
					staticLocaleData.set(data);
					$scope.$emit("categoryChangeSuccess",{});
				},function(error){
					$scope.$emit("categoryChangeError",error);
				});
			}
		},
		restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
		templateUrl: '/resources/page/static/static-nav.html',
		link: function($scope, iElm, iAttrs, controller) {
			$('select').material_select();
		}
	};
});
myApp.directive('staticCategory',function(staticLocaleData){
	return {
		scope: {}, // {} = isolate, true = child, false/undefined = no change
		controller: function($scope, $element, $attrs, $transclude) {
			$scope.data=staticLocaleData.get();
		},
		restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
		templateUrl: '/resources/page/static/static-category.html',
		link: function($scope, iElm, iAttrs, controller) {
			
		}
	};
});