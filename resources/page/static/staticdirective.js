myApp.directive('staticNav',function(StaticLocaleResource,staticLocaleData,staticData){
	return {
		scope: {}, // {} = isolate, true = child, false/undefined = no change
		controller: function($scope, $element, $attrs, $transclude) {
			//처음 로드할때
			$scope.$emit("categoryChangeStart",{});
			StaticLocaleResource.get({locale:"ko_KR"}).$promise.then(function(data){
				staticLocaleData.set(data);
				$scope.data=staticLocaleData.get();
				$scope.$emit("categoryChangeSuccess",{});
			},function(error){
				$scope.$emit("categoryChangeError",error);
			});
			StaticLocaleResource.get({locale:"ko_KR",category:"champion"}).$promise.then(function(data){
				staticData.set(data);
				$scope.$emit("mainChangeSuccess","champion");
			},function(error){
				$scope.$emit("mainChangeError",error);
			});
			//지역문자 변환시
			$scope.localeChange=function(locale){
				staticLocaleData.select(locale.locale);
				$scope.$emit("categoryChangeStart",{});
				$scope.$emit("mainChangeStart",{});
				StaticLocaleResource.get(locale).$promise.then(function(data){
					staticLocaleData.set(data);
					$scope.$emit("categoryChangeSuccess",{});
					StaticLocaleResource.get({
						locale:staticLocaleData.selected(),
						category:staticData.selected()
					}).$promise.then(function(data){
						staticData.set(data);
						console.log(data);
						$scope.$emit("mainChangeSuccess",staticData.selected());
					},function(error){
						$scope.$emit("mainChangeError",error);
					});
				},function(error){
					$scope.$emit("categoryChangeError",error);
					$scope.$emit("mainChangeError",{});
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
myApp.directive('staticCategory',function(StaticLocaleResource,staticLocaleData,staticData){
	return {
		scope: {}, // {} = isolate, true = child, false/undefined = no change
		controller: function($scope, $element, $attrs, $transclude) {
			$scope.data=staticLocaleData.get();
			$scope.buttonClick=function(view){
					$scope.$emit("mainChangeStart",{});
					StaticLocaleResource.get({locale:staticLocaleData.selected(),category:view}).$promise.then(function(data){
					staticData.set(data);
					console.log(data);
					$scope.$emit("mainChangeSuccess",view);
				},function(error){
					$scope.$emit("mainChangeError",error);
				});
			}
		},
		restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
		templateUrl: '/resources/page/static/static-category.html',
		link: function($scope, iElm, iAttrs, controller) {
			
		}
	};
});
myApp.directive('staticChampion', function(StaticLocaleResource,staticLocaleData,staticData){
	return {
		scope: {}, // {} = isolate, true = child, false/undefined = no change
		controller: function($scope, $element, $attrs, $transclude) {
			$scope.data=staticData.get();
			$scope.localeData=staticLocaleData.get();
			$scope.championDetail=function(){

			}
		},
		restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
		templateUrl: '/resources/page/static/static-champion.html',
		link: function($scope, iElm, iAttrs, controller) {
		}
	};
});

myApp.directive('staticChampionmodal',function(){
	return {
		scope: {}, // {} = isolate, true = child, false/undefined = no change
		controller: function($scope, $element, $attrs, $transclude) {

		},
		restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
		templateUrl: '/resources/page/static/static-championmodal.html',
		link: function($scope, iElm, iAttrs, controller) {
			$('#championmodal').modal();
		}
	};
});