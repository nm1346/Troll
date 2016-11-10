myApp.directive('board', function(BoardResource,BoardData,summoner){
	return {
		scope: {}, // {} = isolate, true = child, false/undefined = no change
		controller: function($scope, $element, $attrs, $transclude) {
			$scope.summonerData=summoner.get();
			$scope.selectVal=BoardData.getSelect();
			$scope.boardData=BoardData.get();
			$scope.$watch("summonerData.$promise",function(newval,oldval){
				if(newval==oldval)return;
				newval.then(function(data){
					$scope.selectVal.id=data.summonerData.id;
					BoardResource.get($scope.selectVal).$promise.then(function(data){
						BoardData.set(data);
					},function(error){
						console.log(error);
					});
				},function(error){
					console.log(error);
				});
			});
			$scope.selectBoard=function(){

			}
		},
		restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
		templateUrl: '/resources/page/search/board/board.html',
		link: function($scope, iElm, iAttrs, controller) {
		}
	};
});
myApp.directive('boardDetail', function(){
	return {
		scope: {}, // {} = isolate, true = child, false/undefined = no change
		controller: function($scope, $element, $attrs, $transclude) {},
		restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
		templateUrl: '/resources/page/search/board/board-detail.html',
		link: function($scope, iElm, iAttrs, controller) {
			
		}
	};
});
myApp.directive('boardCreate', function(summoner,BoardDetailResource){
	return {
		scope: {}, // {} = isolate, true = child, false/undefined = no change
		controller: function($scope, $element, $attrs, $transclude) {
			$scope.summonerData=summoner.get();
			$scope.createBoard={};
			$scope.category=["고의트롤","하수","핵사용자","어뷰져","욕설"];
			$scope.$watch("summonerData.$promise",function(newval,oldval){
				if(newval==oldval)return;
				newval.then(function(data){
					$scope.createBoard.id=data.summonerData.id;
				},function(error){
				});
			});
			$scope.create=function(data){
				console.log(data);
				BoardDetailResource.put(data);
			}
		},
		restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
		templateUrl: '/resources/page/search/board/board-create.html',
		link: function($scope, iElm, iAttrs, controller) {
			
		}
	};
});
myApp.constant('pageSize', 10)
myApp.directive('paging', function(BoardResource,pageSize){
	return {
		scope: {page:"=page",size:"=size"}, // {} = isolate, true = child, false/undefined = no change
		controller: function($scope, $element, $attrs, $transclude) {
			$scope.size;
			$scope.pageCount=$scope.size/pageSize;

			$scope.array=[];



			$scope.$watch("size",function(newval,oldval){
				if(newval==oldval)return;

				for(var i=0;i<$scope.page;i++){
					$scope.array.push(i);
				}
			});
		},
		restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
		templateUrl: '/resources/page/search/board/paging.html',
		link: function($scope, iElm, iAttrs, controller) {
			
		}
	};
});