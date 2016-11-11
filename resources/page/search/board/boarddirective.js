myApp.directive('board', function(BoardResource,BoardData,summoner){
	return {
		scope: {}, // {} = isolate, true = child, false/undefined = no change
		controller: function($scope, $element, $attrs, $transclude) {
			$scope.summonerData=summoner.get();
			$scope.selectVal=BoardData.getSelect();
			$scope.boardData=BoardData.get();
			$scope.category=["고의트롤","하수","핵사용자","어뷰져","욕설"];
			$scope.$watch("summonerData.$promise",function(newval,oldval){
				if(newval==oldval)return;
				newval.then(function(data){
					$scope.selectVal.id=data.summonerData.id;
					boardChange($scope.selectVal);
				},function(error){
					console.log(error);
				});
			});
			$scope.selectBoard=function(){

			}
			$scope.categoryChange=function(selectVal) {
				selectVal.page=1;
				boardChange(selectVal);
			}
			$scope.selectPage=function(page){
				$scope.selectVal.page=page;
				boardChange($scope.selectVal);
				
			}
			var boardChange=function(selectVal){
				$scope.$emit("loadingOn",{});
				BoardResource.get(selectVal).$promise.then(function(data){
					BoardData.set(data);
					$scope.$emit("loadingOff",{});
				},function(error){
					console.log(error);
					$scope.$emit("loadingOff",{});
				});
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

myApp.directive('paging', function(BoardResource){
	return {
		scope: {
			page:"=page",
			size:"=size",
			pagesize:"@pagesize",
			pagelength:"@pagelength",
			pageclick:"&pageclick"}, // {} = isolate, true = child, false/undefined = no change
		controller: function($scope, $element, $attrs, $transclude) {
			$scope.$watch("size",function(newval,oldval){
				if(newval==oldval)return;
				$scope.pageCount=Math.ceil($scope.size/$scope.pagesize);
				$scope.startPage=(($scope.page-1)/$scope.pagelength)*5+1;
				$scope.endPage=($scope.startPage+($scope.pagelength-1));
				$scope.endPage=$scope.endPage>$scope.pageCount?$scope.pageCount:$scope.endPage;
				$scope.array=[];
				for(var i=$scope.startPage;i<=$scope.endPage;i++){
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