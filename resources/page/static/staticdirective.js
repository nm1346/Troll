//select box에 대한 html과 controller 관리하는 디렉티브
//locale정보와 category 정보 수신후 service에 삽입
myApp.directive('staticNav',function(StaticLocaleResource,staticLocaleData,staticData,$window){
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
				$('select').material_select();
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
		}
	};
});

//카테고리버튼에 대한 디렉티브 
//locale정보 서비스에서 데이터를 받고 data에서 추출하여 버튼 값 입력
myApp.directive('staticCategory',function(StaticLocaleResource,staticLocaleData,staticData){
	return {
		scope: {}, // {} = isolate, true = child, false/undefined = no change
		controller: function($scope, $element, $attrs, $transclude) {
			$scope.data=staticLocaleData.get();
			$scope.buttonClick=function(view){
				$scope.$emit("mainChangeStart",{});
				StaticLocaleResource.get({locale:staticLocaleData.selected(),category:view}).$promise.then(function(data){
					staticData.set(data);
					staticData.select(view);
					/*console.log($scope.data);*/
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

//메인뷰중 하나인 champion 뷰에 대한 디렉티브
myApp.directive('staticChampion', function(StaticLocaleResource,staticLocaleData,staticData,staticDetail){
	return {
		scope: {}, // {} = isolate, true = child, false/undefined = no change
		controller: function($scope, $element, $attrs, $transclude) {
			$scope.data=staticData.get();
			$scope.localeData=staticLocaleData.get();
			$scope.championDetail=function(id){
				$scope.$broadcast("championModalChangeStart",{});
				StaticLocaleResource.get({
					locale:staticLocaleData.selected(),
					category:"champion",
					id:id
				}).$promise.then(function(data){
					staticDetail.set(data);
					$scope.$broadcast("championModalChangeSuccess",{});
				},function(error){
					$scope.$broadcast("championModalChangeError",error);
				});
			};
		},
		restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
		templateUrl: '/resources/page/static/static-champion.html',
		link: function($scope, iElm, iAttrs, controller) {
		}
	};
});

//champion데이터의 modal에 대한 디렉티브
myApp.directive('staticChampionmodal',function(staticLocaleData,staticData,staticDetail,$sce){

	return {
		scope: {}, // {} = isolate, true = child, false/undefined = no change
		controller: function($scope, $element, $attrs, $transclude) {
			$scope.layout={
				loading:true,
				error:false
			};
			$scope.locale=staticLocaleData.get();
			$scope.champion=staticDetail.get();
			$scope.$on("championModalChangeStart",function(event,data){
				$scope.layout.loading=true;
				$scope.layout.error=false;
			});
			$scope.$on("championModalChangeSuccess",function(event,data){
				$scope.layout.loading=false;
				$scope.layout.error=false;
				
			});
			$scope.$on("championModalChangeError",function(event,data){
				$scope.layout.loading=false;
				$scope.layout.error=true;
				$scope.layout.errorCode=data.errorCode;
				$scope.layout.errorMessage=data.errorMessage;
			});
			$scope.selected=false;
			$scope.spellClick=function(data){
				$scope.selectedSpell=data;
				$scope.selected=true;
			}
		},
		restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
		templateUrl: '/resources/page/static/static-championmodal.html',
		link: function($scope, iElm, iAttrs, controller) {

			$('#championmodal').modal({
				opacity:0,
				ready: function(modal, trigger) { // Callback for Modal open. Modal and trigger parameters available.
        		var overlay = $('.modal-overlay');
				// remove it
				overlay.detach();
      			},
				complete: function() { $scope.selected=false; }
			});
		}
	};
});

//메인뷰에서 item category에 대한 디렉티브
myApp.directive('staticItem', function(staticLocaleData,staticData,staticDetail){
	return {
		scope: {}, // {} = isolate, true = child, false/undefined = no change
		controller: function($scope, $element, $attrs, $transclude) {
			$scope.itemData=staticData.get();
			$scope.localeData=staticLocaleData.get();
			console.log($scope.itemData);

		},
		restrict: 'E', // E = Element, A = Attribute, C = Classit M = Comment
		templateUrl: '/resources/page/static/static-item.html',
		link: function($scope, iElm, iAttrs, controller) {
			
		}
	};
});



//runeCategory정보에 대한 directive
myApp.directive('staticRune', function(staticData){
	return {
		scope: {}, // {} = isolate, true = child, false/undefined = no change
		controller: function($scope, $element, $attrs, $transclude) {
			$scope.runeData=staticData.get();
		},
		restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
		templateUrl: '/resources/page/static/static-rune.html',
		link: function($scope, iElm, iAttrs, controller) {
			
		}
	};
});

//summoner 디렉티브에 대한 view
myApp.directive('staticSummoner',function(staticData){
	return {
		scope: {}, // {} = isolate, true = child, false/undefined = no change
		controller: function($scope, $element, $attrs, $transclude) {
			
			$scope.spellDataArray=[];
			$scope.spellData=[];
			for (var member in staticData.get().spell.data){
				$scope.spellDataArray.push(member);
			}
			for(var i=0;i<$scope.spellDataArray.length;i++){
				$scope.spellData.push(staticData.get().spell.data[$scope.spellDataArray[i]]);
			}
		},
		restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
		templateUrl: '/resources/page/static/static-summoner.html',
		link: function($scope, iElm, iAttrs, controller) {			
		}
	};
});
