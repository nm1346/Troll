myApp.controller('searchCtrl',function(
	$scope,$routeParams,CurrentGameResource,currentGameData,$window,$document){
	$scope.$emit("CoverOff",{});
	$scope.$emit("loadingOff",{});
	
	$scope.search={
		loading:false,
		error:false
	};
	$scope.$on("searchPageStart",function(event,data){
		$scope.search.loading=data.loading;
		$scope.search.error=data.error;
	});

	$scope.$on("searchPageError",function(event,data){
		$scope.search.error=true;
		$scope.search.errorCode=data.errorCode;
		$scope.search.errorMessage=data.errorMessage;
	});
	$scope.$on("searchPageSuccess",function(event,data){
		$scope.search.loading=data.loading;
		$scope.search.error=data.error;
		$scope.$broadcast('pageonview', {});
	});
	$window.onmousewheel=function(data){
		console.log(data);
	}
	
});